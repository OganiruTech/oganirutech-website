<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>@yield('title', config('oganiru.site_name'))</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f1f5f9;
      margin: 0;
      padding: 0;
      color: #0B1F3B;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(11, 31, 59, 0.10);
    }
    .header {
      background: linear-gradient(135deg, #0B1F3B 0%, #081726 100%);
      padding: 32px 40px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      font-size: 21px;
      margin: 0 0 6px;
      font-weight: 700;
      letter-spacing: -0.2px;
    }
    .header p {
      color: #34D399;
      font-size: 12px;
      margin: 0;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      font-weight: 600;
    }
    .body { padding: 36px 40px; }
    .body p { color: #3E6389; line-height: 1.65; font-size: 15px; }
    .body p.lead { color: #0B1F3B; margin-top: 0; font-size: 16px; }
    .label {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 6px;
    }
    .value {
      font-size: 15px;
      color: #0B1F3B;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 20px;
      line-height: 1.6;
      word-break: break-word;
    }
    .btn {
      display: inline-block;
      background: #0B8248;
      color: #ffffff !important;
      text-decoration: none;
      padding: 13px 28px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      margin-top: 8px;
    }
    .divider { height: 1px; background: #e2e8f0; border: 0; margin: 28px 0; }
    .meta {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #f1f5f9;
      line-height: 1.7;
    }
    .footer {
      padding: 22px 40px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #94a3b8;
      text-align: center;
      line-height: 1.7;
    }
    .footer a { color: #0B8248; text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .wrapper { margin: 0; border-radius: 0; }
      .header, .body, .footer { padding-left: 22px; padding-right: 22px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>{{ config('oganiru.site_name') }}</h1>
      <p>@yield('eyebrow')</p>
    </div>
    <div class="body">
      @yield('content')
    </div>
    <div class="footer">
      @hasSection('footer')
        @yield('footer')
      @else
        &copy; {{ date('Y') }} {{ config('oganiru.site_name') }} &middot;
        <a href="{{ config('oganiru.site_url') }}">oganiru.tech</a><br />
        Nigeria &middot; Building for Africa
      @endif
    </div>
  </div>
</body>
</html>
