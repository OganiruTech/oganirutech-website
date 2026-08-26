@if ($paginator->hasPages())
  <div class="pager">
    <div>
      Showing {{ $paginator->firstItem() }}–{{ $paginator->lastItem() }}
      of {{ number_format($paginator->total()) }}
    </div>
    <div class="links">
      @if ($paginator->onFirstPage())
        <span>Previous</span>
      @else
        <a href="{{ $paginator->previousPageUrl() }}" rel="prev">Previous</a>
      @endif

      <span>Page {{ $paginator->currentPage() }} of {{ $paginator->lastPage() }}</span>

      @if ($paginator->hasMorePages())
        <a href="{{ $paginator->nextPageUrl() }}" rel="next">Next</a>
      @else
        <span>Next</span>
      @endif
    </div>
  </div>
@endif
