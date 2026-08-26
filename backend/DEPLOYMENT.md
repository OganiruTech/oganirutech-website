# Deploying the admin dashboard + email notifications

Everything below runs on the production server as root, from
`/var/www/oganiru-repo/backend`.

> **Use `php8.2` explicitly for every artisan command.** The site is served by
> `php8.2-fpm` while the shell's bare `php` is 8.4. Mixing them is what caused
> the `could not find driver` outage.

---

## 0. Routine deploys use `deploy.sh`

After the one-time setup in sections 1–4 below, every subsequent deploy is:

```bash
cd /var/www/oganiru-repo
sudo ./deploy.sh
```

The script pulls, installs dependencies, migrates behind maintenance mode,
rebuilds caches, fixes ownership, restarts the queue workers, reloads PHP-FPM,
rebuilds the Next.js frontend, restarts pm2, and health-checks both domains.
It refuses to start if `pdo_sqlite` is missing from the FPM pool or the working
tree is dirty, and it always lifts maintenance mode — including when a step
fails, in which case it prints the exact command to roll back.

Useful flags: `--skip-frontend`, `--skip-backend`, `--no-pull`.

**One-time install.** `deploy.sh` now lives in the repo, but the server has an
untracked copy at the same path that will block `git pull`. Remove it first:

```bash
cd /var/www/oganiru-repo
mv deploy.sh deploy.sh.old
git pull origin main
chmod +x deploy.sh
```

---

## 1. Environment variables

Add these to `.env`. Replace the SMTP block with your real credentials.

```dotenv
# --- Security: must both be set for production ---
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.oganiru.tech

# --- Where internal alerts go ---
ADMIN_NOTIFICATION_EMAIL=oganirutech@gmail.com
ADMIN_NOTIFICATION_NAME="Oganiru Technologies"

# --- Public site, used in email links ---
FRONTEND_URL=https://oganiru.tech

# --- Outbound mail (your SMTP provider) ---
MAIL_MAILER=smtp
MAIL_HOST=smtp.yourprovider.com
MAIL_PORT=587
MAIL_USERNAME=your-smtp-username
MAIL_PASSWORD=your-smtp-password
MAIL_SCHEME=tls
MAIL_FROM_ADDRESS=noreply@oganiru.tech
MAIL_FROM_NAME="Oganiru Technologies"

# --- Queue ---
QUEUE_CONNECTION=database
```

Two things that quietly break deliverability if you skip them:

- `MAIL_FROM_ADDRESS` must be an address your SMTP provider is authorised to
  send for. If you send as `@oganiru.tech`, add SPF and DKIM records for the
  domain or Gmail will file everything under spam.
- On port 465 use `MAIL_SCHEME=smtps` instead of `tls`.

## 2. Migrate

```bash
sudo -u www-data php8.2 artisan migrate --force
```

This adds `read_at` and `archived_at` to `contact_messages`. The `jobs` table
the queue needs already exists from the base Laravel migrations.

## 3. Create your admin account

```bash
sudo -u www-data php8.2 artisan admin:create
```

It prompts for email, name and password (minimum 12 characters — this account
can read every message the site receives). Re-running it against an existing
email offers a password reset.

There is no public registration route. Accounts only exist if you create them
here.

## 4. Start the queue worker

Emails are queued, so nothing sends until a worker runs.

```bash
sudo apt install supervisor          # if not already installed
sudo cp deploy/oganiru-queue-worker.conf /etc/supervisor/conf.d/
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start oganiru-worker:*
sudo supervisorctl status oganiru-worker:*
```

`numprocs` is deliberately `1`. The queue lives in the same SQLite file as
cache, sessions and your data — a second worker just adds write contention.
Raise it after moving to MySQL, not before.

**Every time you deploy code, restart the worker.** Workers hold the old code
in memory:

```bash
sudo -u www-data php8.2 artisan queue:restart
```

## 5. Cache config and verify

```bash
sudo -u www-data php8.2 artisan config:cache
sudo -u www-data php8.2 artisan route:cache
sudo -u www-data php8.2 artisan view:cache
sudo systemctl reload php8.2-fpm
```

Then check:

```bash
# Routes registered
php8.2 artisan route:list --path=admin

# Send a test email through your real SMTP
php8.2 artisan tinker --execute="Mail::raw('Oganiru SMTP test', fn(\$m) => \$m->to(config('oganiru.admin_email'))->subject('SMTP test'));"

# Watch the worker pick up jobs
tail -f /var/log/oganiru-worker.log
```

Visit `https://api.oganiru.tech/admin/login` and sign in.

---

## Where things are

| Concern | Location |
| --- | --- |
| Dashboard routes | `routes/web.php` |
| Dashboard controllers | `app/Http/Controllers/Admin/` |
| Dashboard views | `resources/views/admin/` |
| Email classes | `app/Mail/` |
| Email templates | `resources/views/emails/` |
| Recipient + branding config | `config/oganiru.php` |
| Worker config | `deploy/oganiru-queue-worker.conf` |

## Emails sent

| Trigger | Recipient | Class |
| --- | --- | --- |
| Contact form submitted | admin | `ContactFormMail` |
| Contact form submitted | the visitor | `ContactReceivedMail` |
| New subscriber | admin | `NewSubscriberMail` |
| New subscriber | the subscriber | `SubscriberWelcomeMail` |

All four implement `ShouldQueue` and retry 3 times with a 1/5/15-minute
backoff. A mail failure is logged and never turns a successful form submission
into an error for the visitor — the record is already saved and visible in the
dashboard either way.

Failed jobs land in the `failed_jobs` table:

```bash
php8.2 artisan queue:failed
php8.2 artisan queue:retry all
```

## Troubleshooting

**No emails arriving.** Check the worker is running
(`supervisorctl status oganiru-worker:*`), then `php8.2 artisan queue:failed`,
then `storage/logs/laravel.log`. If jobs sit in the `jobs` table and never
move, the worker is down or running the wrong PHP version.

**`could not find driver`.** `php8.2-sqlite3` is missing or `php8.2-fpm` was
not restarted after installing it.

**`database is locked`.** SQLite contention. This is the signal to move to
MySQL — cache, sessions, queue and application data are all sharing one file.

**Locked out of the dashboard.** Login is rate-limited to 5 attempts per
minute per email+IP. Wait a minute, or reset with `php8.2 artisan admin:create`.
