<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\AvailabilityPlannerServiceInterface;
use App\Http\Interfaces\CourseMaterialArticleServiceInterface;
use App\Http\Interfaces\CourseMaterialServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use App\Models\CourseMaterialArticleModel;
use App\Models\User;

class MatchSkillController extends Controller
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
	protected $availabilityPlannerServiceInterface;

	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		AvailabilityPlannerServiceInterface $availabilityPlannerServiceInterface
	) {
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
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
			'planner_id' => 'required|alpha_num',
            'availability_date' => 'required|date',
            'availability_from' => 'required|date_format:H:i:s',
			'availability_to' => 'required|date_format:H:i:s',
			'availability_context' => 'required'
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

		//$model = new CourseMaterialArticleModel();
		$availabilityContext = $request->input('availability_context');
		$availabilityDate = $request->input('availability_date');

		$data =  $this->availabilityPlannerServiceInterface->matchSkillWithAvailability($availabilityContext, $availabilityDate);
		
		// return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $data);
    }
}
