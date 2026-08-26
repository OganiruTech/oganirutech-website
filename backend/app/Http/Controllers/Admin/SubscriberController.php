<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SubscriberController extends Controller
{
    public function index(Request $request): View
    {
        $search = $request->query('q');

        return view('admin.subscribers.index', [
            'subscribers' => Subscriber::query()
                ->search($search)
                ->latest()
                ->paginate(50)
                ->withQueryString(),
            'search' => $search,
            'total'  => Subscriber::count(),
        ]);
    }

    /**
     * Stream the full list as CSV.
     *
     * Streamed rather than built in memory so the export does not grow a
     * memory footprint as the list grows.
     */
    public function export(): StreamedResponse
    {
        $filename = 'oganiru-subscribers-'.now()->format('Y-m-d').'.csv';

        return response()->streamDownload(function () {
            $handle = fopen('php://output', 'w');

            // BOM so Excel opens UTF-8 addresses correctly
            fwrite($handle, "\xEF\xBB\xBF");

            fputcsv($handle, ['ID', 'Email', 'Subscribed at (UTC)']);

            Subscriber::oldest('id')->chunk(500, function ($chunk) use ($handle) {
                foreach ($chunk as $subscriber) {
                    fputcsv($handle, [
                        $subscriber->id,
                        $subscriber->email,
                        $subscriber->created_at?->format('Y-m-d H:i:s'),
                    ]);
                }
            });

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function destroy(Subscriber $subscriber): RedirectResponse
    {
        $subscriber->delete();

        return back()->with('status', 'Subscriber removed.');
    }
}
