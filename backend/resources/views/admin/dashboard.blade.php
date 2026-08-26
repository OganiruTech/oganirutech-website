@extends('admin.layout')

@section('title', 'Overview')
@section('heading', 'Overview')
@section('subheading', 'Activity across the Oganiru website')

@section('content')

  <div class="stat-grid">
    <div class="stat {{ $stats['contacts_unread'] > 0 ? 'accent' : '' }}">
      <div class="k">Unread messages</div>
      <div class="v">{{ number_format($stats['contacts_unread']) }}</div>
      <div class="d">waiting for a reply</div>
    </div>
    <div class="stat">
      <div class="k">Total messages</div>
      <div class="v">{{ number_format($stats['contacts_total']) }}</div>
      <div class="d">{{ number_format($stats['contacts_week']) }} in the last 7 days</div>
    </div>
    <div class="stat">
      <div class="k">Subscribers</div>
      <div class="v">{{ number_format($stats['subscribers_total']) }}</div>
      <div class="d">{{ number_format($stats['subscribers_week']) }} in the last 7 days</div>
    </div>
  </div>

  <div class="card" style="margin-bottom:22px;">
    <div class="card-head">
      <h2>Latest messages</h2>
      <a href="{{ route('admin.contacts.index') }}" class="btn btn-ghost btn-sm">View all</a>
    </div>

    @forelse ($recentContacts as $contact)
      @if ($loop->first)
        <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th class="preview">Message</th>
              <th>Received</th>
            </tr>
          </thead>
          <tbody>
      @endif
        <tr class="{{ $contact->isRead() ? '' : 'unread' }}">
          <td class="email">
            <a href="{{ route('admin.contacts.show', $contact) }}">{{ $contact->email }}</a>
            @unless ($contact->isRead())
              <span class="badge badge-new" style="margin-left:6px;">New</span>
            @endunless
          </td>
          <td class="preview">{{ $contact->preview(90) }}</td>
          <td class="when">{{ $contact->created_at->diffForHumans() }}</td>
        </tr>
      @if ($loop->last)
          </tbody>
        </table>
        </div>
      @endif
    @empty
      <div class="empty">
        <strong>No messages yet</strong>
        Submissions from the website contact form will appear here.
      </div>
    @endforelse
  </div>

  <div class="card">
    <div class="card-head">
      <h2>Newest subscribers</h2>
      <a href="{{ route('admin.subscribers.index') }}" class="btn btn-ghost btn-sm">View all</a>
    </div>

    @forelse ($recentSubscribers as $subscriber)
      @if ($loop->first)
        <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Subscribed</th>
            </tr>
          </thead>
          <tbody>
      @endif
        <tr>
          <td class="email">{{ $subscriber->email }}</td>
          <td class="when">{{ $subscriber->created_at->diffForHumans() }}</td>
        </tr>
      @if ($loop->last)
          </tbody>
        </table>
        </div>
      @endif
    @empty
      <div class="empty">
        <strong>No subscribers yet</strong>
        Signups from the newsletter form will appear here.
      </div>
    @endforelse
  </div>

@endsection
