<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\CourseMaterialServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use App\Models\CoreSubjectAreaModel;
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
			'operation_type' => 'required|in:CREATE,EDIT,DELETE',
            'course_material_id' => 'exclude_if:operation_type,CREATE|required|alpha_num',
            'course_material_name' => 'exclude_if:operation_type,DELETE|required|max:255',
			'course_material_description' => 'required|max:255',
			'subject_area_id' => 'sometimes|max:255',
			'subject_area_name' => 'required|max:255',
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

		// add subject area if now, else keep same id
		$subjectAreaId = uniqid();
		if($request->input('subject_area_id') === ''){
			//creating a new model
			$model = new CoreSubjectAreaModel();

			//adding values to the model
			$model->subject_area_id = $subjectAreaId;
			$model->subject_area_name = $request->input('subject_area_name');
			
			//saving the model to database
			$model->save();
		}
		else{
			$subjectAreaId =  $request->input('subject_area_id');
		}

        //creating a new user
        $model = new CourseMaterialModel();

		$courseMaterialId = uniqid();
		//adding values to the users
        $model->user_id = $userId;
        $model->course_material_id = $courseMaterialId;
        $model->course_material_name = $request->input('course_material_name');
        $model->course_material_description = $request->input('course_material_description');
		$model->subject_area_id = $subjectAreaId;
        
        //saving the user to database
        $model->save();

		// find model
		$model = $this->courseMaterialServiceInterface->getCourseMaterialById($courseMaterialId);


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

		// add subject area if now, else keep same id
		$subjectAreaId = uniqid();
		if($request->input('subject_area_id') === ''){
			//creating a new model
			$model = new CoreSubjectAreaModel();

			//adding values to the model
			$model->subject_area_id = $subjectAreaId;
			$model->subject_area_name = $request->input('subject_area_name');
			
			//saving the model to database
			$model->save();
		}
		else{
			$subjectAreaId =  $request->input('subject_area_id');
		}

        //find model
		$model = $this->courseMaterialServiceInterface->getCourseMaterialById($request->input('course_material_id'));
		
		//update values to the model
		$model->course_material_name = $request->input('course_material_name');
        $model->course_material_description = $request->input('course_material_description');
		$model->subject_area_id = $subjectAreaId;
        
        //saving the model to database
        $model->save();

		//find model
		$model = $this->courseMaterialServiceInterface->getCourseMaterialById($request->input('course_material_id'));
		
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

        //creating a new user
        
		$courseMaterialModel = $this->courseMaterialServiceInterface->deleteCourseMaterialById($request->input('course_material_id'));

		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $courseMaterialModel);
    }
}
