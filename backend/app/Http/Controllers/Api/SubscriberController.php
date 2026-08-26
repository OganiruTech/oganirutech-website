<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubscribeRequest;
use App\Mail\NewSubscriberMail;
use App\Mail\SubscriberWelcomeMail;
use App\Models\Subscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SubscriberController extends Controller
{
    public function store(SubscribeRequest $request): JsonResponse
    {
        try {
            $email = $request->validated('email');

            // Prevent duplicates gracefully
            $subscriber = Subscriber::firstOrCreate(
                ['email' => $email],
                ['ip_address' => $request->ip()]
            );

            if (! $subscriber->wasRecentlyCreated) {
                Log::info('Duplicate subscription attempt', [
                    'email'      => $email,
                    'ip_address' => $request->ip(),
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'You\'re already subscribed. Thanks for your continued support!',
                ], 200);
            }

            Log::info('New newsletter subscriber', [
                'id'         => $subscriber->id,
                'email'      => $subscriber->email,
                'ip_address' => $request->ip(),
            ]);

            $this->queueNotifications($subscriber);

            return response()->json([
                'success' => true,
                'message' => 'You\'ve been subscribed successfully! Check your inbox for a confirmation.',
            ], 201);

        } catch (\Throwable $e) {
            Log::error('Newsletter subscription failed', [
                'error'      => $e->getMessage(),
                'trace'      => $e->getTraceAsString(),
                'email'      => $request->validated('email'),
                'ip_address' => $request->ip(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Subscription failed. Please try again.',
            ], 500);
        }
    }

    /**
     * Push both emails onto the queue.
     *
     * The subscriber row is already committed, so mail problems are logged
     * rather than surfaced — we do not want to tell someone their signup
     * failed when it did not.
     */
    protected function queueNotifications(Subscriber $subscriber): void
    {
        try {
            Mail::to(config('oganiru.admin_email'))
                ->queue(new NewSubscriberMail($subscriber, Subscriber::count()));

            Mail::to($subscriber->email)
                ->queue(new SubscriberWelcomeMail($subscriber));

            Log::info('Subscriber notifications queued', ['subscriber_id' => $subscriber->id]);

        } catch (\Throwable $e) {
            Log::error('Failed to queue subscriber notifications', [
                'subscriber_id' => $subscriber->id,
                'error'         => $e->getMessage(),
            ]);
        }
    }
}
