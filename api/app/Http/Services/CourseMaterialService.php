<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialServiceInterface;
use App\Http\Interfaces\LearningPathServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\CourseMaterialModel;
use App\Models\User;

class CourseMaterialService implements CourseMaterialServiceInterface
{        
    /**
     * returnDataStructureServiceInterface
     *
     * @var mixed
     */
    protected $returnDataStructureServiceInterface;
    
    /**
     * learningPathServiceInterface
     *
     * @var mixed
     */
    protected $learningPathServiceInterface;
    
    /**
     * __construct
     *
     * @return void
     */
    public function __construct(
		ReturnDataStructureServiceInterface $returnDataStructureServiceInterface,
        LearningPathServiceInterface $learningPathServiceInterface
	) {
		$this->returnDataStructureServiceInterface = $returnDataStructureServiceInterface;
        $this->learningPathServiceInterface = $learningPathServiceInterface;
	}
    
    /**
     * Get all user course materiels
     *
     * @param  mixed $userId
     * @return void
     */
    public function getAllUserCourseMateriels($userId)
    {
        return CourseMaterialModel::select(
            'tbl_course_material.course_material_id', 
            'tbl_course_material.user_id', 
            'tbl_course_material.course_material_name', 
            'tbl_course_material.course_material_description',
            'tbl_course_material.subject_area_id',
            'tbl_core_subject_area.subject_area_name',
            'tbl_course_material.created_at',
            'tbl_course_material.updated_at',
            'tbl_users.user_type',
            'tbl_users.user_first_name as author_first_name',
            'tbl_users.user_last_name as author_last_name'
            )
            ->join(
				'tbl_users',
				'tbl_course_material.user_id','=','tbl_users.user_id'
			)
            ->join(
				'tbl_core_subject_area',
				'tbl_course_material.subject_area_id','=','tbl_core_subject_area.subject_area_id'
			)
			->where('tbl_course_material.user_id', '=', $userId)
			->get();
    }

     /**
     * Get all user course materiels with learning path
     *
     * @param  mixed $userId
     * @return void
     */
    public function getAllUserCourseMaterielsWithLearningPath($userId)
    {
        $tempRows = array();

        $rows = $this->findRecommendedCourses($userId);
        
        foreach ($rows as $eachData) {
            $courseMaterialId = $eachData->course_material_id;
            $eachData['addedToLearningPath'] = $this->learningPathServiceInterface->checkIfCourseMaterialInLearningPath($userId, $courseMaterialId);
            $tempRows[] = $eachData;
        }

        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($tempRows);
    }

    public function getCourseMaterialById($courseMaterialId)
    {
        // return CourseMaterialModel::where('course_material_id', $courseMaterialId)
        //        ->first();
        return CourseMaterialModel::select(
            'tbl_course_material.course_material_id', 
            'tbl_course_material.user_id', 
            'tbl_course_material.course_material_name', 
            'tbl_course_material.course_material_description',
            'tbl_course_material.subject_area_id',
            'tbl_core_subject_area.subject_area_name',
            'tbl_course_material.created_at',
            'tbl_course_material.updated_at',
            'tbl_users.user_type',
            'tbl_users.user_first_name as author_first_name',
            'tbl_users.user_last_name as author_last_name'
            )
            ->join(
				'tbl_users',
				'tbl_course_material.user_id','=','tbl_users.user_id'
			)
            ->join(
				'tbl_core_subject_area',
				'tbl_course_material.subject_area_id','=','tbl_core_subject_area.subject_area_id'
			)
            ->where('tbl_course_material.course_material_id', '=', $courseMaterialId)
			//->distinct()
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

    /**
     * Find recommended courses with learning path
     *
     * @param  mixed $availabilityContext
     * @param  mixed $userId
     * @return mixed
     */
    public function findRecommendedCoursesWithLearningPath($availabilityContext, $userId)
    {
        $tempRows = array();

        $rows = $this->findRecommendedCourses($availabilityContext);
        
        foreach ($rows as $eachData) {
            $courseMaterialId = $eachData->course_material_id;
            $eachData['addedToLearningPath'] = $this->learningPathServiceInterface->checkIfCourseMaterialInLearningPath($userId , $courseMaterialId);
            $tempRows[] = $eachData;
        }

        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($tempRows);
    }
    
    public function findRecommendedCourses($availabilityContext)
    {
        return CourseMaterialModel::select(
            'tbl_course_material.course_material_id', 
            'tbl_course_material.user_id', 
            'tbl_course_material.course_material_name', 
            'tbl_course_material.course_material_description',
            'tbl_course_material.subject_area_id',
            'tbl_core_subject_area.subject_area_name',
            'tbl_course_material.created_at',
            'tbl_course_material.updated_at',
            'tbl_users.user_type',
            'tbl_users.user_first_name as author_first_name',
            'tbl_users.user_last_name as author_last_name'
            )
            ->join(
				'tbl_users',
				'tbl_course_material.user_id','=','tbl_users.user_id'
			)
            ->join(
				'tbl_core_subject_area',
				'tbl_course_material.subject_area_id','=','tbl_core_subject_area.subject_area_id'
			)
			->whereRaw("MATCH(tbl_course_material.course_material_name) AGAINST('$availabilityContext' IN BOOLEAN MODE)")
			->orWhereRaw("MATCH(tbl_course_material.course_material_description) AGAINST('$availabilityContext' IN BOOLEAN MODE)")
			->distinct()
			->get();
    }
}