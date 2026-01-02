<?php

namespace App\Actions\SmsForwarder;

use App\Models\ForwardedNotification;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Theaarch\SmsForwarder\Contracts\HandlesWebhooks;

class HandleWebhook implements HandlesWebhooks
{
    /**
     * Handle a webhook call.
     *
     * @param  Request  $request
     * @return Response
     */
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'from' => ['required', 'string'],
            'content' => ['required', 'string'],
        ]);

        ForwardedNotification::query()->create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return new Response('Webhook Handled', Response::HTTP_OK);
    }
}
