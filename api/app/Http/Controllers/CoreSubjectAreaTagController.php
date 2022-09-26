<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\CoreSubjectAreaTagServiceInterface;
use Illuminate\Http\Request;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use App\Models\CoreSubjectAreaTagModel;
use Illuminate\Support\Facades\Validator;

class CoreSubjectAreaTagController extends Controller
{

	/**
	 * jwtAuthServiceInterface
	 *
	 * @var mixed
	 */
	protected $jwtAuthServiceInterface;
	
	/**
	 * coreSubjectAreaTagServiceInterface
	 *
	 * @var mixed
	 */
	protected $coreSubjectAreaTagServiceInterface;

	/**
	 * __construct
	 *
	 */
	public function __construct(
		UsersServiceInterface $usersServiceInterface,
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		CoreSubjectAreaTagServiceInterface $coreSubjectAreaTagServiceInterface
	) {
		$this->usersServiceInterface = $usersServiceInterface;
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->coreSubjectAreaTagServiceInterface = $coreSubjectAreaTagServiceInterface;
	}

	/**
	 * rules
	 *
	 * @return void
	 */
	public function rules()
	{
		return [
			//
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
	public function all(Request $request)
	{
		
		$data = $this->coreSubjectAreaTagServiceInterface->getAllSubjectAreaTag();

		if ($data && $request->header('UserId')) {
			return $this->jwtAuthServiceInterface->sendBackToClient(
				$request->header('Auth'), 
				$request->header('UserId'), 
				'data', 
				$data
			);
			
		} else {
			return response(
				array(
					'error' => true,
					'success' => true,
					"message" => array(
						config('messages.apiValidation.verificationCoreWrong')
					)
				),
				400
			);
		}
	}
}
