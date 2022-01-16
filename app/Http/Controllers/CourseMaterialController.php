<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\CourseMaterialServiceInterface;
use App\Jobs\SendEmailJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use App\Models\CourseMaterialModel;

class CourseMaterialController extends Controller
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

	protected $courseMaterialServiceInterface;

	/**
	 * __construct
	 *
	 */
	public function __construct(
		UsersServiceInterface $usersServiceInterface,
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		CourseMaterialServiceInterface $courseMaterialServiceInterface
	) {
		$this->usersServiceInterface = $usersServiceInterface;
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->courseMaterialServiceInterface = $courseMaterialServiceInterface;
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
     * rules
     *
     * @return void
     */
    public function addNewCourseMaterialRule()
    {
        return [
            'course_material_name' => 'required|max:255',
            'course_material_description' => 'required|max:255'
        ];
    }

	/**
     * rules
     *
     * @return void
     */
    public function editCourseMaterialRule()
    {
        return [
			'course_material_id' => 'required',
            'course_material_name' => 'required|max:255',
            'course_material_description' => 'required|max:255'
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
	public function getAllCourseMaterials(Request $request)
	{
		
		$data = $this->courseMaterialServiceInterface->getAllUserCourseMateriels(
			$request->header('UserId')
		);

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

	public function addNewCourseMaterials(Request $request)
    {
		$token = $request->header('Auth');
        $userId = $request->header('UserId');

        //creating a validator
        $validator = Validator::make($request->all(), $this->addNewCourseMaterialRule(), $this->customMessages());

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

        //creating a new user
        $courseMaterialModel = new CourseMaterialModel();

		//adding values to the users
        $courseMaterialModel->user_id = $userId;
        $courseMaterialModel->course_material_id = uniqid();
        $courseMaterialModel->course_material_name = $request->input('course_material_name');
        $courseMaterialModel->course_material_description = $request->input('course_material_description');
        
        //saving the user to database
        $courseMaterialModel->save();

		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $courseMaterialModel);
    }

	public function editCourseMaterials(Request $request)
    {
		$token = $request->header('Auth');
        $userId = $request->header('UserId');

        //creating a validator
        $validator = Validator::make($request->all(), $this->editCourseMaterialRule(), $this->customMessages());

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

        //creating a new user
        
		$courseMaterialModel = $this->courseMaterialServiceInterface->getCourseMaterialById($request->input('course_material_id'));

		//dd($courseMaterialModel);
		//adding values to the users
		$courseMaterialModel->course_material_name = $request->input('course_material_name');
        $courseMaterialModel->course_material_description = $request->input('course_material_description');
        
        //saving the user to database
        $courseMaterialModel->save();

		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $courseMaterialModel);
    }

	public function deleteCourseMaterials(Request $request)
    {
		$token = $request->header('Auth');
        $userId = $request->header('UserId');

        //creating a validator
        $validator = Validator::make($request->all(), $this->editCourseMaterialRule(), $this->customMessages());

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

        //creating a new user
        
		$courseMaterialModel = $this->courseMaterialServiceInterface->deleteCourseMaterialById($request->input('course_material_id'));

		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $courseMaterialModel);
    }
}
