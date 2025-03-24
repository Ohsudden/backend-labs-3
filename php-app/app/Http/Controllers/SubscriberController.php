<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Subscriber::orderBy('created_at', 'desc')->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|string|unique:subscribers,email',
            'name' => 'required|string|between:2,100',
            'subscriptions' => 'required|array'
        ]);

        $subscriber = Subscriber::create($validated);
        return response()->json([$subscriber
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $subscriber = Subscriber::findOrFail($id);
        return response()->json($subscriber);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $subscriber = Subscriber::findOrFail($id);

        $validated = $request->validate([
            'email' => 'sometimes|required|email|string|unique:subscribers,email,' . $subscriber->id,
            'name' => 'sometimes|required|string|between:2,100',
            'subscriptions' => 'sometimes|required|array'
        ]);

        $subscriber->update($validated);
        return response()->json($subscriber);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $subscriber = Subscriber::findOrFail($id);
        $subscriber->delete();

        return response()->json(null, 204);
    }
}
