@extends('emails.layout')

@section('title', 'New newsletter subscriber')
@section('eyebrow', 'New subscriber')

@section('content')
  <p class="lead">Someone just joined the Oganiru mailing list.</p>

  <div class="label">Email</div>
  <div class="value">{{ $subscriber->email }}</div>

  <p style="font-size: 14px;">
    That brings the list to <strong>{{ number_format($totalSubscribers) }}</strong>
    {{ \Illuminate\Support\Str::plural('subscriber', $totalSubscribers) }}.
  </p>

  @isset($dashboardUrl)
    <a href="{{ $dashboardUrl }}" class="btn">View subscribers</a>
  @endisset

  <div class="meta">
    Subscribed {{ $subscriber->created_at->format('D, M j Y \a\t g:i A') }} UTC<br />
    IP {{ $subscriber->ip_address ?? 'unknown' }}<br />
    Reference #{{ $subscriber->id }}
  </div>
@endsection

@section('footer')
  Internal notification &middot; sent to {{ config('oganiru.admin_email') }}
@endsection
