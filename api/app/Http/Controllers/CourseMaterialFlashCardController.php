<?php

namespace App\Http\Controllers;
use App\Http\Interfaces\CourseMaterialFlashCardServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Models\CourseMaterialFlashCardModel;

class CourseMaterialFlashCardController extends Controller
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
	protected $courseMaterialFlashCardServiceInterface;

		
	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		CourseMaterialFlashCardServiceInterface $courseMaterialFlashCardServiceInterface
	) {
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->courseMaterialFlashCardServiceInterface = $courseMaterialFlashCardServiceInterface;
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
			'card_id' => 'exclude_if:operation_type,CREATE|required|alpha_num',
            'article_id' => 'required|alpha_num',
            'front_media_type' => 'sometimes|in:image,video,audio,none',
            'front_media' => 'sometimes',
            'front_content' => 'sometimes',
            'back_media_type' => 'sometimes|in:image,video,audio,none',
            'back_media' => 'sometimes',
            'back_content' => 'sometimes',
            'back_content_more' => 'sometimes'
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
		$data = $this->courseMaterialFlashCardServiceInterface->getAllFlashCardForArticle(
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

		$cardId = uniqid();

		
		//dd($array);
        //creating a new model
        $model = new CourseMaterialFlashCardModel();

		//adding values to the model
        $model->article_id = $request->input('article_id');
        $model->card_id = $cardId;
		$model->front_media_type = $request->input('front_media_type');
		$model->front_media = $request->input('front_media');
		$model->front_content = $request->input('front_content');
		$model->back_media_type = $request->input('back_media_type');
		$model->back_media = $request->input('back_media');
		$model->back_content = $request->input('back_content');
		$model->back_content_more = $request->input('back_content_more');
		
        //saving the model to database
        $model->save();

		// Get the complete model back
		$model = $this->courseMaterialFlashCardServiceInterface->getFlashCardDetails($cardId);
		
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

		$cardId = $request->input('card_id');

		// find question model
		$model = $this->courseMaterialFlashCardServiceInterface->getFlashCardDetails($cardId);
		
		// modify values to the question model
		$model->front_media_type = $request->input('front_media_type');
		$model->front_media = $request->input('front_media');
		$model->front_content = $request->input('front_content');
		$model->back_media_type = $request->input('back_media_type');
		$model->back_media = $request->input('back_media');
		$model->back_content = $request->input('back_content');
		$model->back_content_more = $request->input('back_content_more');

		// save question model
		$model->save();

		// Get the complete model back
		$model = $this->courseMaterialFlashCardServiceInterface->getFlashCardDetails($cardId);

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
		$model = $this->courseMaterialFlashCardServiceInterface->deleteCard($request->input('card_id'));

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
