<?php

use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\SubscriberController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
|
| Session-authenticated Blade dashboard. There is no public registration —
| accounts are created from the CLI with `php artisan admin:create`.
|
*/

Route::prefix('admin')->name('admin.')->group(function () {

    Route::middleware('guest')->group(function () {
        Route::get('login', [LoginController::class, 'show'])->name('login');
        Route::post('login', [LoginController::class, 'store'])
            ->middleware('throttle:admin-login');
    });

    Route::middleware('auth')->group(function () {

        Route::post('logout', [LoginController::class, 'destroy'])->name('logout');

        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        // Contact messages
        Route::get('contacts', [ContactMessageController::class, 'index'])->name('contacts.index');
        Route::get('contacts/{contact}', [ContactMessageController::class, 'show'])->name('contacts.show');
        Route::patch('contacts/{contact}/read', [ContactMessageController::class, 'toggleRead'])->name('contacts.read');
        Route::patch('contacts/{contact}/archive', [ContactMessageController::class, 'archive'])->name('contacts.archive');
        Route::patch('contacts/{contact}/unarchive', [ContactMessageController::class, 'unarchive'])->name('contacts.unarchive');
        Route::delete('contacts/{contact}', [ContactMessageController::class, 'destroy'])->name('contacts.destroy');

        // Subscribers — export must be declared before any {subscriber} GET route
        Route::get('subscribers', [SubscriberController::class, 'index'])->name('subscribers.index');
        Route::get('subscribers/export', [SubscriberController::class, 'export'])->name('subscribers.export');
        Route::delete('subscribers/{subscriber}', [SubscriberController::class, 'destroy'])->name('subscribers.destroy');
    });
});
