<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Sign in · Oganiru Admin</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%230B1F3B'/><path d='M9 20.5 16 9l7 11.5H9Z' fill='%230F9D58'/></svg>" />
  <style>
    * { box-sizing:border-box; }
    body {
      margin:0; min-height:100vh; display:grid; place-items:center; padding:24px;
      background:radial-gradient(1000px 560px at 50% -8%, #12305A 0%, #0B1F3B 45%, #081726 100%);
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
      color:#0B1F3B; font-size:14px; -webkit-font-smoothing:antialiased;
    }
    .box { width:100%; max-width:390px; }
    .brand { display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:22px; }
    .brand-mark { width:34px; height:34px; border-radius:8px; background:#0F9D58;
      display:grid; place-items:center; font-weight:800; color:#081726; font-size:17px; }
    .brand-text { color:#fff; font-weight:700; font-size:16px; letter-spacing:-.01em; }
    .brand-text span { display:block; font-size:10px; font-weight:600; color:#7FD3A8;
      letter-spacing:1.2px; text-transform:uppercase; }
    .card { background:#fff; border-radius:14px; padding:30px 28px;
      box-shadow:0 20px 50px rgba(0,0,0,.28); }
    h1 { font-size:19px; margin:0 0 4px; letter-spacing:-.02em; }
    .sub { color:#3E6389; margin:0 0 22px; font-size:13px; }
    label { display:block; font-size:12px; font-weight:700; margin-bottom:6px; color:#0B1F3B; }
    input[type=email], input[type=password] {
      width:100%; padding:11px 13px; border:1px solid #E2E8F0; border-radius:9px;
      font:inherit; font-size:14px; margin-bottom:15px; color:#0B1F3B; }
    input:focus { outline:2px solid #0F9D58; outline-offset:-1px; border-color:transparent; }
    .row { display:flex; align-items:center; gap:8px; margin-bottom:20px; font-size:13px; color:#3E6389; }
    button { width:100%; background:#0B8248; color:#fff; border:0; padding:12px;
      border-radius:9px; font:inherit; font-size:14px; font-weight:600; cursor:pointer; }
    button:hover { background:#0A6E3D; }
    .errors { background:#FEF3F2; border:1px solid #FDA29B; color:#B42318;
      padding:11px 14px; border-radius:9px; margin-bottom:18px; font-size:13px; font-weight:600; }
    .errors ul { margin:0; padding-left:16px; }
    .foot { text-align:center; margin-top:18px; font-size:12px; color:#6E8CAE; }
  </style>
</head>
<body>
  <div class="box">
    <div class="brand">
      <div class="brand-mark">O</div>
      <div class="brand-text">Oganiru<span>Admin</span></div>
    </div>

    <div class="card">
      <h1>Sign in</h1>
      <p class="sub">Enter your administrator credentials to continue.</p>

      @if ($errors->any())
        <div class="errors">
          <ul>
            @foreach ($errors->all() as $error)
              <li>{{ $error }}</li>
            @endforeach
          </ul>
        </div>
      @endif

      <form method="POST" action="{{ route('admin.login') }}">
        @csrf

        <label for="email">Email address</label>
        <input id="email" type="email" name="email" value="{{ old('email') }}"
               required autofocus autocomplete="username" />

        <label for="password">Password</label>
        <input id="password" type="password" name="password"
               required autocomplete="current-password" />

        <div class="row">
          <input type="checkbox" id="remember" name="remember" value="1" style="width:auto;margin:0;" />
          <label for="remember" style="margin:0;font-weight:500;">Keep me signed in</label>
        </div>

        <button type="submit">Sign in</button>
      </form>
    </div>

    <p class="foot">Oganiru Technologies · authorised access only</p>
  </div>
</body>
</html>
