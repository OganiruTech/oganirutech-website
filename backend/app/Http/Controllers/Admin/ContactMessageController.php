<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ContactMessageController extends Controller
{
    /**
     * Tabs the inbox can be filtered by.
     */
    protected const FILTERS = ['inbox', 'unread', 'archived', 'all'];

    public function index(Request $request): View
    {
        $filter = in_array($request->query('filter'), self::FILTERS, true)
            ? $request->query('filter')
            : 'inbox';

        $search = $request->query('q');

        $query = ContactMessage::query()->search($search);

        $query = match ($filter) {
            'unread'   => $query->inbox()->unread(),
            'archived' => $query->archived(),
            'all'      => $query,
            default    => $query->inbox(),
        };

        $messages = $query->latest()->paginate(20)->withQueryString();

        return view('admin.contacts.index', [
            'messages' => $messages,
            'filter'   => $filter,
            'search'   => $search,
            'counts'   => [
                'inbox'    => ContactMessage::inbox()->count(),
                'unread'   => ContactMessage::inbox()->unread()->count(),
                'archived' => ContactMessage::archived()->count(),
                'all'      => ContactMessage::count(),
            ],
        ]);
    }

    public function show(ContactMessage $contact): View
    {
        // Opening a message is what marks it read.
        $contact->markAsRead();

        return view('admin.contacts.show', [
            'contact'  => $contact,
            'previous' => ContactMessage::where('id', '<', $contact->id)->latest('id')->first(),
            'next'     => ContactMessage::where('id', '>', $contact->id)->oldest('id')->first(),
        ]);
    }

    public function toggleRead(ContactMessage $contact): RedirectResponse
    {
        $contact->isRead() ? $contact->markAsUnread() : $contact->markAsRead();

        return back()->with('status', $contact->isRead() ? 'Marked as read.' : 'Marked as unread.');
    }

    public function archive(ContactMessage $contact): RedirectResponse
    {
        $contact->archive();

        return redirect()
            ->route('admin.contacts.index')
            ->with('status', 'Message archived.');
    }

    public function unarchive(ContactMessage $contact): RedirectResponse
    {
        $contact->unarchive();

        return back()->with('status', 'Message restored to inbox.');
    }

    public function destroy(ContactMessage $contact): RedirectResponse
    {
        $contact->delete();

        return redirect()
            ->route('admin.contacts.index')
            ->with('status', 'Message deleted permanently.');
    }
}
