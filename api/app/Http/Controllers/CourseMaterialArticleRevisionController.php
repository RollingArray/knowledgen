<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Models\CourseMaterialArticleRevisionModel;

class CourseMaterialArticleRevisionController extends Controller
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
			'article_id' => 'required|alpha_num',
			'article_revision_date' => 'required',
			'operation_type' => 'required|in:CREATE',
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
        $model = new CourseMaterialArticleRevisionModel();

		//adding values to the model
		$model->article_revision_id = uniqid();
        $model->article_id = $request->input('article_id');
		$model->user_id = $userId;
		$model->article_revision_date = $request->input('article_revision_date');
        
		//saving the model to database
        $model->save();

		// return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
