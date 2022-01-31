<?php

namespace App\Http\Middleware;

use App\Http\Interfaces\JWTAuthServiceInterface;
use Illuminate\Support\Facades\Validator;
use Closure;

class AuthenticateMiddleware
{
    protected $jwtAuthServiceInterface;
    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(
        JWTAuthServiceInterface $jwtAuthServiceInterface 
    )
    {
        $this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
    }

    /**
	 * rules
	 *
	 * @return void
	 */
	public function rules()
	{
		return [
			'UserId' => 'required|alpha_num',
            'Auth' => 'required|alpha_num'
		];
	}

	/**
	 * custom messages
	 *
	 * @return void
	 */
	public function customMessages()
	{
		return [
			//
		];
	}

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('Auth');
        $user = $request->header('UserId');

        //creating a validator
		//$validator = Validator::make($request->headers(), $this->rules(), $this->customMessages());

		//if validation fails 
		// if (!$token) {
		// 	return response(
		// 		array(
		// 			'error' => true,
		// 			"message" => array(
        //                 config('messages.apiValidation.userHeaderMissing')
        //             )
		// 		),
		// 		400
		// 	);
		// }
        
        if ($token && $user) {
            $checkSessionUser = $this->jwtAuthServiceInterface->checkSessionUser(
                $token,
                $user
            );
            if(!$checkSessionUser){
                return response(
                    array(
                        'error' => true,
                        "message" => array(
                            config('messages.apiValidation.invalidToken')
                        )
                    ),
                    401
                );
            }
        }
        else{
            return response(
				array(
					'error' => true,
					"message" => array(
						config('messages.apiValidation.headerMissing')
					)
				),
				401
			);
        }
        
        return $next($request);
    }
}
