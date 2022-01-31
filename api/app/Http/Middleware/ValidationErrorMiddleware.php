<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class ValidationErrorMiddleware
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
        $response = $next($request);
        //$content = $response->getContent();
        //$content = json_decode($content, true);
        //echo $content['error'];

        // try {
        //     $json = json_encode($content, true);
        //    //echo $json['error'];

        //     //if($json['error'] === 1){
                
        //     //}
            
        // } catch (\Exception $e) {
        //   // you can log an error here if you want
        // }

        return response()->json(['error' => 'Unauthorized'], 401, ['X-Header-One' => 'Header Value']);;
    }
}
