@extends('admin.layout')

@section('title', 'Message #'.$contact->id)
@section('heading', 'Message #'.$contact->id)
@section('subheading', 'Received '.$contact->created_at->format('D, M j Y \a\t H:i').' UTC')

@section('topbar-actions')
  <div style="display:flex;gap:8px;">
    <a href="{{ route('admin.contacts.index') }}" class="btn btn-ghost">Back to inbox</a>
    <a href="mailto:{{ $contact->email }}?subject={{ rawurlencode('Re: your message to Oganiru Technologies') }}"
       class="btn btn-primary">Reply by email</a>
  </div>
@endsection

@section('content')

  <div class="card" style="margin-bottom:18px;">
    <div class="card-head">
      <h2>{{ $contact->email }}</h2>
      <div style="display:flex;gap:8px;align-items:center;">
        @if ($contact->isArchived())
          <span class="badge badge-arch">Archived</span>
        @endif

        <form method="POST" action="{{ route('admin.contacts.read', $contact) }}" class="inline">
          @csrf @method('PATCH')
          <button type="submit" class="btn btn-ghost btn-sm">
            Mark as {{ $contact->isRead() ? 'unread' : 'read' }}
          </button>
        </form>

        @if ($contact->isArchived())
          <form method="POST" action="{{ route('admin.contacts.unarchive', $contact) }}" class="inline">
            @csrf @method('PATCH')
            <button type="submit" class="btn btn-ghost btn-sm">Restore to inbox</button>
          </form>
        @else
          <form method="POST" action="{{ route('admin.contacts.archive', $contact) }}" class="inline">
            @csrf @method('PATCH')
            <button type="submit" class="btn btn-ghost btn-sm">Archive</button>
          </form>
        @endif

        <form method="POST" action="{{ route('admin.contacts.destroy', $contact) }}" class="inline"
              onsubmit="return confirm('Delete this message permanently? This cannot be undone.');">
          @csrf @method('DELETE')
          <button type="submit" class="btn btn-danger btn-sm">Delete</button>
        </form>
      </div>
    </div>

    <div class="card-body">
      <div style="white-space:pre-wrap;font-size:15px;line-height:1.7;color:var(--ink);">{{ $contact->message }}</div>
    </div>
  </div>

  <div class="card" style="margin-bottom:18px;">
    <div class="card-head"><h2>Submission details</h2></div>
    <div class="card-body">
      <div class="table-wrap">
      <table style="font-size:13px;">
        <tbody>
          <tr>
            <td style="width:170px;color:var(--ink-faint);font-weight:600;">Sender</td>
            <td><a href="mailto:{{ $contact->email }}">{{ $contact->email }}</a></td>
          </tr>
          <tr>
            <td style="color:var(--ink-faint);font-weight:600;">Received</td>
            <td>{{ $contact->created_at->format('D, M j Y \a\t H:i:s') }} UTC
                <span style="color:var(--ink-faint);">({{ $contact->created_at->diffForHumans() }})</span></td>
          </tr>
          <tr>
            <td style="color:var(--ink-faint);font-weight:600;">Read</td>
            <td>{{ $contact->read_at ? $contact->read_at->format('D, M j Y \a\t H:i').' UTC' : 'Not yet' }}</td>
          </tr>
          <tr>
            <td style="color:var(--ink-faint);font-weight:600;">IP address</td>
            <td>{{ $contact->ip_address ?? '—' }}</td>
          </tr>
          <tr>
            <td style="color:var(--ink-faint);font-weight:600;">User agent</td>
            <td style="word-break:break-word;color:var(--ink-muted);">{{ $contact->user_agent ?? '—' }}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>

  <div style="display:flex;justify-content:space-between;gap:12px;">
    <div>
      @if ($previous)
        <a href="{{ route('admin.contacts.show', $previous) }}" class="btn btn-ghost">← Older message</a>
      @endif
    </div>
    <div>
      @if ($next)
        <a href="{{ route('admin.contacts.show', $next) }}" class="btn btn-ghost">Newer message →</a>
      @endif
    </div>
  </div>

@endsection
