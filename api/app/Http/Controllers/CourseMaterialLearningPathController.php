<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\CourseMaterialArticleServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\LearningPathServiceInterface;
use App\Models\CourseMaterialArticleModel;
use App\Models\LearningPathModel;

class CourseMaterialLearningPathController extends Controller
{
    /**
	 * jwtAuthServiceInterface
	 *
	 * @var mixed
	 */
	protected $jwtAuthServiceInterface;
	
	/**
	 * learningPathServiceInterface
	 *
	 * @var mixed
	 */
	protected $learningPathServiceInterface;

		
	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		LearningPathServiceInterface $learningPathServiceInterface
	) {
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->learningPathServiceInterface = $learningPathServiceInterface;
	}

	/**
	 * rules
	 *
	 * @return void
	 */
	public function rules()
	{
		return [
			'operation_type' => 'required|in:CREATE,DELETE',
            'course_material_id' => 'required|alpha_num'
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
	 * all
	 *
	 * @param  mixed $request
	 * @return void
	 */
	public function all(Request $request)
	{
		$data = $this->learningPathServiceInterface->getLearningPath(
			$request->header('UserId')
		);

		if ($data && $request->header('UserId')) {
			return $this->jwtAuthServiceInterface->sendBackToClient(
				$request->header('Auth'), 
				$request->header('UserId'), 
				'data', 
				$data
			);
			
		} else {
			return response(
				array(
					'error' => true,
					'success' => true,
					"message" => array(
						config('messages.apiValidation.verificationCoreWrong')
					)
				),
				400
			);
		}
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
        $model = new LearningPathModel();

		//adding values to the model
        $model->course_material_id = $request->input('course_material_id');
        $model->user_id = $userId;
		
		//saving the model to database
        $model->save();

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
	
	/**
	 * delete
	 *
	 * @param  mixed $request
	 * @return void
	 */
	public function delete(Request $request)
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

        //find model
		$model = $this->learningPathServiceInterface->deleteLearningPath($userId, $request->input('course_material_id'));

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
