<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Http\Interfaces\CourseMaterialArticleServiceInterface;
use App\Http\Interfaces\CourseMaterialQuizServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Models\CourseMaterialArticleModel;
use App\Models\CourseMaterialQuizAnswerModel;
use App\Models\CourseMaterialQuizModel;

class CourseMaterialQuizController extends Controller
{
    /**
	 * jwtAuthServiceInterface
	 *
	 * @var mixed
	 */
	protected $jwtAuthServiceInterface;
	
	/**
	 * courseMaterialArticleServiceInterface
	 *
	 * @var mixed
	 */
	protected $courseMaterialQuizServiceInterface;

		
	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		CourseMaterialQuizServiceInterface $courseMaterialQuizServiceInterface
	) {
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->courseMaterialQuizServiceInterface = $courseMaterialQuizServiceInterface;
	}

	/**
	 * rules
	 *
	 * @return void
	 */
	public function rules()
	{
		return [
			'operation_type' => 'required|in:CREATE,EDIT,DELETE',
			'question_id' => 'exclude_if:operation_type,CREATE|required|alpha_num',
            'article_id' => 'required|alpha_num',
			'question' => 'required',
            'quiz_type' => 'required|in:mcq,trueFalse',
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
		$data = $this->courseMaterialQuizServiceInterface->getAllQuizForArticle(
			$request->input('article_id')
		);

		return $this->jwtAuthServiceInterface->sendBackToClient(
			$request->header('Auth'), 
			$request->header('UserId'), 
			'data', 
			$data
		);
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

		$questionId = uniqid();

		
		//dd($array);
        //creating a new model
        $model = new CourseMaterialQuizModel();

		//adding values to the model
        $model->article_id = $request->input('article_id');
        $model->question_id = $questionId;
        $model->question = $request->input('question');
		$model->quiz_type = $request->input('quiz_type');
		
        
        //saving the model to database
        $model->save();

		foreach($request->input('options') as $option){
			$quizAnswerModel = new CourseMaterialQuizAnswerModel();
			$quizAnswerModel->question_id = $questionId;
			$quizAnswerModel->answer_id = uniqid();
			$quizAnswerModel->answer = $option['answer'];
			$quizAnswerModel->is_correct = $option['isCorrect'];
			$quizAnswerModel->save();
		}

		// Get the complete model back
		$model = $this->courseMaterialQuizServiceInterface->getQuestionDetails($questionId);
		
        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }

	/**
	 * edit
	 *
	 * @param  mixed $request
	 * @return void
	 */
	public function edit(Request $request)
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

		$questionId = $request->input('question_id');

		// find question model
		$model = $this->courseMaterialQuizServiceInterface->getQuestion($questionId);
		
		// modify values to the question model
		$model->question = $request->input('question');
		$model->quiz_type = $request->input('quiz_type');

		// save question model
		$model->save();

		// delete all answers
		$model = $this->courseMaterialQuizServiceInterface->deleteAnswersForQuestion($request->input('question_id'));
		
		// add new answers
		foreach($request->input('options') as $option){
			$quizAnswerModel = new CourseMaterialQuizAnswerModel();
			$quizAnswerModel->question_id = $questionId;
			$quizAnswerModel->answer_id = uniqid();
			$quizAnswerModel->answer = $option['answer'];
			$quizAnswerModel->is_correct = $option['isCorrect'];
			$quizAnswerModel->save();
		}

		// // Get the complete model back
		$model = $this->courseMaterialQuizServiceInterface->getQuestionDetails($questionId);

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
		$model = $this->courseMaterialQuizServiceInterface->deleteQuestion($request->input('question_id'));

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
