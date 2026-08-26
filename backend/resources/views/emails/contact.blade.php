@extends('emails.layout')

@section('title', 'New contact message')
@section('eyebrow', 'New contact submission')

@section('content')
  <p class="lead">You have a new message from the website contact form.</p>

  <div class="label">From</div>
  <div class="value">{{ $contact->email }}</div>

  <div class="label">Message</div>
  <div class="value" style="white-space: pre-wrap;">{{ $contact->message }}</div>

  <a href="mailto:{{ $contact->email }}" class="btn">Reply to {{ $contact->email }}</a>

  @isset($dashboardUrl)
    <p style="font-size: 13px; margin-top: 20px;">
      Or <a href="{{ $dashboardUrl }}" style="color:#0B8248;">open it in the dashboard</a>.
    </p>
  @endisset

  <div class="meta">
    Submitted {{ $contact->created_at->format('D, M j Y \a\t g:i A') }} UTC<br />
    IP {{ $contact->ip_address ?? 'unknown' }}<br />
    Reference #{{ $contact->id }}
  </div>
@endsection

@section('footer')
  Internal notification &middot; sent to {{ config('oganiru.admin_email') }}
@endsection
