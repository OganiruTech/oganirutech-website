@extends('emails.layout')

@section('title', 'You are on the list')
@section('eyebrow', 'Subscription confirmed')

@section('content')
  <p class="lead">You're on the list.</p>

  <p>
    Thanks for subscribing. You'll get occasional notes on what we're building
    and shipping at Oganiru — no noise, and nothing more often than we have
    something worth saying.
  </p>

  <a href="{{ config('oganiru.site_url') }}" class="btn">Explore what we build</a>

  <div class="meta">
    Confirmed {{ $subscriber->created_at->format('D, M j Y \a\t g:i A') }} UTC
  </div>
@endsection

@section('footer')
  &copy; {{ date('Y') }} {{ config('oganiru.site_name') }} &middot;
  <a href="{{ config('oganiru.site_url') }}">oganiru.tech</a><br />
  You subscribed at oganiru.tech. Reply to this email to be removed.
@endsection
