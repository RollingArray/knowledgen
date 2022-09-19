<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialAssignmentResultServiceInterface;
use App\Http\Interfaces\UserPeerServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\UserPeerModel;

class UserPeerService implements UserPeerServiceInterface
{    	
	/**
	 * Return Data Structure Service Interface
	 *
	 * @var mixed
	 */
	protected $returnDataStructureServiceInterface;

	protected $courseMaterialAssignmentResultServiceInterface;
    
    /**
     * __construct
     *
     * @return void
     */
    public function __construct(
		ReturnDataStructureServiceInterface $returnDataStructureServiceInterface,
		CourseMaterialAssignmentResultServiceInterface $courseMaterialAssignmentResultServiceInterface
	) {
		$this->returnDataStructureServiceInterface = $returnDataStructureServiceInterface;
		$this->courseMaterialAssignmentResultServiceInterface = $courseMaterialAssignmentResultServiceInterface;
	}
	
	/**
     * Get user peer
     *
     * @param  mixed $userId
     * @return mixed
     */
	public function getUserPeers($userId){
		return UserPeerModel::select(
			'tbl_user_peer.user_peer_id',
			'tbl_user_peer.user_id',
			'tbl_user_peer.peer_id', 
			'tbl_users.user_first_name', 
			'tbl_users.user_last_name', 
			'tbl_users.user_email', 
			)
			->join(
				'tbl_users',
				'tbl_users.user_id','=','tbl_user_peer.peer_id'
			)
			->where('tbl_user_peer.user_id', '=', $userId)
			->get();
	}

	/**
     * Get user peer points
     *
     * @param  mixed $userId
     * @return void
     */
    public function getUserPeerPoints($userId)
    {
        $tempRows = array();

        $rows = $this->getUserPeers($userId);
        //dd($rows);
        foreach ($rows as $eachData) {
            $totalStudyPoints = $this->courseMaterialAssignmentResultServiceInterface->getTotalStudyPoints($eachData->peer_id);
            $eachData['total_study_points'] = $totalStudyPoints;
            $tempRows[] = $eachData;
        }

        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($tempRows);
    }

	    
    /**
     * Delete Peer
     *
     * @param  mixed $userId
     * @param  mixed $peerId
     * @return void
     */
    public function deletePeer($userId, $peerId)
    {
        return UserPeerModel::where('user_id', '=', $userId)
                ->where('peer_id', '=', $peerId)
                ->delete();
    }

	 /**
     * Check if peer exist for user
     *
     * @param  mixed $userId
     * @param  mixed $peerId
     * @return void
     */
    public function checkIfPeerExistForUser($userId, $peerId)
    {
        return UserPeerModel::where('user_id', '=', $userId)
                ->where('peer_id', '=', $peerId)
                ->exists();
    }
}