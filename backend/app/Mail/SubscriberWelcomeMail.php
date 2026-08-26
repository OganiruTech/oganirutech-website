<?php

namespace App\Mail;

use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * Welcome message sent to a newly confirmed subscriber.
 */
class SubscriberWelcomeMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public int $tries = 3;

    public array $backoff = [60, 300, 900];

    public function __construct(
        public readonly Subscriber $subscriber
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(config('oganiru.from_email'), config('oganiru.from_name')),
            replyTo: [new Address(config('oganiru.admin_email'), config('oganiru.admin_name'))],
            subject: "You're on the list — ".config('oganiru.site_name'),
        );
    }

    public function content(): Content
    {
        return new Content(view: 'emails.subscriber-welcome');
    }
}
