<?php

namespace App\Http\Middleware;

use App\Http\Interfaces\CourseMaterialServiceInterface;
use Closure;

class CourseMaterialOwnerMiddleware
{
    protected $courseMaterialServiceInterface;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(
        CourseMaterialServiceInterface $courseMaterialServiceInterface

    )
    {
        $this->courseMaterialServiceInterface = $courseMaterialServiceInterface;
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
        $courseMaterialId = $request->input('course_material_id');

        if ($userId && $courseMaterialId) {
            $checkIfUserIsCourseOwner = $this->courseMaterialServiceInterface->checkIfUserIsCourseOwner($userId, $courseMaterialId);

            if(!$checkIfUserIsCourseOwner){
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
						config('messages.apiValidation.courseDetailsMissing')
					)
				),
				401
			);
        }
        
        return $next($request);
    }
}
