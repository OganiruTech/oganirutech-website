<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SubscriberController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // Rate-limited public endpoints
    Route::middleware(['throttle:contact'])->group(function () {
        Route::post('/contact', [ContactController::class, 'store']);
    });

    Route::middleware(['throttle:subscribe'])->group(function () {
        Route::post('/subscribe', [SubscriberController::class, 'store']);
    });

});