@extends('admin.layout')

@section('title', 'Subscribers')
@section('heading', 'Subscribers')
@section('subheading', number_format($total).' '.\Illuminate\Support\Str::plural('person', $total).' on the mailing list')

@section('topbar-actions')
  <a href="{{ route('admin.subscribers.export') }}" class="btn btn-primary">Export CSV</a>
@endsection

@section('content')

  <div class="card">
    <div class="card-head" style="flex-wrap:wrap;">
      <h2>All subscribers</h2>

      <form method="GET" action="{{ route('admin.subscribers.index') }}" class="search">
        <input type="search" name="q" value="{{ $search }}"
               placeholder="Search email…" style="min-width:220px;" />
        <button type="submit" class="btn btn-ghost">Search</button>
        @if ($search)
          <a href="{{ route('admin.subscribers.index') }}" class="btn btn-ghost">Clear</a>
        @endif
      </form>
    </div>

    @if ($subscribers->isEmpty())
      <div class="empty">
        <strong>No subscribers{{ $search ? ' match that search' : ' yet' }}</strong>
        @unless ($search)
          Signups from the newsletter form will appear here.
        @endunless
      </div>
    @else
      <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th style="width:70px;">ID</th>
            <th>Email</th>
            <th>Subscribed</th>
            <th style="text-align:right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($subscribers as $subscriber)
            <tr>
              <td class="when">#{{ $subscriber->id }}</td>
              <td class="email">{{ $subscriber->email }}</td>
              <td class="when" title="{{ $subscriber->created_at->format('D, M j Y H:i') }} UTC">
                {{ $subscriber->created_at->diffForHumans() }}
              </td>
              <td class="actions">
                <form method="POST" action="{{ route('admin.subscribers.destroy', $subscriber) }}" class="inline"
                      onsubmit="return confirm('Remove {{ $subscriber->email }} from the mailing list?');">
                  @csrf @method('DELETE')
                  <button type="submit" class="btn btn-danger btn-sm">Remove</button>
                </form>
              </td>
            </tr>
          @endforeach
        </tbody>
      </table>
      </div>

      @include('admin.partials.pagination', ['paginator' => $subscribers])
    @endif
  </div>

@endsection
