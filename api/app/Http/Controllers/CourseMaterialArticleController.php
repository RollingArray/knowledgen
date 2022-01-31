<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\CourseMaterialArticleServiceInterface;
use App\Http\Interfaces\CourseMaterialServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use App\Models\CourseMaterialArticleModel;

class CourseMaterialArticleController extends Controller
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
	protected $courseMaterialArticleServiceInterface;

	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		CourseMaterialArticleServiceInterface $courseMaterialArticleServiceInterface
	) {
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->courseMaterialArticleServiceInterface = $courseMaterialArticleServiceInterface;
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
            'article_id' => 'exclude_if:operation_type,CREATE|required|alpha_num',
            'course_material_id' => 'required|alpha_num',
            'article_title' => 'exclude_if:operation_type,DELETE|required|max:255',
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
        $model = new CourseMaterialArticleModel();

		//adding values to the model
        $model->course_material_id = $request->input('course_material_id');
        $model->article_id = uniqid();
        $model->article_title = $request->input('article_title');
        
        //saving the model to database
        $model->save();

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

        //find model
		$model = $this->courseMaterialArticleServiceInterface->getCourseMaterialArticleById($request->input('article_id'));

        //modify values to the model
		$model->article_title = $request->input('article_title');
        
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
		$model = $this->courseMaterialArticleServiceInterface->deleteCourseMaterialArticleById($request->input('article_id'));

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
