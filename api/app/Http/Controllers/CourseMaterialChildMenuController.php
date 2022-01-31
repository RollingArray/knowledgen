<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\CourseMaterialArticleServiceInterface;
use App\Http\Interfaces\CourseMaterialMenuServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Models\CourseMaterialArticleModel;
use App\Models\CourseMaterialChildMenuModel;
use App\Models\CourseMaterialMenuModel;
use App\Models\CourseMaterialSubChildMenuModel;

class CourseMaterialChildMenuController extends Controller
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

	protected $courseMaterialMenuServiceInterface;

	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		CourseMaterialArticleServiceInterface $courseMaterialArticleServiceInterface,
		CourseMaterialMenuServiceInterface $courseMaterialMenuServiceInterface
	) {
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->courseMaterialArticleServiceInterface = $courseMaterialArticleServiceInterface;
		$this->courseMaterialMenuServiceInterface = $courseMaterialMenuServiceInterface;
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
			'article_title' => 'required',
			'parent_article_id' => 'alpha_num',
			'child_article_id' => 'exclude_if:operation_type,CREATE|required|alpha_num',
			'child_article_order' => 'required|numeric'
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

		// generate article id
		$articleId = uniqid();

		// save course martial article model
		//creating a new model
        $model = new CourseMaterialArticleModel();

		//adding values to the model
        $model->course_material_id = $request->input('course_material_id');
        $model->article_id = $articleId;
        $model->article_title = $request->input('article_title');
        
        //saving the model to database
        $model->save();

		// save course martial sub child menu
        //creating a new model
        $model = new CourseMaterialChildMenuModel();

		//adding values to the model
        $model->parent_article_id = $request->input('parent_article_id');
		$model->course_material_id = $request->input('course_material_id');
        $model->child_article_id = $articleId;
        $model->child_article_order = $request->input('child_article_order');

        //saving the model to database
        $model->save();

		
		// get the saved sub child mode;
		$model = $this->courseMaterialMenuServiceInterface->getChildMenuById(
			$request->input('course_material_id'),
			$articleId
		);

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
