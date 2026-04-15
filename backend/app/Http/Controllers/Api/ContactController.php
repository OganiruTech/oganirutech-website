<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Models\ContactMessage;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function store(ContactRequest $request): JsonResponse
    {
        try {
            // Save to database
            $contact = ContactMessage::create([
                'email'      => $request->validated('email'),
                'message'    => $request->validated('message'),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            Log::info('Contact message saved to database', [
                'id'         => $contact->id,
                'email'      => $contact->email,
                'ip_address' => $request->ip(),
                'created_at' => $contact->created_at,
            ]);

            // Send notification email
            Mail::to('oganirutech@gmail.com')
                ->send(new ContactFormMail($contact));

            Log::info('Contact notification email sent successfully', [
                'contact_id' => $contact->id,
                'from_email' => $contact->email,
                'to'         => 'oganirutech@gmail.com',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Your message has been received. We\'ll get back to you within 24 hours.',
            ], 201);

        } catch (\Exception $e) {
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
}