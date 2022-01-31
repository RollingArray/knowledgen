<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\ArticleComponentServiceInterface;
use App\Http\Interfaces\CourseMaterialServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use App\Models\ArticleComponentArticleModel;
use App\Models\ArticleComponentModel;

class ArticleComponentCrudController extends Controller
{
    /**
	 * jwtAuthServiceInterface
	 *
	 * @var mixed
	 */
	protected $jwtAuthServiceInterface;
	
	/**
	 * articleComponentServiceInterface
	 *
	 * @var mixed
	 */
	protected $articleComponentServiceInterface;

	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		ArticleComponentServiceInterface $articleComponentServiceInterface
	) {
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->articleComponentServiceInterface = $articleComponentServiceInterface;
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
			'article_id' => 'required',
			'course_material_id' => 'required|alpha_num',
            'article_component_id' => 'exclude_if:operation_type,CREATE|required|alpha_num',
            'article_component_order' => 'required',
            'article_component_type' => 'required',
			'article_component_content' => 'required'
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
        $model = new ArticleComponentModel();

		//adding values to the model
        $model->article_id = $request->input('article_id');
        $model->article_component_id = uniqid();
        $model->article_component_order = $request->input('article_component_order');
		$model->article_component_type = $request->input('article_component_type');
		$model->article_component_content = $request->input('article_component_content');
        
        //saving the model to database
        $model->save();

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
