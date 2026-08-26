<?php

namespace Tests\Feature;

use App\Mail\ContactFormMail;
use App\Mail\ContactReceivedMail;
use App\Models\ContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactSubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_stores_the_message_and_queues_both_emails(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/v1/contact', [
            'email'   => 'visitor@gmail.com',
            'message' => 'I would like to discuss a project with your team.',
        ]);

        $response->assertCreated()->assertJson(['success' => true]);

        $this->assertDatabaseHas('contact_messages', [
            'email' => 'visitor@gmail.com',
        ]);

        // Internal alert goes to the configured admin address
        Mail::assertQueued(ContactFormMail::class, function ($mail) {
            return $mail->hasTo(config('oganiru.admin_email'));
        });

        // Acknowledgement goes back to the visitor
        Mail::assertQueued(ContactReceivedMail::class, function ($mail) {
            return $mail->hasTo('visitor@gmail.com');
        });
    }

    public function test_a_new_message_starts_unread(): void
    {
        Mail::fake();

        $this->postJson('/api/v1/contact', [
            'email'   => 'visitor@gmail.com',
            'message' => 'Please get in touch about a partnership.',
        ])->assertCreated();

        $this->assertNull(ContactMessage::first()->read_at);
    }

    public function test_it_rejects_an_invalid_submission(): void
    {
        Mail::fake();

        $this->postJson('/api/v1/contact', [
            'email'   => 'not-an-email',
            'message' => 'short',
        ])->assertStatus(422);

        $this->assertDatabaseCount('contact_messages', 0);
        Mail::assertNothingQueued();
    }
}
