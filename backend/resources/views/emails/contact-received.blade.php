@extends('emails.layout')

@section('title', 'We received your message')
@section('eyebrow', 'Message received')

@section('content')
  <p class="lead">Thanks for reaching out — we have your message.</p>

  <p>
    A member of the Oganiru team will read it and get back to you within
    {{ config('oganiru.reply_window') }}. You do not need to send it again.
  </p>

  <hr class="divider" />

  <div class="label">What you sent us</div>
  <div class="value" style="white-space: pre-wrap;">{{ $contact->message }}</div>

  <a href="{{ config('oganiru.site_url') }}" class="btn">Visit oganiru.tech</a>

  <div class="meta">
    Received {{ $contact->created_at->format('D, M j Y \a\t g:i A') }} UTC<br />
    Reference #{{ $contact->id }} — quote this if you follow up.
  </div>
@endsection

@section('footer')
  &copy; {{ date('Y') }} {{ config('oganiru.site_name') }} &middot;
  <a href="{{ config('oganiru.site_url') }}">oganiru.tech</a><br />
  You are receiving this because you contacted us through our website.
@endsection
