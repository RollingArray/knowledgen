<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class ConvertResponseObjectToCamelCaseMiddleware
{
    
    /**
     * handle
     *
     * @param mixed $request
     * @param Closure $next
     * 
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $content = $response->getContent();

        try {
            $json = json_decode($content, true);
            
            $replaced = $this->recursiveReplacedObject($json);
            //dd($replaced);
            $response->setContent($replaced);
        } catch (\Exception $e) {
            echo($e);
          // you can log an error here if you want
        }

        return $response;
    }
    
    /**
     * recursiveReplacedObject
     *
     * @param mixed $json
     * 
     * @return mixed
     */
    public function recursiveReplacedObject($json){
        $replaced = [];
        foreach ($json as $key => $value) {

            // if object is an array, convert the key to camel case and put the value in to loop again
            if(is_array($value)){
                $replaced[Str::camel($key)] = $this->recursiveReplacedObject($value);
            }

            // else convert the key to camel case 
            else{
                $replaced[Str::camel($key)] = $value;
            }
        }
        
        return $replaced;
    }
}
