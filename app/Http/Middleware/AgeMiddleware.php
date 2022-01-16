<?php

namespace App\Http\Middleware;

use Closure;

class AgeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->input('user_age') <= 18) {
            return response(
                array(
                    'error' => 'Unauthorized'
                ), 
                400
            );
        }
        
        return $next($request);
    }
}
