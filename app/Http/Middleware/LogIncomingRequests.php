<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class LogIncomingRequests
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        Log::info('Request received', [
            'request' => [
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'payload' => $request->getContent(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ],
            'response' => [
                'payload' => $response->getContent(),
                'status' => $response->getStatusCode(),
            ],
        ]);

        return $response;
    }
}
