<?php

namespace App\Http\Controllers;

use App\Jobs\SendEmailJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;

class SignInController extends Controller
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
			'user_email' => 'required|email',
			'user_verification_code' => 'required'
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
		$user = $this->usersServiceInterface->getUserByEmailAndCode(
			$request->input('user_email'),
			$request->input('user_verification_code')
		);

		if ($user) {
			$tokenId = $this->jwtAuthServiceInterface->createNewToken($user->user_id);
			$user->user_id = $user->user_id;
			$user->user_verification_code = 'VERIFIED';
			//saving the user to database
			$user->save();
			return $this->jwtAuthServiceInterface->sendBackToClient($tokenId, $user->user_id, 'data', $user);
			//returning the registered user 
			// return array(
			// 	'error' => false,
			// 	'data' => array(
			// 		'user' => $user,
			// 		'token' => 
			// 	)
			// );
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
}
