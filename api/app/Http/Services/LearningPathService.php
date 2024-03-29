<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialArticleServiceInterface;
use App\Http\Interfaces\CourseMaterialAssignmentResultServiceInterface;
use App\Http\Interfaces\CourseMaterialMenuServiceInterface;
use App\Http\Interfaces\CourseMaterialServiceInterface;
use App\Http\Interfaces\LearningPathServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Http\Interfaces\UsersServiceInterface;
use App\Models\LearningPathModel;

class LearningPathService implements LearningPathServiceInterface
{        
    /**
     * returnDataStructureServiceInterface
     *
     * @var mixed
     */
    protected $returnDataStructureServiceInterface;

    protected $courseMaterialArticleServiceInterface;

    protected $courseMaterialAssignmentResultServiceInterface;

    protected $usersServiceInterface;

    protected $courseMaterialMenuServiceInterface;
    
    public function __construct(
		ReturnDataStructureServiceInterface $returnDataStructureServiceInterface,
        CourseMaterialArticleServiceInterface $courseMaterialArticleServiceInterface,
        CourseMaterialAssignmentResultServiceInterface $courseMaterialAssignmentResultServiceInterface,
        UsersServiceInterface $usersServiceInterface,
        CourseMaterialMenuServiceInterface $courseMaterialMenuServiceInterface
	) {
		$this->returnDataStructureServiceInterface = $returnDataStructureServiceInterface;
        $this->courseMaterialArticleServiceInterface = $courseMaterialArticleServiceInterface;
        $this->courseMaterialAssignmentResultServiceInterface = $courseMaterialAssignmentResultServiceInterface;
        $this->usersServiceInterface = $usersServiceInterface;
        $this->courseMaterialMenuServiceInterface = $courseMaterialMenuServiceInterface;
	}

    /**
     * Check If course material in learning path
     *
     * @param  mixed $userId
     * @param  mixed $courseMaterialId
     * @return mixed
     */
    public function checkIfCourseMaterialInLearningPath($userId, $courseMaterialId)
    {
        return LearningPathModel::where('user_id', '=', $userId)
                ->where('course_material_id', '=', $courseMaterialId)
                ->exists();
    }

        
    /**
     * Delete learning path
     *
     * @param  mixed $userId
     * @param  mixed $courseMaterialId
     * @return void
     */
    public function deleteLearningPath($userId, $courseMaterialId)
    {
        return LearningPathModel::where('user_id', '=', $userId)
                ->where('course_material_id', '=', $courseMaterialId)
                ->delete();
    }

       
    /**
     * Get learning path
     *
     * @param  mixed $userId
     * @param  mixed $courseMaterialId
     * @return void
     */
    public function getLearningPath($userId)
    {
        $tempRows = array();

        $rows = $this->getLearningPathCourses($userId);
        //dd($rows);
        foreach ($rows as $eachData) {
            $courseMaterialId = $eachData->course_material_id;
            $eachData['firstParentArticleId'] = $this->courseMaterialMenuServiceInterface->getFirstPatentMenuForCourseMaterial($courseMaterialId);
            $courseMaterialProgress = $this->getLearningPathWithProgress($userId, $courseMaterialId);
            $eachData['course_material_progress'] = $courseMaterialProgress;
            $materialAuthor = $this->usersServiceInterface->getUserById($eachData->author_id);
            $eachData['author_first_name'] = $materialAuthor->user_first_name;
            $eachData['author_last_name'] = $materialAuthor->user_last_name;
            $tempRows[] = $eachData;
        }

        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($tempRows);
    }

    /**
     * Get learning path details by material
     *
     * @param  mixed $userId
     * @param  mixed $courseMaterialId
     * @return mixed
     */
    public function getLearningPathDetailsByMaterial($userId, $courseMaterialId)
    {
        $row = $this->getLearningPathCoursesForUserMaterial($userId, $courseMaterialId);
        $row['firstParentArticleId'] = $this->courseMaterialMenuServiceInterface->getFirstPatentMenuForCourseMaterial($courseMaterialId);
        $courseMaterialProgress = $this->getLearningPathWithProgress($userId, $courseMaterialId);
        $row['course_material_progress'] = $courseMaterialProgress;
        $materialAuthor = $this->usersServiceInterface->getUserById($row->author_id);
        $row['author_first_name'] = $materialAuthor->user_first_name;
        $row['author_last_name'] = $materialAuthor->user_last_name;

        return $row;
    }

    

    /**
     * Get learning path with progress
     *
     * @param  mixed $userId
     * @param  mixed $courseMaterialId
     * @return mixed
     */
    private function getLearningPathWithProgress($userId, $courseMaterialId)
    {
        $tempRows = array();

        $rows = $this->courseMaterialArticleServiceInterface->getAllCourseMaterielArticles($courseMaterialId);
        //dd($rows);
        $totalContents = 0;
        $totalContentsCompleted = 0;

        foreach ($rows as $eachData) {
            $totalContents++;
            $articleId = $eachData->article_id;
            $contentCompleted = $this->courseMaterialAssignmentResultServiceInterface->checkIfResultExist($userId, $articleId);
            $eachData['content_completed'] = $contentCompleted;
            if($contentCompleted){
                $totalContentsCompleted++;
            }
            $tempRows[] = $eachData;
        }

        $progress = round(($totalContentsCompleted / $totalContents ) * 100, 2);
        return $progress;
    }
    
    /**
     * Get learning path courses
     *
     * @param  mixed $userId
     * @param  mixed $courseMaterialId
     * @return mixed
     */
    public function getLearningPathCourses($userId)
    {
        return LearningPathModel::select(
            'tbl_learning_path.course_material_id', 
            'tbl_learning_path.user_id', 
            'tbl_course_material.course_material_name', 
            'tbl_course_material.course_material_description',
            'tbl_course_material.user_id as author_id',
            'tbl_course_material.subject_area_id',
            'tbl_core_subject_area.subject_area_name',
            'tbl_learning_path.created_at',
            'tbl_learning_path.updated_at',
            'tbl_users.user_type'
            )
            ->join(
				'tbl_users',
				'tbl_learning_path.user_id','=','tbl_users.user_id'
			)
            ->join(
				'tbl_course_material',
				'tbl_learning_path.course_material_id','=','tbl_course_material.course_material_id'
			)
            ->join(
				'tbl_core_subject_area',
				'tbl_course_material.subject_area_id','=','tbl_core_subject_area.subject_area_id'
			)
            ->where('tbl_learning_path.user_id', '=', $userId)
			->get();
    }

    /**
     * Get learning path courses for user material
     *
     * @param  mixed $userId
     * @param  mixed $courseMaterialId
     * @return mixed
     */
    public function getLearningPathCoursesForUserMaterial($userId, $courseMaterialId)
    {
        return LearningPathModel::select(
            'tbl_learning_path.course_material_id', 
            'tbl_learning_path.user_id', 
            'tbl_course_material.course_material_name', 
            'tbl_course_material.course_material_description',
            'tbl_course_material.user_id as author_id',
            'tbl_course_material.subject_area_id',
            'tbl_core_subject_area.subject_area_name',
            'tbl_learning_path.created_at',
            'tbl_learning_path.updated_at',
            'tbl_users.user_type'
            )
            ->join(
				'tbl_users',
				'tbl_learning_path.user_id','=','tbl_users.user_id'
			)
            ->join(
				'tbl_course_material',
				'tbl_learning_path.course_material_id','=','tbl_course_material.course_material_id'
			)
            ->join(
				'tbl_core_subject_area',
				'tbl_course_material.subject_area_id','=','tbl_core_subject_area.subject_area_id'
			)
            ->where('tbl_learning_path.user_id', '=', $userId)
            ->where('tbl_learning_path.course_material_id', '=', $courseMaterialId)
			->first();
    }
}