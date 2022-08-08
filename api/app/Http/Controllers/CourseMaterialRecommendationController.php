<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\CourseMaterialServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use App\Models\CourseMaterialModel;

class CourseMaterialRecommendationController extends Controller
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
	public function all(Request $request)
	{
		$userId = $request->header('UserId');

		$user = $this->usersServiceInterface->getUserById(
			$request->header('UserId')
		);

		$data = $this->courseMaterialServiceInterface->findRecommendedCoursesWithLearningPath($user->user_skills, $userId);

		return $this->jwtAuthServiceInterface->sendBackToClient(
			$request->header('Auth'), 
			$request->header('UserId'), 
			'data', 
			$data
		);
	}
}
