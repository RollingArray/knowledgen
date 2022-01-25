<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\AvailabilityPlannerServiceInterface;
use App\Http\Interfaces\CourseMaterialServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use App\Models\CourseMaterialModel;
use App\Models\TeacherAvailabilityPlannerModel;

class TeacherAvailabilityPlannerController extends Controller
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

	protected $availabilityPlannerServiceInterface;

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
			'availability_context' => 'required',
			'online_meeting_url' => 'required',
			'online_meeting_type' => 'required|in:Zoom, Google Hangouts, Skype, Slack, Facebook Live, YouTube Live, MS Teams, Others',
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

		$data = $this->availabilityPlannerServiceInterface->getTeacherAvailabilityByDate($userId, $request->input('availability_date'));

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
        $model = new TeacherAvailabilityPlannerModel();

		//adding values to the model
		$model->planner_id = uniqid();
        $model->user_id = $userId;
        $model->availability_date = $request->input('availability_date');
        $model->availability_from = $request->input('availability_from');
        $model->availability_to = $request->input('availability_to');
        $model->availability_context = $request->input('availability_context');
        $model->online_meeting_url = $request->input('online_meeting_url');
        $model->online_meeting_type = $request->input('online_meeting_type');
        
        //saving the model to database
        $model->save();

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
