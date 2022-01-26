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

class ArticleComponentController extends Controller
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
			'article_id' => 'required',
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

        $data = $this->articleComponentServiceInterface->getArticleComponents($request->input('article_id'));

		return $this->jwtAuthServiceInterface->sendBackToClient(
			$request->header('Auth'), 
			$request->header('UserId'), 
			'data', 
			$data
		);
    }
}
