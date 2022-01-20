<?php

namespace App\Http\Controllers;

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
	protected $courseMaterialArticleServiceInterface;

	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface
	) {
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
		$searchKey = $request->input('search_key');

		$data = User::where('user_type', 'TEACHER')
					->whereRaw("MATCH(user_skills) AGAINST('$searchKey' IN BOOLEAN MODE)")->get();
		
		//dd($data);

		// return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $data);
    }
}
