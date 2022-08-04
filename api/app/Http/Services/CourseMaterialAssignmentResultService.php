<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialAssignmentResultServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\CourseMaterialArticleAssignmentResultModel;

class CourseMaterialAssignmentResultService implements CourseMaterialAssignmentResultServiceInterface
{  
        
    /**
     * Return data structure service interface
     *
     * @var mixed
     */
    protected $returnDataStructureServiceInterface;
    
    /**
     * __construct
     *
     * @return void
     */
    public function __construct(
		ReturnDataStructureServiceInterface $returnDataStructureServiceInterface
	) {
		$this->returnDataStructureServiceInterface = $returnDataStructureServiceInterface;
	}
  
    /**
     * Get assignment leader board
     *
     * @param  mixed $articleId
     * @return mixed
     */
    public function getAssignmentLeaderBoard($articleId){
        $tempRows = array();

        $rows = $this->getDistinctUsersPerformingAssignment($articleId);
        foreach ($rows as $eachData) {
            $userId = $eachData->userId;
            $maxRewardForAssignmentUser = $this->getMaxRewardForUserPerformingAssignment($articleId, $userId);
            $eachData['article_assignment_completion_time'] = $maxRewardForAssignmentUser->article_assignment_completion_time;
            $eachData['article_assignment_completion_reward'] = $maxRewardForAssignmentUser->article_assignment_completion_reward;
            $eachData['article_assignment_total_no_of_questions'] = $maxRewardForAssignmentUser->article_assignment_total_no_of_questions;
            $eachData['article_assignment_total_no_of_correct_answers'] = $maxRewardForAssignmentUser->article_assignment_total_no_of_correct_answers;
            $tempRows[] = $eachData;
        }

        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($tempRows);
    }

    /**
     * Get all session time
     *
     * @param  mixed $articleId
     * @return mixed
     */
    public function getAllSessionTime($articleId, $userId){
        $tempRows = array();
        $articleSessions = array();
        $articleSessionsCreatedOn = array();
        $rows = $this->getAllStudyAssignmentSessionTime($articleId, $userId);
        foreach ($rows as $eachData) {
            $splitTime = $eachData->article_assignment_completion_time;
            $timeArray = preg_split ("/\:/", $splitTime); 
            
            $minute = $timeArray[0];
            $second = $timeArray[1];
            $millisecond = $timeArray[2];
            
            $secondToMinute = $second / 60;
            $millisecondToMinute = ($millisecond / 100) / 60;
            $totalTime = $minute + $secondToMinute + $millisecondToMinute;

            $articleSessions[] = round($totalTime, 2);
            $articleSessionsCreatedOn[] = $eachData->created_at;
        }

        $tempRows['article_id'] = $articleId;
        $tempRows['article_sessions'] = $articleSessions;
        $tempRows['article_sessions_created_on'] = $articleSessionsCreatedOn;


        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($tempRows);
    }

    /**
     * Get max reward for user performing assignment
     *
     * @param  mixed $articleId
     * @param  mixed $userId
     * @return mixed
     */
    private function getMaxRewardForUserPerformingAssignment($articleId, $userId){
        return CourseMaterialArticleAssignmentResultModel::select(
            'tbl_course_material_article_assignment_result.article_assignment_completion_time', 
            'tbl_course_material_article_assignment_result.article_assignment_completion_reward',
            'tbl_course_material_article_assignment_result.article_assignment_total_no_of_questions',
            'tbl_course_material_article_assignment_result.article_assignment_total_no_of_correct_answers'
            )
            ->where('tbl_course_material_article_assignment_result.article_id', '=', $articleId)
            ->where('tbl_course_material_article_assignment_result.user_id', '=', $userId)
            ->orderBy('tbl_course_material_article_assignment_result.article_assignment_completion_reward', 'DESC')
            ->first();
    }
    
    /**
     * Get distinct users performing assignment 
     *
     * @param  mixed $articleId
     * @return  mixed
     */
    private function getDistinctUsersPerformingAssignment($articleId){
        return CourseMaterialArticleAssignmentResultModel::select(
            'tbl_course_material_article_assignment_result.user_id',
            'tbl_course_material_article_assignment_result.article_id',
            'tbl_users.user_first_name',
            'tbl_users.user_last_name',
            'tbl_users.user_email'
            )
            ->join(
                'tbl_users',
                'tbl_users.user_id','=','tbl_course_material_article_assignment_result.user_id'
            )
            ->where('tbl_course_material_article_assignment_result.article_id', '=', $articleId)
            ->distinct('tbl_course_material_article_assignment_result.user_id')
            ->get();
    }

    /**
     * Get all study assignment session time
     *
     * @param  mixed $articleId
     * @param  mixed $userId
     * @return mixed
     */
    private function getAllStudyAssignmentSessionTime($articleId, $userId){
        return CourseMaterialArticleAssignmentResultModel::select(
            'tbl_course_material_article_assignment_result.article_id',
            'tbl_course_material_article_assignment_result.article_assignment_completion_time',
            'tbl_course_material_article_assignment_result.created_at'
            )
            ->where('tbl_course_material_article_assignment_result.article_id', '=', $articleId)
            ->where('tbl_course_material_article_assignment_result.user_id', '=', $userId)
            ->orderBy('tbl_course_material_article_assignment_result.created_at', 'ASC')
            ->get();
    }
}
