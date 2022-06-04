<?php

namespace App\Domains\Marker;

use App\Domains\Marker\Http\Controllers\MarkerController;
use Illuminate\Support\Facades\Route;

class Domain {
    public static function api() {
        Route::apiResource('markers', MarkerController::class)->only('index', 'store');
    }
}