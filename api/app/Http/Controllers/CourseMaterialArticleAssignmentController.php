<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Models\CourseMaterialArticleAssignmentResultModel;

class CourseMaterialArticleAssignmentController extends Controller
{
    /**
	 * jwtAuthServiceInterface
	 *
	 * @var mixed
	 */
	protected $jwtAuthServiceInterface;
			
	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface
	) {
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
			'operation_type' => 'required|in:CREATE',
			'article_id' => 'required|alpha_num',
			'article_assignment_completion_reward' => 'required|numeric',
			'article_assignment_completion_time' => 'required|string',
			'article_assignment_total_no_of_questions' => 'required|numeric',
			'article_assignment_total_no_of_correct_answers' => 'required|numeric'
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
	 * result
	 *
	 * @param  mixed $request
	 * @return void
	 */
	public function result(Request $request)
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
        $model->article_assignment_completion_reward = $request->input('article_assignment_completion_reward');
		$model->article_assignment_completion_time = $request->input('article_assignment_completion_time');
		$model->article_assignment_total_no_of_questions = $request->input('article_assignment_total_no_of_questions');
		$model->article_assignment_total_no_of_correct_answers = $request->input('article_assignment_total_no_of_correct_answers');
        
		//dd($model);
        //saving the model to database
        $model->save();

		// return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
