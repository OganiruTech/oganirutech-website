<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // The only authenticated area is the admin panel.
        $middleware->redirectGuestsTo('/admin/login');
        $middleware->redirectUsersTo('/admin');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        /*
         * Never leak internals to API clients.
         *
         * Laravel only hides exception details when APP_DEBUG is false. This
         * renderer makes JSON responses safe regardless of that flag, so a
         * misconfigured .env cannot put database paths, SQL or stack traces
         * in front of a visitor. The full detail still goes to the log.
         */
        $exceptions->render(function (\Throwable $e, Request $request) {
            if (! $request->is('api/*') && ! $request->expectsJson()) {
                return null;
            }

            // Validation and 404/403/429 already produce safe, useful messages.
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                return null;
            }

            if ($e instanceof HttpExceptionInterface) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage() ?: 'Request could not be completed.',
                ], $e->getStatusCode());
            }

            report($e);

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong on our end. Please try again shortly.',
            ], 500);
        });
    })->create();
