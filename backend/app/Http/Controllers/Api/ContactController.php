<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Mail\ContactFormMail;
use App\Mail\ContactReceivedMail;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(ContactRequest $request): JsonResponse
    {
        try {
            $contact = ContactMessage::create([
                'email'      => $request->validated('email'),
                'message'    => $request->validated('message'),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            Log::info('Contact message saved', [
                'id'         => $contact->id,
                'email'      => $contact->email,
                'ip_address' => $request->ip(),
            ]);

            $this->queueNotifications($contact);

            return response()->json([
                'success' => true,
                'message' => 'Your message has been received. We\'ll get back to you within '
                             .config('oganiru.reply_window').'.',
            ], 201);

        } catch (\Throwable $e) {
            Log::error('Contact form submission failed', [
                'error'      => $e->getMessage(),
                'trace'      => $e->getTraceAsString(),
                'email'      => $request->validated('email'),
                'ip_address' => $request->ip(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again later.',
            ], 500);
        }
    }

    /**
     * Push both emails onto the queue.
     *
     * The message is already persisted at this point, so a queue or mail
     * failure must never turn a successful submission into a 500 for the
     * visitor. It is logged and swallowed; the message is still in the
     * dashboard either way.
     */
    protected function queueNotifications(ContactMessage $contact): void
    {
        try {
            Mail::to(config('oganiru.admin_email'))
                ->queue(new ContactFormMail($contact));

            Mail::to($contact->email)
                ->queue(new ContactReceivedMail($contact));

            Log::info('Contact notifications queued', ['contact_id' => $contact->id]);

        } catch (\Throwable $e) {
            Log::error('Failed to queue contact notifications', [
                'contact_id' => $contact->id,
                'error'      => $e->getMessage(),
            ]);
        }
    }
}
