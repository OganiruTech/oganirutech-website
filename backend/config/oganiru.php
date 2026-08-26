<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Notification recipient
    |--------------------------------------------------------------------------
    |
    | Where internal alerts (new contact message, new subscriber) are delivered.
    | Set ADMIN_NOTIFICATION_EMAIL in .env to change it without a code deploy.
    |
    */

    'admin_email' => env('ADMIN_NOTIFICATION_EMAIL', 'oganiru@oganiru.tech'),
    'admin_name'  => env('ADMIN_NOTIFICATION_NAME', 'Oganiru Technologies'),

    /*
    |--------------------------------------------------------------------------
    | Outbound identity
    |--------------------------------------------------------------------------
    |
    | The From address on every message the site sends. This must be an address
    | your SMTP provider is authorised to send for, or messages will be
    | rejected or land in spam.
    |
    */

    'from_email' => env('MAIL_FROM_ADDRESS', 'noreply@oganiru.tech'),
    'from_name'  => env('MAIL_FROM_NAME', 'Oganiru Technologies'),

    /*
    |--------------------------------------------------------------------------
    | Public site
    |--------------------------------------------------------------------------
    */

    'site_url'  => env('FRONTEND_URL', 'https://oganiru.tech'),
    'site_name' => 'Oganiru Technologies',

    /*
    |--------------------------------------------------------------------------
    | Response promise
    |--------------------------------------------------------------------------
    |
    | Quoted back to visitors in the contact auto-reply. Keep it honest — this
    | is a commitment the team has to keep.
    |
    */

    'reply_window' => env('CONTACT_REPLY_WINDOW', '24 hours'),

];
