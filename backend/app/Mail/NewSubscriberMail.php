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
 * Internal alert: someone joined the mailing list.
 */
class NewSubscriberMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public int $tries = 3;

    public array $backoff = [60, 300, 900];

    public function __construct(
        public readonly Subscriber $subscriber,
        public readonly int $totalSubscribers = 0,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(config('oganiru.from_email'), config('oganiru.from_name')),
            subject: 'New newsletter subscriber — '.config('oganiru.site_name'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.subscriber-new',
            with: [
                'dashboardUrl' => route('admin.subscribers.index'),
            ],
        );
    }
}
