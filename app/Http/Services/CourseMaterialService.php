<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialServiceInterface;
use App\Models\CourseMaterialModel;
use App\Models\User;

class CourseMaterialService implements CourseMaterialServiceInterface
{    
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
}