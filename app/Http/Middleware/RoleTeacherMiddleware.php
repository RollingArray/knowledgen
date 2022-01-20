<?php

namespace App\Http\Middleware;

use App\Http\Interfaces\CourseMaterialServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use Closure;

class RoleTeacherMiddleware
{
    protected $usersServiceInterface;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(
        UsersServiceInterface $usersServiceInterface

    )
    {
        $this->usersServiceInterface = $usersServiceInterface;
    }

    /**
	 * rules
	 *
	 * @return void
	 */
	public function rules()
	{
		return [
			//
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
        $userId = $request->header('UserId');
        
        if ($userId) {
            $checkIfUserIsTeacher = $this->usersServiceInterface->checkIfUserIsTeacher($userId);

            if(!$checkIfUserIsTeacher){
                return response(
                    array(
                        'error' => true,
                        "message" => array(
                            config('messages.apiValidation.restrictedAccessCourse')
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
						config('messages.apiValidation.restrictedAccessTeacher')
					)
				),
				401
			);
        }
        
        return $next($request);
    }
}
