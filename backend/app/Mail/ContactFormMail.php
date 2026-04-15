<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly ContactMessage $contact
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('noreply@oganiru.tech', 'Oganiru Technologies'),
            replyTo: [
                new Address($this->contact->email),
            ],
            subject: 'New Contact Form Submission — Oganiru Technologies',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact',
        );
    }
}