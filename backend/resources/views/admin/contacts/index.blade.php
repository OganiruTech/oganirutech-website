@extends('admin.layout')

@section('title', 'Messages')
@section('heading', 'Messages')
@section('subheading', number_format($counts['inbox']).' in inbox · '.number_format($counts['unread']).' unread')

@section('content')

  <div class="card">
    <div class="card-head" style="flex-wrap:wrap;">
      <div class="tabs">
        @foreach (['inbox' => 'Inbox', 'unread' => 'Unread', 'archived' => 'Archived', 'all' => 'All'] as $key => $label)
          <a href="{{ route('admin.contacts.index', array_filter(['filter' => $key, 'q' => $search])) }}"
             class="{{ $filter === $key ? 'active' : '' }}">
            {{ $label }} <span class="n">{{ number_format($counts[$key]) }}</span>
          </a>
        @endforeach
      </div>

      <form method="GET" action="{{ route('admin.contacts.index') }}" class="search">
        <input type="hidden" name="filter" value="{{ $filter }}" />
        <input type="search" name="q" value="{{ $search }}"
               placeholder="Search email or message…" style="min-width:220px;" />
        <button type="submit" class="btn btn-ghost">Search</button>
        @if ($search)
          <a href="{{ route('admin.contacts.index', ['filter' => $filter]) }}" class="btn btn-ghost">Clear</a>
        @endif
      </form>
    </div>

    @if ($messages->isEmpty())
      <div class="empty">
        <strong>Nothing here</strong>
        @if ($search)
          No messages match “{{ $search }}”.
        @elseif ($filter === 'unread')
          Every message has been read.
        @elseif ($filter === 'archived')
          Nothing has been archived yet.
        @else
          Submissions from the website contact form will appear here.
        @endif
      </div>
    @else
      <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th class="preview">Message</th>
            <th>Received</th>
            <th style="text-align:right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($messages as $message)
            <tr class="{{ $message->isRead() ? '' : 'unread' }}">
              <td class="email">
                <a href="{{ route('admin.contacts.show', $message) }}">{{ $message->email }}</a>
                @unless ($message->isRead())
                  <span class="badge badge-new" style="margin-left:6px;">New</span>
                @endunless
                @if ($message->isArchived())
                  <span class="badge badge-arch" style="margin-left:6px;">Archived</span>
                @endif
              </td>
              <td class="preview">
                <a href="{{ route('admin.contacts.show', $message) }}"
                   style="color:inherit;text-decoration:none;">{{ $message->preview() }}</a>
              </td>
              <td class="when" title="{{ $message->created_at->format('D, M j Y H:i') }} UTC">
                {{ $message->created_at->diffForHumans() }}
              </td>
              <td class="actions">
                <a href="{{ route('admin.contacts.show', $message) }}" class="btn btn-ghost btn-sm">Open</a>
                @if ($message->isArchived())
                  <form method="POST" action="{{ route('admin.contacts.unarchive', $message) }}" class="inline">
                    @csrf @method('PATCH')
                    <button type="submit" class="btn btn-ghost btn-sm">Restore</button>
                  </form>
                @else
                  <form method="POST" action="{{ route('admin.contacts.archive', $message) }}" class="inline">
                    @csrf @method('PATCH')
                    <button type="submit" class="btn btn-ghost btn-sm">Archive</button>
                  </form>
                @endif
              </td>
            </tr>
          @endforeach
        </tbody>
      </table>
      </div>

      @include('admin.partials.pagination', ['paginator' => $messages])
    @endif
  </div>

@endsection
