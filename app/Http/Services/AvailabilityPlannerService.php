<?php

namespace App\Http\Services;

use App\Http\Interfaces\AvailabilityPlannerServiceInterface;
use App\Models\User;

class AvailabilityPlannerService implements AvailabilityPlannerServiceInterface
{    
    public function matchSkillWithAvailability($availabilityContext, $availabilityDate)
    {
        return User::select(
			'tbl_users.user_id', 
			'tbl_users.user_first_name', 
			'tbl_users.user_last_name', 
			'tbl_users.user_email', 
			'tbl_users.user_skills',
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
			->whereRaw("MATCH(user_skills) AGAINST('$availabilityContext' IN BOOLEAN MODE)")
			->where('tbl_teacher_availability_planner.availability_date', '=', $availabilityDate)
			->get();
    }
}