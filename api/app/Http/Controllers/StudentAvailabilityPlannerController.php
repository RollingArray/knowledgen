<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\AvailabilityPlannerServiceInterface;
use App\Http\Interfaces\CourseMaterialServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use App\Models\CourseMaterialModel;
use App\Models\StudentAvailabilityPlannerModel;
use App\Models\TeacherAvailabilityPlannerModel;

class StudentAvailabilityPlannerController extends Controller
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
		CourseMaterialServiceInterface $courseMaterialServiceInterface,
		AvailabilityPlannerServiceInterface $availabilityPlannerServiceInterface
	) {
		$this->usersServiceInterface = $usersServiceInterface;
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->courseMaterialServiceInterface = $courseMaterialServiceInterface;
		$this->availabilityPlannerServiceInterface = $availabilityPlannerServiceInterface;
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
            'planner_id' => 'exclude_if:operation_type,CREATE|required|alpha_num',
            'availability_date' => 'required|date',
            'availability_from' => 'required|date_format:H:i:s',
			'availability_to' => 'required|date_format:H:i:s',
			'availability_context' => 'required'
		];
	}

	/**
	 * rules
	 *
	 * @return void
	 */
	public function getRules()
	{
		return [
			'availability_date' => 'required|date'
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
		$token = $request->header('Auth');
        $userId = $request->header('UserId');

        //creating a validator
        $validator = Validator::make($request->all(), $this->getRules(), $this->customMessages());

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

		$data = $this->availabilityPlannerServiceInterface->getAllStudentAvailabilityByDate($userId, $request->input('availability_date'));

		return $this->jwtAuthServiceInterface->sendBackToClient(
			$token, 
			$userId, 
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

        //creating a new model
        $model = new StudentAvailabilityPlannerModel();

		//adding values to the model
		$model->planner_id = uniqid();
        $model->user_id = $userId;
        $model->availability_date = $request->input('availability_date');
        $model->availability_from = $request->input('availability_from');
        $model->availability_to = $request->input('availability_to');
        $model->availability_context = $request->input('availability_context');
        
        //saving the model to database
        $model->save();

		$studentPlanner = $this->availabilityPlannerServiceInterface->getStudentPlannerDetails($userId, $model->planner_id);

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $studentPlanner);
    }
}
