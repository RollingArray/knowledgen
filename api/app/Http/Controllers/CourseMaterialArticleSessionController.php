<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\CourseMaterialAssignmentResultServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Models\CourseMaterialArticleAssignmentResultModel;

class CourseMaterialArticleSessionController extends Controller
{
    /**
	 * jwtAuthServiceInterface
	 *
	 * @var mixed
	 */
	protected $jwtAuthServiceInterface;

	protected $courseMaterialAssignmentResultServiceInterface;
			
	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		CourseMaterialAssignmentResultServiceInterface $courseMaterialAssignmentResultServiceInterface
	) {
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
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
			'article_id' => 'required|alpha_num',
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
	 * add
	 *
	 * @param  mixed $request
	 * @return void
	 */
	public function add(Request $request)
    {
		$token = $request->header('Auth');
        $userId = $request->header('UserId');

        //creating a validator
        $validator = Validator::make($request->all(), $this->rules(), $this->customMessages());

        //if validation fails 
        if ($validator->fails()) {
            return response(
                array(
                    'error' => true,
                    'message' => $validator->errors()->all()
                ),
                400
            );
        }

		//creating a new model
        $model = new CourseMaterialArticleAssignmentResultModel();

		//adding values to the model
        $model->article_id = $request->input('article_id');
		$model->user_id = $userId;
        $model->article_assignment_completion_time = $request->input('article_session_time');
		
		//saving the model to database
        $model->save();

		$model = $this->courseMaterialAssignmentResultServiceInterface->getAllSessionTime(
			$request->input('article_id'), 
			$userId
		);

		// return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }

	/**
	 * all time
	 *
	 * @param  mixed $request
	 * @return void
	 */
	public function all(Request $request)
	{
		$token = $request->header('Auth');
        $userId = $request->header('UserId');

        //creating a validator
        $validator = Validator::make($request->all(), $this->rules(), $this->customMessages());

        //if validation fails 
        if ($validator->fails()) {
            return response(
                array(
                    'error' => true,
                    'message' => $validator->errors()->all()
                ),
                400
            );
        }

		$data = $this->courseMaterialAssignmentResultServiceInterface->getAllSessionTime(
			$request->input('article_id'), 
			$userId
		);

		return $this->jwtAuthServiceInterface->sendBackToClient(
			$request->header('Auth'), 
			$request->header('UserId'), 
			'data', 
			$data
		);
	}
}
