<?php

namespace App\Domains\Marker\Http\Controllers;

use App\Domains\Marker\Http\Resources\MarkerResource;
use App\Http\Controllers\Controller;
use App\Models\Marker;
use App\Domains\Marker\Http\Requests\Marker as Requests;
use Illuminate\Http\Request;

class MarkerController extends Controller
{
    public function index(Request $request)
    {
        return MarkerResource::collection(
            Marker::query()
                ->bySession(hash('sha256', $request->ip()))
                ->recent()
                ->latest()
                ->get()
        );
    }

    public function store(Requests\StoreRequest $request)
    {
        $marker = Marker::create(array_merge(
            $request->only('name', 'description', 'lat', 'lng'),
            ['session' => hash('sha256', $request->ip())]
        ));

        return new MarkerResource($marker);
    }
}
