<?php

// config/cors.php
return [

    'paths' => ['api/*'],

    'allowed_methods' => ['POST', 'OPTIONS'],

    'allowed_origins' => array_filter([
        env('FRONTEND_URL'),                // https://oganiru.tech in production
        'http://localhost:3000',            // Next.js local dev default
        'http://localhost:3001',            // In case you use a different port
        'http://127.0.0.1:3000',
    ]),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['Content-Type', 'Accept', 'X-Requested-With'],

    'exposed_headers' => [],

    'max_age' => 86400,

    'supports_credentials' => false,

];