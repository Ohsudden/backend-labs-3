<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Subscription::orderBy('created_at', 'desc')->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service' => 'required|string',
            'topic' => 'required|string',
            'payload' => 'nullable',
            'expired_at' => 'nullable'
        ]);
        $subscription = Subscription::create($validated);
        return response()->json([$subscription
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $subscription = Subscription::findOrFail($id);
        return response()->json($subscription);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $subscription = Subscription::findOrFail($id);

        $validated = $request->validate([
            'service' => 'sometimes|required|string',
            'topic' => 'sometimes|required|string',
            'payload' => 'nullable',
            'expired_at' => 'nullable'
        ]);

        $subscription->update($validated);
        return response()->json($subscription);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $subscription = Subscription::findOrFail($id);
        $subscription->delete();
        return response()->json(null, 204);
    }
}
