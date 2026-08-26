<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="csrf-token" content="{{ csrf_token() }}" />
  <title>@yield('title', 'Dashboard') · Oganiru Admin</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%230B1F3B'/><path d='M9 20.5 16 9l7 11.5H9Z' fill='%230F9D58'/></svg>" />
  <style>
    :root {
      --navy-900:#081726; --navy-800:#0B1F3B; --navy-700:#12305A; --navy-600:#1B4278;
      --emerald-700:#0A6E3D; --emerald-600:#0B8248; --emerald-500:#0F9D58; --emerald-100:#D6F2E3;
      --ink:#0B1F3B; --ink-muted:#3E6389; --ink-faint:#8199B5;
      --surface:#FFFFFF; --surface-subtle:#F6F9FC; --surface-sunken:#EDF2F8;
      --hairline:#E2E8F0; --danger:#B42318; --danger-bg:#FEF3F2; --amber:#B54708; --amber-bg:#FFFAEB;
      --radius:10px; --shadow:0 1px 2px rgba(11,31,59,.06), 0 8px 24px rgba(11,31,59,.06);
      --sidebar-w:236px;
    }
    * { box-sizing:border-box; }
    body {
      margin:0; background:var(--surface-subtle); color:var(--ink);
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
      font-size:14px; line-height:1.55; -webkit-font-smoothing:antialiased;
    }
    a { color:var(--emerald-600); }
    h1,h2,h3 { letter-spacing:-.02em; margin:0; }

    /* ---------- shell ---------- */
    .shell { display:flex; min-height:100vh; }
    .sidebar {
      width:var(--sidebar-w); flex:0 0 var(--sidebar-w);
      background:linear-gradient(180deg,var(--navy-800),var(--navy-900));
      color:#fff; padding:22px 16px; display:flex; flex-direction:column; gap:26px;
      position:sticky; top:0; height:100vh;
    }
    .brand { display:flex; align-items:center; gap:10px; padding:0 6px; }
    .brand-mark { width:30px; height:30px; border-radius:7px; background:var(--emerald-500);
      display:grid; place-items:center; font-weight:800; color:var(--navy-900); font-size:15px; flex:0 0 auto; }
    .brand-text { font-weight:700; font-size:14px; letter-spacing:-.01em; }
    .brand-text span { display:block; font-size:10px; font-weight:600; color:#7FD3A8;
      letter-spacing:1px; text-transform:uppercase; }
    .nav { display:flex; flex-direction:column; gap:2px; }
    .nav-label { font-size:10px; letter-spacing:1.1px; text-transform:uppercase;
      color:#5C7899; padding:0 10px 6px; font-weight:700; }
    .nav a {
      display:flex; align-items:center; justify-content:space-between; gap:8px;
      padding:9px 11px; border-radius:8px; color:#C3D3E6; text-decoration:none;
      font-weight:500; transition:background .12s ease, color .12s ease;
    }
    .nav a:hover { background:rgba(255,255,255,.06); color:#fff; }
    .nav a.active { background:var(--emerald-600); color:#fff; font-weight:600; }
    .nav .pip { background:rgba(255,255,255,.16); color:#fff; font-size:11px; font-weight:700;
      padding:1px 7px; border-radius:99px; }
    .nav a.active .pip { background:rgba(0,0,0,.22); }
    .sidebar-foot { margin-top:auto; border-top:1px solid rgba(255,255,255,.10); padding-top:14px; }
    .sidebar-foot .who { font-size:12px; color:#8FA6C2; padding:0 6px 8px; word-break:break-all; }
    .signout { width:100%; background:transparent; border:1px solid rgba(255,255,255,.18);
      color:#C3D3E6; padding:8px; border-radius:8px; font:inherit; font-size:13px; cursor:pointer; }
    .signout:hover { background:rgba(255,255,255,.07); color:#fff; }

    .main { flex:1; min-width:0; display:flex; flex-direction:column; }
    .topbar { background:var(--surface); border-bottom:1px solid var(--hairline);
      padding:18px 28px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
    .topbar h1 { font-size:19px; font-weight:700; }
    .topbar .sub { color:var(--ink-muted); font-size:13px; margin-top:2px; }
    .content { padding:26px 28px 56px; max-width:1180px; width:100%; }

    /* ---------- pieces ---------- */
    .card { background:var(--surface); border:1px solid var(--hairline);
      border-radius:var(--radius); box-shadow:var(--shadow); }
    .card-head { padding:15px 18px; border-bottom:1px solid var(--hairline);
      display:flex; align-items:center; justify-content:space-between; gap:12px; }
    .card-head h2 { font-size:14px; font-weight:700; }
    .card-body { padding:18px; }

    .stat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:14px; margin-bottom:24px; }
    .stat { background:var(--surface); border:1px solid var(--hairline); border-radius:var(--radius);
      padding:16px 18px; box-shadow:var(--shadow); }
    .stat .k { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.8px;
      color:var(--ink-faint); }
    .stat .v { font-size:28px; font-weight:750; letter-spacing:-.03em; margin-top:6px; }
    .stat .d { font-size:12px; color:var(--ink-muted); margin-top:2px; }
    .stat.accent { border-color:var(--emerald-500); background:linear-gradient(180deg,#F2FBF6,#fff); }
    .stat.accent .v { color:var(--emerald-700); }

    .table-wrap { width:100%; overflow-x:auto; -webkit-overflow-scrolling:touch; }
    table { width:100%; border-collapse:collapse; }
    th { text-align:left; font-size:11px; letter-spacing:.7px; text-transform:uppercase;
      color:var(--ink-faint); font-weight:700; padding:11px 18px; border-bottom:1px solid var(--hairline);
      background:var(--surface-subtle); white-space:nowrap; }
    td { padding:13px 18px; border-bottom:1px solid var(--hairline); vertical-align:top; }
    tbody tr:last-child td { border-bottom:0; }
    tbody tr:hover { background:var(--surface-subtle); }
    tr.unread td { background:#FBFDFF; }
    tr.unread td:first-child { box-shadow:inset 3px 0 0 var(--emerald-500); }
    td.email { font-weight:600; white-space:nowrap; }
    td.email a { color:var(--ink); text-decoration:none; }
    td.email a:hover { color:var(--emerald-700); text-decoration:underline; }
    td.preview { color:var(--ink-muted); }
    td.when { color:var(--ink-faint); white-space:nowrap; font-size:13px; }
    td.actions { text-align:right; white-space:nowrap; }

    .badge { display:inline-block; font-size:11px; font-weight:700; padding:2px 8px;
      border-radius:99px; letter-spacing:.2px; }
    .badge-new { background:var(--emerald-100); color:var(--emerald-700); }
    .badge-arch { background:var(--surface-sunken); color:var(--ink-muted); }

    .btn { display:inline-flex; align-items:center; gap:6px; padding:8px 14px; border-radius:8px;
      font:inherit; font-size:13px; font-weight:600; text-decoration:none; cursor:pointer;
      border:1px solid transparent; transition:background .12s ease,border-color .12s ease; }
    .btn-primary { background:var(--emerald-600); color:#fff; }
    .btn-primary:hover { background:var(--emerald-700); }
    .btn-ghost { background:var(--surface); border-color:var(--hairline); color:var(--ink); }
    .btn-ghost:hover { background:var(--surface-subtle); }
    .btn-danger { background:transparent; border-color:transparent; color:var(--danger); }
    .btn-danger:hover { background:var(--danger-bg); }
    .btn-sm { padding:5px 10px; font-size:12px; }

    .tabs { display:flex; gap:4px; flex-wrap:wrap; }
    .tabs a { padding:7px 13px; border-radius:8px; text-decoration:none; font-size:13px;
      font-weight:600; color:var(--ink-muted); }
    .tabs a:hover { background:var(--surface-sunken); }
    .tabs a.active { background:var(--navy-800); color:#fff; }
    .tabs .n { opacity:.65; font-weight:600; }

    .search { display:flex; gap:8px; }
    input[type=text], input[type=email], input[type=password], input[type=search] {
      width:100%; padding:9px 12px; border:1px solid var(--hairline); border-radius:8px;
      font:inherit; font-size:14px; color:var(--ink); background:var(--surface); }
    input:focus { outline:2px solid var(--emerald-500); outline-offset:-1px; border-color:transparent; }

    .flash { background:var(--emerald-100); color:var(--emerald-700); border:1px solid #A9E3C6;
      padding:11px 15px; border-radius:var(--radius); margin-bottom:18px; font-weight:600; font-size:13px; }
    .empty { padding:52px 18px; text-align:center; color:var(--ink-muted); }
    .empty strong { display:block; color:var(--ink); font-size:15px; margin-bottom:4px; }

    .pager { display:flex; align-items:center; justify-content:space-between; gap:12px;
      padding:13px 18px; border-top:1px solid var(--hairline); font-size:13px; color:var(--ink-muted); }
    .pager .links { display:flex; gap:8px; }
    .pager .links a, .pager .links span { padding:6px 12px; border-radius:8px;
      border:1px solid var(--hairline); text-decoration:none; color:var(--ink); background:var(--surface); }
    .pager .links span { color:var(--ink-faint); background:var(--surface-subtle); }

    form.inline { display:inline; }

    @media (max-width:860px) {
      body { overflow-x:hidden; }
      .content { max-width:100%; }
      table { min-width:520px; }
      .card-head { align-items:flex-start; flex-direction:column; }
      .search { width:100%; }
      .search input { min-width:0 !important; flex:1; }
      .stat-grid { grid-template-columns:1fr 1fr; }
      .shell { flex-direction:column; }
      .sidebar { width:100%; flex:none; height:auto; position:static; flex-direction:row;
        align-items:center; gap:12px; padding:12px 16px; flex-wrap:wrap; }
      .sidebar .nav { flex-direction:row; gap:4px; order:3; flex:1 1 100%;
        overflow-x:auto; padding-bottom:2px; }
      .sidebar .nav a { white-space:nowrap; padding:8px 12px; }
      .nav-label { display:none; }
      .sidebar-foot { margin-top:0; margin-left:auto; border-top:0; padding-top:0;
        display:flex; align-items:center; gap:10px; }
      .sidebar-foot .who { display:none; }
      .topbar, .content { padding-left:16px; padding-right:16px; }
      td.preview, th.preview { display:none; }
      td.when, th.when { font-size:12px; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">O</div>
        <div class="brand-text">Oganiru<span>Admin</span></div>
      </div>

      <nav class="nav">
        <div class="nav-label">Manage</div>
        <a href="{{ route('admin.dashboard') }}" class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
          Overview
        </a>
        <a href="{{ route('admin.contacts.index') }}" class="{{ request()->routeIs('admin.contacts.*') ? 'active' : '' }}">
          <span>Messages</span>
          @php($unread = \App\Models\ContactMessage::inbox()->unread()->count())
          @if($unread > 0)<span class="pip">{{ $unread }}</span>@endif
        </a>
        <a href="{{ route('admin.subscribers.index') }}" class="{{ request()->routeIs('admin.subscribers.*') ? 'active' : '' }}">
          Subscribers
        </a>
      </nav>

      <div class="sidebar-foot">
        <div class="who">{{ auth()->user()?->email }}</div>
        <form method="POST" action="{{ route('admin.logout') }}">
          @csrf
          <button type="submit" class="signout">Sign out</button>
        </form>
      </div>
    </aside>

    <div class="main">
      <header class="topbar">
        <div>
          <h1>@yield('heading', 'Dashboard')</h1>
          @hasSection('subheading')<div class="sub">@yield('subheading')</div>@endif
        </div>
        @yield('topbar-actions')
      </header>

      <main class="content">
        @if(session('status'))
          <div class="flash">{{ session('status') }}</div>
        @endif
        @yield('content')
      </main>
    </div>
  </div>
</body>
</html>
