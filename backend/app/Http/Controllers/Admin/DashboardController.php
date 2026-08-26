<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Subscriber;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        $weekAgo = now()->subDays(7);

        return view('admin.dashboard', [
            'stats' => [
                'contacts_total'    => ContactMessage::count(),
                'contacts_unread'   => ContactMessage::unread()->inbox()->count(),
                'contacts_week'     => ContactMessage::where('created_at', '>=', $weekAgo)->count(),
                'subscribers_total' => Subscriber::count(),
                'subscribers_week'  => Subscriber::where('created_at', '>=', $weekAgo)->count(),
            ],
            'recentContacts'    => ContactMessage::inbox()->latest()->limit(5)->get(),
            'recentSubscribers' => Subscriber::latest()->limit(5)->get(),
        ]);
    }
}
