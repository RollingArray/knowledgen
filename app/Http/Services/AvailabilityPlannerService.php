<?php

namespace App\Http\Services;

use App\Http\Interfaces\AvailabilityPlannerServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\StudentAvailabilityPlannerModel;
use App\Models\TeacherAvailabilityPlannerModel;
use App\Models\User;

class AvailabilityPlannerService implements AvailabilityPlannerServiceInterface
{    
	protected $returnDataStructureServiceInterface;

    public function __construct(
		ReturnDataStructureServiceInterface $returnDataStructureServiceInterface
	) {
		$this->returnDataStructureServiceInterface = $returnDataStructureServiceInterface;
	}

	private function findUsersMatchingSkillWithAvailabilityContext($availabilityContext)
    {
        return User::select(
			'tbl_users.user_id', 
			'tbl_users.user_first_name', 
			'tbl_users.user_last_name', 
			'tbl_users.user_email', 
			'tbl_users.user_type', 
			'tbl_users.user_skills',
			)
			->join(
				'tbl_teacher_availability_planner',
				'tbl_teacher_availability_planner.user_id','=','tbl_users.user_id'
			)
			->whereRaw("MATCH(tbl_users.user_skills) AGAINST('$availabilityContext' IN BOOLEAN MODE)")
			->orWhereRaw("MATCH(tbl_teacher_availability_planner.availability_context) AGAINST('$availabilityContext' IN BOOLEAN MODE)")
			->distinct()
			->get();
    }

    public function matchSkillWithAvailability($userId, $availabilityContext, $availabilityDate)
    {
		//$users = $this->findUsersMatchingSkillWithAvailabilityContext($availabilityContext);

        return User::select(
			'tbl_users.user_id', 
			// 'tbl_users.user_first_name', 
			// 'tbl_users.user_last_name', 
			// 'tbl_users.user_email', 
			'tbl_users.user_type', 
			// 'tbl_users.user_skills',
			'tbl_teacher_availability_planner.planner_id',
			'tbl_teacher_availability_planner.availability_context',
			'tbl_teacher_availability_planner.availability_date',
			'tbl_teacher_availability_planner.availability_from',
			'tbl_teacher_availability_planner.availability_to',
			'tbl_teacher_availability_planner.online_meeting_url',
			'tbl_teacher_availability_planner.online_meeting_type'
			)
			->join(
				'tbl_teacher_availability_planner',
				'tbl_teacher_availability_planner.user_id','=','tbl_users.user_id'
			)
			->where('tbl_users.user_id', '=', $userId)
			->where('tbl_teacher_availability_planner.availability_date', '=', $availabilityDate)
			->distinct()
			->get();
    }

	public function getTeacherAvailabilityByDate($userId, $availabilityDate)
    {
		$rows =  TeacherAvailabilityPlannerModel::select(
			'tbl_users.user_id', 
			'tbl_users.user_type', 
			'tbl_teacher_availability_planner.planner_id',
			'tbl_teacher_availability_planner.availability_context',
			'tbl_teacher_availability_planner.availability_date',
			'tbl_teacher_availability_planner.availability_from',
			'tbl_teacher_availability_planner.availability_to',
			'tbl_teacher_availability_planner.online_meeting_url',
			'tbl_teacher_availability_planner.online_meeting_type'
			)
			->join(
				'tbl_users',
				'tbl_users.user_id','=','tbl_teacher_availability_planner.user_id'
			)
			->where('tbl_users.user_id', '=', $userId)
            ->where('availability_date', '=', $availabilityDate)
			->get();

			return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($rows);

        // return TeacherAvailabilityPlannerModel::where('user_id', '=', $userId)
        //         ->where('availability_date', '=', $availabilityDate)
        //         ->get();
    }

	public function getStudentAvailabilityByDate($userId, $availabilityDate)
    {
		return StudentAvailabilityPlannerModel::select(
			'tbl_users.user_id', 
			'tbl_users.user_type',
			'tbl_student_availability_planner.planner_id', 
			'tbl_student_availability_planner.availability_context',
			'tbl_student_availability_planner.availability_date',
			'tbl_student_availability_planner.availability_from',
			'tbl_student_availability_planner.availability_to',
			//'tbl_student_availability_planner.online_meeting_url',
			//'tbl_student_availability_planner.online_meeting_type'
			)
			->join(
				'tbl_users',
				'tbl_users.user_id','=','tbl_student_availability_planner.user_id'
			)
			->where('tbl_users.user_id', '=', $userId)
            ->where('availability_date', '=', $availabilityDate)
			->get();


        // return StudentAvailabilityPlannerModel::where('user_id', '=', $userId)
        //         ->where('availability_date', '=', $availabilityDate)
        //         ->get();
    }

	public function getStudentAvailabilityPlanned($userId, $plannerId)
    {
		return StudentAvailabilityPlannerModel::select(
			'tbl_users.user_id', 
			'tbl_users.user_type',
			'tbl_student_availability_planner.planner_id', 
			'tbl_student_availability_planner.availability_context',
			'tbl_student_availability_planner.availability_date',
			'tbl_student_availability_planner.availability_from',
			'tbl_student_availability_planner.availability_to',
			)
			->join(
				'tbl_users',
				'tbl_users.user_id','=','tbl_student_availability_planner.user_id'
			)
			->where('tbl_users.user_id', '=', $userId)
            ->where('tbl_student_availability_planner.planner_id', '=', $plannerId)
			->first();
    }

	public function getAllStudentAvailabilityByDate($userId, $availabilityDate)
    {
        $tempRows = array();

        $rows = $this->getStudentAvailabilityByDate($userId, $availabilityDate);
		foreach ($rows as $eachData) {
            $availabilityContext = $eachData->availability_context;
			$mentorMatch = $this->getMatchedTeachers($availabilityContext, $availabilityDate);
			$eachData['mentorMatch'] = $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($mentorMatch);
            $tempRows[] = $eachData;
        }

        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($tempRows);
    }

	public function getStudentPlannerDetails($userId, $plannerId)
    {
        $rows = $this->getStudentAvailabilityPlanned($userId, $plannerId);
		$mentorMatch = $this->getMatchedTeachers($rows->availability_context, $rows->availability_date);
		$rows['mentorMatch'] = $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($mentorMatch);    
		return $rows;
    }

	public function getMatchedTeachers($availabilityContext, $availabilityDate)
    {
        $tempRows = array();

        $rows = $this->findUsersMatchingSkillWithAvailabilityContext($availabilityContext, $availabilityDate);
		foreach ($rows as $eachData) {
            $availabilityContext = $eachData->availability_context;
			$userId = $eachData->user_id;
			$mentorMatch = $this->matchSkillWithAvailability($userId, $availabilityContext, $availabilityDate);
			$eachData['matchedSessions'] = $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($mentorMatch);
            $tempRows[] = $eachData;
        }

        return $tempRows;
    }


}