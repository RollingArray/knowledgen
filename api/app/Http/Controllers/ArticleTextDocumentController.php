<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\ArticleTextDocumentServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Models\ArticleTextDocumentModel;

class ArticleTextDocumentController extends Controller
{
    /**
	 * JWT Auth Service Interface 
	 *
	 * @var mixed
	 */
	protected $jwtAuthServiceInterface;
	
	/**
	 * Article Text Document Service Interface
	 *
	 * @var mixed
	 */
	protected $articleTextDocumentServiceInterface;

	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		ArticleTextDocumentServiceInterface $articleTextDocumentServiceInterface
	) {
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->articleTextDocumentServiceInterface = $articleTextDocumentServiceInterface;
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

		// get text document fort article id
		$data = $this->articleTextDocumentServiceInterface->getArticleTextDocument($request->input('article_id'));
		
		// return
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

        //creating a model
        $articleTextDocumentModel = new ArticleTextDocumentModel();

		//adding values to the model
        $articleTextDocumentModel->article_text_document_id = uniqid();
        $articleTextDocumentModel->article_id = $request->input('article_id');
        $articleTextDocumentModel->article_text_document_content = $request->input('article_text_document_content');
        
        //saving the user to database
        $articleTextDocumentModel->save();

		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $articleTextDocumentModel);
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
		$model = $this->articleTextDocumentServiceInterface->getArticleTextDocumentByArticleId($request->input('article_id'));

        //modify values to the model
		$model->article_text_document_content = $request->input('article_text_document_content');
        
        //saving the model to database
        $model->save();

		//retrieve updated model
		$model = $this->articleTextDocumentServiceInterface->getArticleTextDocument($request->input('article_id'));

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
