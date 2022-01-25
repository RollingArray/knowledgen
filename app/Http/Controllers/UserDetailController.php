<?php

namespace App\Http\Controllers;

use App\Jobs\SendEmailJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;

class UserDetailController extends Controller
{

	/**
	 * jwtAuthServiceInterface
	 *
	 * @var mixed
	 */
	protected $jwtAuthServiceInterface;

	/**
	 * usersServiceInterface
	 *
	 * @var mixed
	 */
	protected $usersServiceInterface;

	/**
	 * __construct
	 *
	 */
	public function __construct(
		UsersServiceInterface $usersServiceInterface,
		JWTAuthServiceInterface $jwtAuthServiceInterface
	) {
		$this->usersServiceInterface = $usersServiceInterface;
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
			'user_id' => 'required',
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
	 * boot
	 *
	 * @param  mixed $request
	 * @return void
	 */
	public function boot(Request $request)
	{
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

		// get the user
		$user = $this->usersServiceInterface->getUserById(
			$request->input('user_id')
		);

		if ($user) {
			return $this->jwtAuthServiceInterface->sendBackToClient(
				$request->header('Auth'), 
				$user->user_id, 
				'data', 
				$user
			);
			
		} else {
			return response(
				array(
					'error' => true,
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
	public function edit(Request $request)
    {
		$token = $request->header('Auth');
        $userId = $request->header('UserId');

		//creating a new model
        $model = $this->usersServiceInterface->getUser($userId);

		//dd($model);
		//adding values to the model
        $model->user_first_name = $request->input('user_first_name');
        $model->user_last_name = $request->input('user_last_name');
        $model->user_email = $request->input('user_email');
        $model->user_skills = $request->input('user_skills');
        
        //saving the model to database
        $model->save();

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
