<?php

namespace Tests\Feature;

use App\Mail\NewSubscriberMail;
use App\Mail\SubscriberWelcomeMail;
use App\Models\Subscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class SubscriptionTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_stores_the_subscriber_and_queues_both_emails(): void
    {
        Mail::fake();

        $this->postJson('/api/v1/subscribe', ['email' => 'reader@gmail.com'])
            ->assertCreated()
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('subscribers', ['email' => 'reader@gmail.com']);

        Mail::assertQueued(NewSubscriberMail::class, function ($mail) {
            return $mail->hasTo(config('oganiru.admin_email'));
        });

        Mail::assertQueued(SubscriberWelcomeMail::class, function ($mail) {
            return $mail->hasTo('reader@gmail.com');
        });
    }

    public function test_a_duplicate_signup_is_accepted_but_sends_nothing(): void
    {
        Subscriber::factory()->create(['email' => 'reader@gmail.com']);

        Mail::fake();

        $this->postJson('/api/v1/subscribe', ['email' => 'reader@gmail.com'])
            ->assertOk()
            ->assertJson(['success' => true]);

        $this->assertDatabaseCount('subscribers', 1);
        Mail::assertNothingQueued();
    }
}
