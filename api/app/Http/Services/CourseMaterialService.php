<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\CourseMaterialModel;
use App\Models\User;

class CourseMaterialService implements CourseMaterialServiceInterface
{    
    protected $returnDataStructureServiceInterface;

    public function __construct(
		ReturnDataStructureServiceInterface $returnDataStructureServiceInterface
	) {
		$this->returnDataStructureServiceInterface = $returnDataStructureServiceInterface;
	}

    public function getAllUserCourseMateriels($userId)
    {
        return CourseMaterialModel::with('user')->where('user_id', '=', $userId)->get();
    }

    public function getCourseMaterialById($courseMaterialId)
    {
        return CourseMaterialModel::where('course_material_id', $courseMaterialId)
               ->first();
    }

    public function deleteCourseMaterialById($courseMaterialId)
    {
        return CourseMaterialModel::where('course_material_id', '=', $courseMaterialId)->delete();
    }

    public function checkIfUserIsCourseOwner($userId, $courseMaterialId)
    {
        return CourseMaterialModel::where('user_id', '=', $userId)
                ->where('course_material_id', '=', $courseMaterialId)
                ->exists();
    }

    public function findRecommendedCourses($availabilityContext)
    {
        $rows = CourseMaterialModel::select(
            'tbl_course_material.course_material_id', 
            'tbl_course_material.user_id', 
            'tbl_course_material.course_material_name', 
            'tbl_course_material.course_material_description',
            'tbl_course_material.created_at',
            'tbl_course_material.updated_at',
            'tbl_users.user_type'
            )
            ->join(
				'tbl_users',
				'tbl_course_material.user_id','=','tbl_users.user_id'
			)
			->whereRaw("MATCH(tbl_course_material.course_material_name) AGAINST('$availabilityContext' IN BOOLEAN MODE)")
			->orWhereRaw("MATCH(tbl_course_material.course_material_description) AGAINST('$availabilityContext' IN BOOLEAN MODE)")
			->distinct()
			->get();

        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($rows);
    }
}