<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubscribeRequest;
use App\Models\Subscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

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

            if ($subscriber->wasRecentlyCreated) {
                Log::info('New newsletter subscriber', [
                    'id'         => $subscriber->id,
                    'email'      => $subscriber->email,
                    'ip_address' => $request->ip(),
                    'created_at' => $subscriber->created_at,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'You\'ve been subscribed successfully! Welcome aboard.',
                ], 201);
            }

            Log::info('Duplicate subscription attempt', [
                'email'      => $email,
                'ip_address' => $request->ip(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'You\'re already subscribed. Thanks for your continued support!',
            ], 200);

        } catch (\Exception $e) {
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
}