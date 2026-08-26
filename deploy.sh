#!/usr/bin/env bash
#
# Oganiru deployment
# ------------------
#   sudo ./deploy.sh                    full deploy (backend + frontend)
#   sudo ./deploy.sh --skip-frontend    backend only
#   sudo ./deploy.sh --skip-backend     frontend only
#   sudo ./deploy.sh --no-pull          deploy what is already checked out
#
# Safe to re-run. Aborts before touching anything if a preflight check fails,
# and always lifts maintenance mode even if a step blows up.

set -Eeuo pipefail

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# The PHP that php-fpm serves this site with. NOT bare `php` — the shell's
# default is 8.4 while nginx talks to php8.2-fpm. Running artisan on the wrong
# version is what caused the "could not find driver" outage.
PHP_BIN="/usr/bin/php8.2"
FPM_SERVICE="php8.2-fpm"
PHP_FPM_CONF_D="/etc/php/8.2/fpm/conf.d"

APP_DIR="/var/www/oganiru-repo"
BACKEND_DIR="${APP_DIR}/backend"
FRONTEND_DIR="${APP_DIR}/frontend"
BRANCH="main"
WEB_USER="www-data"
PM2_APP="oganiru-frontend"
WORKER_GROUP="oganiru-worker"

HEALTH_API="https://api.oganiru.tech/up"
HEALTH_SITE="https://oganiru.tech"

DO_PULL=1
DO_BACKEND=1
DO_FRONTEND=1

for arg in "$@"; do
  case "$arg" in
    --no-pull)       DO_PULL=0 ;;
    --skip-backend)  DO_BACKEND=0 ;;
    --skip-frontend) DO_FRONTEND=0 ;;
    -h|--help)       sed -n '2,12p' "$0"; exit 0 ;;
    *) echo "Unknown option: $arg (try --help)"; exit 1 ;;
  esac
done

# ---------------------------------------------------------------------------
# Output helpers
# ---------------------------------------------------------------------------

BOLD=$(tput bold 2>/dev/null || true)
RESET=$(tput sgr0 2>/dev/null || true)
GREEN=$(tput setaf 2 2>/dev/null || true)
YELLOW=$(tput setaf 3 2>/dev/null || true)
RED=$(tput setaf 1 2>/dev/null || true)

step()  { echo; echo "${BOLD}==> $*${RESET}"; }
ok()    { echo "    ${GREEN}✓${RESET} $*"; }
warn()  { echo "    ${YELLOW}!${RESET} $*"; }
fail()  { echo "    ${RED}✗${RESET} $*"; exit 1; }
as_web() { sudo -u "$WEB_USER" "$@"; }

MAINTENANCE_ON=0
PREVIOUS_SHA=""

cleanup() {
  local exit_code=$?

  if [[ "$MAINTENANCE_ON" == "1" ]]; then
    echo
    echo "${BOLD}==> Lifting maintenance mode${RESET}"
    as_web "$PHP_BIN" "${BACKEND_DIR}/artisan" up || true
  fi

  if [[ $exit_code -ne 0 ]]; then
    echo
    echo "${RED}${BOLD}Deployment failed (exit ${exit_code}).${RESET}"
    if [[ -n "$PREVIOUS_SHA" ]]; then
      echo "To roll the code back to what was running before this run:"
      echo "    cd ${APP_DIR} && git reset --hard ${PREVIOUS_SHA} && sudo ./deploy.sh --no-pull"
    fi
  fi
}
trap cleanup EXIT

# ---------------------------------------------------------------------------
# Preflight — fail before changing anything
# ---------------------------------------------------------------------------

step "Preflight checks"

[[ $EUID -eq 0 ]] || fail "Run with sudo — this writes to ${APP_DIR} and reloads services."

[[ -x "$PHP_BIN" ]] || fail "${PHP_BIN} not found. Check which PHP version php-fpm serves this site with."
ok "PHP binary: $("$PHP_BIN" -r 'echo PHP_VERSION;')"

# The exact failure that took the site down: the SQLite driver present for the
# CLI but missing from the FPM pool that actually serves requests.
if [[ ! -e "${PHP_FPM_CONF_D}/20-pdo_sqlite.ini" ]]; then
  fail "pdo_sqlite is not enabled for ${FPM_SERVICE}. Run: apt install php8.2-sqlite3 && systemctl restart ${FPM_SERVICE}"
fi
ok "pdo_sqlite enabled for ${FPM_SERVICE}"

[[ -f "${BACKEND_DIR}/.env" ]] || fail "${BACKEND_DIR}/.env is missing."

if grep -qE '^APP_DEBUG=true' "${BACKEND_DIR}/.env"; then
  warn "APP_DEBUG=true in .env — exception details will be exposed to visitors. Set APP_DEBUG=false."
fi

if ! grep -qE '^MAIL_MAILER=smtp' "${BACKEND_DIR}/.env"; then
  warn "MAIL_MAILER is not smtp — notification emails will not be delivered."
fi

if [[ "$DO_PULL" == "1" ]]; then
  if ! git -C "$APP_DIR" diff --quiet || ! git -C "$APP_DIR" diff --cached --quiet; then
    fail "Tracked files are modified on the server. Commit, stash or discard them before deploying."
  fi
  ok "Working tree clean"
fi

PREVIOUS_SHA=$(git -C "$APP_DIR" rev-parse HEAD)
ok "Current commit: ${PREVIOUS_SHA:0:8}"

# ---------------------------------------------------------------------------
# Pull
# ---------------------------------------------------------------------------

if [[ "$DO_PULL" == "1" ]]; then
  step "Pulling latest code (${BRANCH})"
  git -C "$APP_DIR" pull --ff-only origin "$BRANCH"
  NEW_SHA=$(git -C "$APP_DIR" rev-parse HEAD)

  if [[ "$NEW_SHA" == "$PREVIOUS_SHA" ]]; then
    ok "Already up to date"
  else
    ok "${PREVIOUS_SHA:0:8} → ${NEW_SHA:0:8}"
    git -C "$APP_DIR" --no-pager log --oneline "${PREVIOUS_SHA}..${NEW_SHA}" | sed 's/^/      /'
  fi
fi

# ---------------------------------------------------------------------------
# Backend
# ---------------------------------------------------------------------------

if [[ "$DO_BACKEND" == "1" ]]; then

  step "Installing PHP dependencies"
  cd "$BACKEND_DIR"
  COMPOSER_ALLOW_SUPERUSER=1 composer install \
    --no-dev --optimize-autoloader --no-interaction --no-progress
  ok "Dependencies installed"

  step "Enabling maintenance mode"
  # /up stays reachable so the health check below still works.
  as_web "$PHP_BIN" artisan down --retry=15 --secret="deploy-$(date +%s)" > /dev/null || true
  MAINTENANCE_ON=1
  ok "Site is in maintenance mode"

  step "Running migrations"
  as_web "$PHP_BIN" artisan migrate --force
  ok "Migrations applied"

  step "Rebuilding caches"
  # Clear before caching: a stale config cache survives a failed rebuild and
  # is very hard to diagnose afterwards.
  as_web "$PHP_BIN" artisan config:clear > /dev/null
  as_web "$PHP_BIN" artisan config:cache > /dev/null
  as_web "$PHP_BIN" artisan route:cache  > /dev/null
  as_web "$PHP_BIN" artisan view:cache   > /dev/null
  as_web "$PHP_BIN" artisan event:cache  > /dev/null
  ok "Config, routes, views and events cached"

  step "Fixing ownership"
  # `database` is included because SQLite needs write access to the directory,
  # not just the file, for its -wal and -journal companions.
  chown -R "${WEB_USER}:${WEB_USER}" storage bootstrap/cache database
  find storage bootstrap/cache -type d -exec chmod 775 {} \;
  ok "storage, bootstrap/cache and database owned by ${WEB_USER}"

  step "Lifting maintenance mode"
  as_web "$PHP_BIN" artisan up > /dev/null
  MAINTENANCE_ON=0
  ok "Site is live"

  step "Restarting queue workers"
  # Workers hold the old code in memory. Without this, notification emails
  # are rendered by the previous deploy's classes until the worker recycles.
  as_web "$PHP_BIN" artisan queue:restart > /dev/null
  ok "Workers signalled to restart"

  if command -v supervisorctl > /dev/null 2>&1; then
    if supervisorctl status "${WORKER_GROUP}:*" > /dev/null 2>&1; then
      supervisorctl status "${WORKER_GROUP}:*" | sed 's/^/      /'
    else
      warn "Supervisor group '${WORKER_GROUP}' not found — queued emails will not send."
      warn "See backend/DEPLOYMENT.md §4 to install deploy/oganiru-queue-worker.conf"
    fi
  else
    warn "supervisor is not installed — queued emails will not send. See backend/DEPLOYMENT.md §4"
  fi

  step "Reloading ${FPM_SERVICE}"
  systemctl reload "$FPM_SERVICE"
  ok "PHP-FPM reloaded (opcache cleared)"
fi

# ---------------------------------------------------------------------------
# Frontend
# ---------------------------------------------------------------------------

if [[ "$DO_FRONTEND" == "1" ]]; then

  step "Building Next.js"
  cd "$FRONTEND_DIR"

  if [[ -f package-lock.json ]]; then
    npm ci
  else
    warn "No package-lock.json — falling back to npm install"
    npm install
  fi

  npm run build
  ok "Build complete"

  step "Restarting frontend"
  pm2 restart "$PM2_APP" --update-env
  pm2 save > /dev/null 2>&1 || true
  ok "pm2 restarted ${PM2_APP}"
fi

# ---------------------------------------------------------------------------
# Health checks
# ---------------------------------------------------------------------------

step "Health checks"

check_url() {
  local label="$1" url="$2" code
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$url" || echo "000")

  if [[ "$code" == "200" ]]; then
    ok "${label} → ${code}"
  else
    warn "${label} → ${code}"
    return 1
  fi
}

HEALTH_OK=1
check_url "API    ${HEALTH_API}"  "$HEALTH_API"  || HEALTH_OK=0
check_url "Site   ${HEALTH_SITE}" "$HEALTH_SITE" || HEALTH_OK=0

echo
if [[ "$HEALTH_OK" == "1" ]]; then
  echo "${GREEN}${BOLD}Deployment complete.${RESET}"
else
  echo "${YELLOW}${BOLD}Deployed, but a health check did not return 200.${RESET}"
  echo "Check:  tail -n 50 ${BACKEND_DIR}/storage/logs/laravel.log"
  echo "        pm2 logs ${PM2_APP} --lines 50"
  exit 1
fi
