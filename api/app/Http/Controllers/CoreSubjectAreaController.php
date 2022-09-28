<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\CoreSubjectAreaServiceInterface;
use Illuminate\Http\Request;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use App\Models\CoreSubjectAreaModel;
use Illuminate\Support\Facades\Validator;

class CoreSubjectAreaController extends Controller
{
	   
	/**
	 * jwtAuthServiceInterface
	 *
	 * @var mixed
	 */
	protected $jwtAuthServiceInterface;
	
	/**
	 * coreSubjectAreaServiceInterface
	 *
	 * @var mixed
	 */
	protected $coreSubjectAreaServiceInterface;

	/**
	 * __construct
	 *
	 */
	public function __construct(
		UsersServiceInterface $usersServiceInterface,
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		CoreSubjectAreaServiceInterface $coreSubjectAreaServiceInterface
	) {
		$this->usersServiceInterface = $usersServiceInterface;
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->coreSubjectAreaServiceInterface = $coreSubjectAreaServiceInterface;
	}

	/**
	 * rules
	 *
	 * @return void
	 */
	public function rules()
	{
		return [
			'operation_type' => 'required|in:CREATE',
			'subject_area_id' => 'exclude_if:operation_type,CREATE|required|alpha_num',
			'subject_area_name' => 'required|string',
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
		
		$data = $this->coreSubjectAreaServiceInterface->getAllSubjectArea();

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
        $model = new CoreSubjectAreaModel();

		//adding values to the model
        $model->subject_area_id = uniqid();
        $model->subject_area_name = $request->input('subject_area_name');
        
        //saving the model to database
        $model->save();

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
