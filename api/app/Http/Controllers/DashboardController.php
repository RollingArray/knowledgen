<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\CourseMaterialServiceInterface;
use App\Http\Interfaces\DashboardServiceInterface;
use Illuminate\Http\Request;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;

class DashboardController extends Controller
{

	/**
	 * jwtAuthServiceInterface
	 *
	 * @var mixed
	 */
	protected $jwtAuthServiceInterface;

	protected $dashboardServiceInterface;

	/**
	 * __construct
	 *
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		DashboardServiceInterface $dashboardServiceInterface
	) {
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->dashboardServiceInterface = $dashboardServiceInterface;
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
    public function rule()
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
	 * student all
	 *
	 * @param  mixed $request
	 * @return void
	 */
	public function studentAll(Request $request)
	{
		$data = $this->dashboardServiceInterface->getStudentDashboard(
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
	 * teacher all
	 *
	 * @param  mixed $request
	 * @return void
	 */
	public function teacherAll(Request $request)
	{
		$data = $this->dashboardServiceInterface->getTeacherDashboard(
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
}
