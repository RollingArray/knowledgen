<?php

namespace App\Http\Middleware;

use App\Http\Interfaces\CourseMaterialAssignmentResultServiceInterface;
use Closure;

class RestrictModifyCourseMaterialMenuMiddleware
{
    protected $courseMaterialAssignmentResultServiceInterface;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(
        CourseMaterialAssignmentResultServiceInterface $courseMaterialAssignmentResultServiceInterface

    )
    {
        $this->courseMaterialAssignmentResultServiceInterface = $courseMaterialAssignmentResultServiceInterface;
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
        $input = $request->all();
        //dd($input['menu_type']);
        $userId = $request->header('UserId');
        if($input['menu_type'] === 'parentMenu'){
            $articleId = $input['parent_article_id'];
        }
        else if($input['menu_type'] === 'childMenu'){
            $articleId = $input['child_article_id'];
        }
        else if($input['menu_type'] === 'subChildMenu'){
            $articleId = $input['sub_child_article_id'];
        }
        

        // if already used by student, can not be edited
		$ifResultExistForArticle = $this->courseMaterialAssignmentResultServiceInterface->checkIfResultExistForAnyUser($articleId);
        if ($ifResultExistForArticle) {
            return response(
				array(
					'error' => true,
					"message" => array(
						config('messages.apiValidation.restrictedAccessEditCourseMaterialMenu')
					)
				),
				400
			);
        }

        return $next($request);
    }
}
