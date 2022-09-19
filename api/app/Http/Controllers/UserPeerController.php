<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Interfaces\JWTAuthServiceInterface;
use App\Http\Interfaces\UserPeerServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use App\Models\UserPeerModel;

class UserPeerController extends Controller
{
    /**
	 * jwtAuthServiceInterface
	 *
	 * @var mixed
	 */
	protected $jwtAuthServiceInterface;

	/**
	 * userPeerServiceInterface
	 *
	 * @var mixed
	 */
	protected $userPeerServiceInterface;
	
	/**
	 * usersServiceInterface
	 *
	 * @var mixed
	 */
	protected $usersServiceInterface;

	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct(
		JWTAuthServiceInterface $jwtAuthServiceInterface,
		UserPeerServiceInterface $userPeerServiceInterface,
		UsersServiceInterface $usersServiceInterface
	) {
		$this->jwtAuthServiceInterface = $jwtAuthServiceInterface;
		$this->userPeerServiceInterface = $userPeerServiceInterface;
		$this->usersServiceInterface = $usersServiceInterface;
	}

	/**
	 * rules
	 *
	 * @return void
	 */
	public function allRules()
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
	public function addRules()
	{
		return [
			'operation_type' => 'required|in:CREATE',
			'user_email' => 'required'
		];
	}

	/**
	 * rules
	 *
	 * @return void
	 */
	public function deleteRules()
	{
		return [
			'operation_type' => 'required|in:DELETE',
			'peer_id' => 'required'
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
        $validator = Validator::make($request->all(), $this->allRules(), $this->customMessages());

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
		
		$data = $this->userPeerServiceInterface->getUserPeerPoints($userId);

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
        $validator = Validator::make($request->all(), $this->addRules(), $this->customMessages());

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
		
		// get the user
		$user = $this->usersServiceInterface->getUserByEmail(
			$request->input('user_email')
		);

		if ($user) {

			$peerId = $user->user_id;
			// check if peer exist for user
			$ifDataExist = $this->userPeerServiceInterface->checkIfPeerExistForUser(
				$userId,
				$peerId
			);

			if($ifDataExist){
				return response(
					array(
						'error' => true,
						"message" => array(
							config('messages.apiValidation.peerExist')
						)
					),
					400
				);
			}
			else{
				// generate id
				$userPeerId = uniqid();

				//creating a new model
				$model = new UserPeerModel();

				//adding values to the model
				$model->user_peer_id = $userPeerId;
				$model->user_id = $userId;
				$model->peer_id = $peerId;
				
				//saving the model to database
				$model->save();

				// return to client
				return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
			}
			
		} else {
			return response(
				array(
					'error' => true,
					"message" => array(
						config('messages.apiValidation.noUserMissing')
					)
				),
				400
			);
		}
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
        $validator = Validator::make($request->all(), $this->deleteRules(), $this->customMessages());

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

        // delete relative article 
		$model = $this->userPeerServiceInterface->deletePeer(
			$userId,
			$request->input('peer_id')
		);

        // return to client
		return $this->jwtAuthServiceInterface->sendBackToClient($token, $userId, 'resource', $model);
    }
}
