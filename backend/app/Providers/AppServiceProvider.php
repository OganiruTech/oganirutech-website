<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        $this->configureRateLimiting();
    }

    protected function configureRateLimiting(): void
    {
        // Contact form: max 5 submissions per hour per IP
        RateLimiter::for('contact', function (Request $request) {
            return Limit::perHour(5)->by($request->ip())->response(function () {
                return response()->json([
                    'success' => false,
                    'message' => 'Too many submissions. Please wait before trying again.',
                ], 429);
            });
        });

        // Subscribe: max 10 attempts per hour per IP
        RateLimiter::for('subscribe', function (Request $request) {
            return Limit::perHour(10)->by($request->ip())->response(function () {
                return response()->json([
                    'success' => false,
                    'message' => 'Too many attempts. Please try again later.',
                ], 429);
            });
        });

        // Admin login: 5 attempts per minute per IP+email pair, to blunt
        // credential stuffing without locking a legitimate admin out for long.
        RateLimiter::for('admin-login', function (Request $request) {
            $key = strtolower((string) $request->input('email')).'|'.$request->ip();

            return Limit::perMinute(5)->by($key);
        });
    }
}
