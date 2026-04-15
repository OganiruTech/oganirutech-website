<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Message</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f4f4f5;
      margin: 0;
      padding: 0;
      color: #111827;
    }
    .wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }
    .header {
      background: linear-gradient(135deg, #081520, #0B1C2D);
      padding: 32px 40px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      font-size: 22px;
      margin: 0 0 4px;
      font-weight: 700;
    }
    .header p {
      color: #10b981;
      font-size: 13px;
      margin: 0;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .body {
      padding: 36px 40px;
    }
    .label {
      font-size: 11px;
      font-weight: 700;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 6px;
    }
    .value {
      font-size: 15px;
      color: #111827;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .reply-btn {
      display: inline-block;
      background: #10b981;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      margin-top: 8px;
    }
    .footer {
      padding: 20px 40px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #9ca3af;
      text-align: center;
    }
    .meta {
      font-size: 11px;
      color: #9ca3af;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #f3f4f6;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Oganiru Technologies</h1>
      <p>New Contact Submission</p>
    </div>
    <div class="body">
      <p style="color:#374151; margin-top:0;">
        You have a new message from your website's contact form.
      </p>

      <div class="label">From</div>
      <div class="value">{{ $contact->email }}</div>

      <div class="label">Message</div>
      <div class="value" style="white-space: pre-wrap;">{{ $contact->message }}</div>

      <a href="mailto:{{ $contact->email }}" class="reply-btn">
        Reply to {{ $contact->email }}
      </a>

      <div class="meta">
        Submitted at: {{ $contact->created_at->format('D, M j Y \a\t g:i A') }} (UTC)<br/>
        ID: #{{ $contact->id }}
      </div>
    </div>
    <div class="footer">
      © {{ date('Y') }} Oganiru Technologies — oganiru.tech
    </div>
  </div>
</body>
</html>