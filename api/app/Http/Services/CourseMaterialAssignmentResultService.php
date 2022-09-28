<?php

namespace App\Http\Services;

use App\Http\Interfaces\CoreSubjectAreaTagAnalysisServiceInterface;
use App\Http\Interfaces\CourseMaterialArticleServiceInterface;
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

    protected $coreSubjectAreaTagAnalysisServiceInterface;
    
    /**
     * __construct
     *
     * @return void
     */
    public function __construct(
		ReturnDataStructureServiceInterface $returnDataStructureServiceInterface,
        CourseMaterialArticleServiceInterface $courseMaterialArticleServiceInterface,
        CoreSubjectAreaTagAnalysisServiceInterface $coreSubjectAreaTagAnalysisServiceInterface
	) {
		$this->returnDataStructureServiceInterface = $returnDataStructureServiceInterface;
        $this->courseMaterialArticleServiceInterface = $courseMaterialArticleServiceInterface;
        $this->coreSubjectAreaTagAnalysisServiceInterface = $coreSubjectAreaTagAnalysisServiceInterface;
	}
  
    
    /**
     * Get total time from split time
     *
     * @param  mixed $splitTime
     * @return mixed
     */
    private function getTotalTimeFromSplitTime($splitTime){
        $timeArray = preg_split ("/\:/", $splitTime); 
        
        $minute = $timeArray[0];
        $second = $timeArray[1];
        $millisecond = $timeArray[2];
        
        $secondToMinute = $second / 60;
        $millisecondToMinute = ($millisecond / 100) / 60;
        $totalTime = $minute + $secondToMinute + $millisecondToMinute;

        return $totalTime;
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
        $articleSessions = array();
        $articleSessionsCreatedOn = array();
        $rows = $this->getAllStudyAssignmentSessionTime($articleId, $userId);
        foreach ($rows as $eachData) {
            $splitTime = $eachData->article_assignment_completion_time;
            $totalTime = $this->getTotalTimeFromSplitTime($splitTime);
            $articleSessions[] = round($totalTime, 2);
            $articleSessionsCreatedOn[] = $eachData->created_at;
        }
        
        $tempRows['article_id'] = $articleId;
        $tempRows['article_sessions'] = $articleSessions;
        $tempRows['article_allowed_iteration'] = $this->courseMaterialArticleServiceInterface->getCourseMaterialArticleById($articleId)->article_allowed_iteration;
        $tempRows['article_sessions_created_on'] = $articleSessionsCreatedOn;
        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($tempRows);
    }

    /**
     * Get all session time across
     *
     * @param  mixed $userId
     * @return mixed
     */
    public function getAllSession($userId){
        $tempRows = array();
        $sessions = $this->getAllStudyAssignmentSessionTimeAcross($userId);
        $tempRows['study_points'] = $this->getTotalStudyPoints($userId);
        $tempRows['study_sessions'] = $this->getAllSessionTimeAcross($sessions);
        $tempRows['session_assignments'] = $this->getAllSessionAssignments($sessions);
        $tempRows['assignments_score_analysis'] = $this->getAssignmentsScoreAnalysis($sessions);
        $tempRows['course_content_coverage_over_time'] = $this->getCourseContentCoverageOverTime($sessions);
        $tempRows['course_content_time_coverage_over_time'] = $this->getCourseContentTimeCoverageOverTime($sessions);
        $tempRows['core_subject_area_tag_analysis'] = $this->coreSubjectAreaTagAnalysisServiceInterface->getAllSubjectAreaTagAnalysis($userId);
        return $tempRows;
    }

    /**
     * Get all session assignments
     *
     * @param  mixed $userId
     * @return mixed
     */
    private function getAllSessionAssignments($sessions){
        $tempRows = array();
        
        $totalAssessments = 0;
        $totalCurrentMonthAssessments = 0;
        $totalPreviousMonthAssessments = 0;

        $totalQuizAssessments = 0;
        $totalCurrentMonthQuizAssessments = 0;
        $totalPreviousMonthQuizAssessments = 0;

        $totalDragContentAssessments = 0;
        $totalCurrentMonthDragContentAssessments = 0;
        $totalPreviousMonthDragContentAssessments = 0;

        $totalFillBlankAssessments = 0;
        $totalCurrentMonthFillBlankAssessments = 0;
        $totalPreviousMonthFillBlankAssessments = 0;

        $totalTextDocumentAssessments = 0;
        $totalCurrentMonthTextDocumentAssessments = 0;
        $totalPreviousMonthTextDocumentAssessments = 0;

        $totalFlashCardAssessments = 0;
        $totalCurrentMonthFlashCardAssessments = 0;
        $totalPreviousMonthFlashCardAssessments = 0;

        $month = date('Y-m', strtotime(date('Y-m')." 0 month"));
        $previousMonth = date('Y-m', strtotime(date('Y-m')." -1 month"));
        
        foreach ($sessions as $eachData) {

            $courseMaterialTypeId = $eachData->course_material_type_id;
            
            // assignment type - quiz
            if($courseMaterialTypeId === 'quiz'){
                $totalAssessments++;
                $totalQuizAssessments++;

                $sessionsCreatedOn = date('Y-m', strtotime($eachData->created_at));
                if($sessionsCreatedOn === $month){
                    $totalCurrentMonthAssessments ++;
                    $totalCurrentMonthQuizAssessments++;
                }
                // previous month time
                else if($sessionsCreatedOn === $previousMonth){
                    $totalPreviousMonthAssessments++;
                    $totalPreviousMonthQuizAssessments++;
                }
            }

            // assignment type - quiz
            if($courseMaterialTypeId === 'quiz'){
                $totalAssessments++;
                $totalQuizAssessments++;

                $sessionsCreatedOn = date('Y-m', strtotime($eachData->created_at));
                if($sessionsCreatedOn === $month){
                    $totalCurrentMonthAssessments ++;
                    $totalCurrentMonthQuizAssessments++;
                }
                 // previous month time
                else if($sessionsCreatedOn === $previousMonth){
                    $totalPreviousMonthAssessments++;
                    $totalPreviousMonthQuizAssessments++;
                }
            }

            // assignment type - dragContent
            else if($courseMaterialTypeId === 'dragContent'){
                $totalAssessments++;
                $totalDragContentAssessments++;

                $sessionsCreatedOn = date('Y-m', strtotime($eachData->created_at));
                if($sessionsCreatedOn === $month){
                    $totalCurrentMonthAssessments ++;
                    $totalCurrentMonthDragContentAssessments++;
                }
                 // previous month time
                else if($sessionsCreatedOn === $previousMonth){
                    $totalPreviousMonthAssessments++;
                    $totalPreviousMonthDragContentAssessments++;
                }
            }

            // assignment type - fillBlank
            else if($courseMaterialTypeId === 'fillBlank'){
                $totalAssessments++;
                $totalFillBlankAssessments++;

                $sessionsCreatedOn = date('Y-m', strtotime($eachData->created_at));
                if($sessionsCreatedOn === $month){
                    $totalCurrentMonthAssessments ++;
                    $totalCurrentMonthFillBlankAssessments++;
                }
                 // previous month time
                else if($sessionsCreatedOn === $previousMonth){
                    $totalPreviousMonthAssessments++;
                    $totalPreviousMonthFillBlankAssessments++;
                }
            }

            // assignment type - textDocument
            else if($courseMaterialTypeId === 'textDocument'){
                $totalAssessments++;
                $totalTextDocumentAssessments++;

                $sessionsCreatedOn = date('Y-m', strtotime($eachData->created_at));
                if($sessionsCreatedOn === $month){
                    $totalCurrentMonthAssessments ++;
                    $totalCurrentMonthTextDocumentAssessments++;
                }
                 // previous month time
                else if($sessionsCreatedOn === $previousMonth){
                    $totalPreviousMonthAssessments++;
                    $totalPreviousMonthTextDocumentAssessments++;
                }
            }

             // assignment type - flashCard
             else if($courseMaterialTypeId === 'flashCard'){
                $totalAssessments++;
                $totalFlashCardAssessments++;

                $sessionsCreatedOn = date('Y-m', strtotime($eachData->created_at));
                if($sessionsCreatedOn === $month){
                    $totalCurrentMonthAssessments ++;
                    $totalCurrentMonthFlashCardAssessments++;
                }
                 // previous month time
                else if($sessionsCreatedOn === $previousMonth){
                    $totalPreviousMonthAssessments++;
                    $totalPreviousMonthFlashCardAssessments++;
                }
            }
        }

        $quizAssessmentRows = array();
        $quizAssessmentRows['totalQuizAssessments'] = $totalQuizAssessments;
        $quizAssessmentRows['totalCurrentMonthQuizAssessments'] = $totalCurrentMonthQuizAssessments;
        $quizAssessmentRows['totalPreviousMonthQuizAssessments'] = $totalPreviousMonthQuizAssessments;

        $dragContentAssessmentRows = array();
        $dragContentAssessmentRows['totalDragContentAssessments'] = $totalDragContentAssessments;
        $dragContentAssessmentRows['totalCurrentMonthDragContentAssessments'] = $totalCurrentMonthDragContentAssessments;
        $dragContentAssessmentRows['totalPreviousMonthDragContentAssessments'] = $totalPreviousMonthDragContentAssessments;

        $fillBlankAssessmentRows = array();
        $fillBlankAssessmentRows['totalFillBlankAssessments'] = $totalFillBlankAssessments;
        $fillBlankAssessmentRows['totalCurrentMonthFillBlankAssessments'] = $totalCurrentMonthFillBlankAssessments;
        $fillBlankAssessmentRows['totalPreviousMonthFillBlankAssessments'] = $totalPreviousMonthFillBlankAssessments;

        $textDocumentAssessmentRows = array();
        $textDocumentAssessmentRows['totalTextDocumentAssessments'] = $totalTextDocumentAssessments;
        $textDocumentAssessmentRows['totalCurrentMonthTextDocumentAssessments'] = $totalCurrentMonthTextDocumentAssessments;
        $textDocumentAssessmentRows['totalPreviousMonthTextDocumentAssessments'] = $totalPreviousMonthTextDocumentAssessments;

        $flashCardAssessmentRows = array();
        $flashCardAssessmentRows['totalFlashCardAssessments'] = $totalFlashCardAssessments;
        $flashCardAssessmentRows['totalCurrentMonthFlashCardAssessments'] = $totalCurrentMonthFlashCardAssessments;
        $flashCardAssessmentRows['totalPreviousMonthFlashCardAssessments'] = $totalPreviousMonthFlashCardAssessments;

        $tempRows = array();
        $tempRows['total_assessments'] = $totalAssessments;
        $tempRows['total_currentMonth_assessments'] = $totalCurrentMonthAssessments;
        $tempRows['total_previousMonth_assessments'] = $totalPreviousMonthAssessments;
        $tempRows['quiz_assessment'] = $quizAssessmentRows;
        $tempRows['drag_content_assessment'] = $dragContentAssessmentRows;
        $tempRows['fill_blank_assessment'] = $fillBlankAssessmentRows;
        $tempRows['text_document_assessment'] = $textDocumentAssessmentRows;
        $tempRows['flash_card_assessment'] = $flashCardAssessmentRows;
        
        return $tempRows;
    }

    /**
     * Get all session time across
     *
     * @param  mixed $userId
     * @return mixed
     */
    private function getAllSessionTimeAcross($sessions){
        $totalTime = 0;
        $totalCurrentMonthTime = 0;
        $totalPreviousMonthTime = 0;
        $month = date('Y-m', strtotime(date('Y-m')." 0 month"));
        $previousMonth = date('Y-m', strtotime(date('Y-m')." -1 month"));
        
        foreach ($sessions as $eachData) {

            // total time
            $splitTime = $eachData->article_assignment_completion_time;
            $totalTimeFromSplitTime = $this->getTotalTimeFromSplitTime($splitTime);

            // all time
            $totalTime = $totalTime + $totalTimeFromSplitTime;
            $totalTime = round($totalTime, 2);

            // current month time
            $sessionsCreatedOn = date('Y-m', strtotime($eachData->created_at));
            if($sessionsCreatedOn === $month){
                $totalCurrentMonthTime = $totalCurrentMonthTime + $totalTimeFromSplitTime;
                $totalCurrentMonthTime = round($totalCurrentMonthTime, 2);
            }
            
            // previous month time
            $sessionsCreatedOn = date('Y-m', strtotime($eachData->created_at));
            if($sessionsCreatedOn === $previousMonth){
                $totalPreviousMonthTime = $totalPreviousMonthTime + $totalTimeFromSplitTime;
                $totalPreviousMonthTime = round($totalPreviousMonthTime, 2);
            }
            
        }

        $tempRows = array();
        $tempRows['total_study_sessions'] = $totalTime;
        $tempRows['total_current_month_studySessions'] = $totalCurrentMonthTime;
        $tempRows['total_previous_month_study_sessions'] = $totalPreviousMonthTime;
        return $tempRows;
    }

    /**
     * Get assignments score analysis
     *
     * @param  mixed $userId
     * @return mixed
     */
    private function getAssignmentsScoreAnalysis($sessions){
        $tempRows = array();
        $totalGoodScore = 0;
        $totalAverageScore = 0;
        $totalPoorScore = 0;
        $resultPercentage = 0;

        foreach ($sessions as $eachData) {

            $courseMaterialTypeId = $eachData->course_material_type_id;
            
            // assignment type - quiz
            if(
                $courseMaterialTypeId === 'quiz' ||
                $courseMaterialTypeId === 'dragContent' ||
                $courseMaterialTypeId === 'fillBlank'
            ){
                $totalNoOfQuestions = $eachData->article_assignment_total_no_of_questions;
                $totalNoOfCorrectAnswers = $eachData->article_assignment_total_no_of_correct_answers;
                
                if($totalNoOfQuestions !== 0){
                    $resultPercentage = ($totalNoOfCorrectAnswers / $totalNoOfQuestions) * 100;
                }

                if ($resultPercentage >= 0 && $resultPercentage <= 30)
                {
                    $totalGoodScore++;
                }
                else if ($resultPercentage >= 31 && $resultPercentage <= 70)
                {
                    $totalAverageScore++;
                }
                else if ($resultPercentage >= 71 && $resultPercentage <= 100)
                {
                    $totalPoorScore++;
                }
                
            }
        }

        $tempRows = array();
        $tempRows['total_good_score'] = $totalGoodScore;
        $tempRows['total_average_score'] = $totalAverageScore;
        $tempRows['total_poor_score'] = $totalPoorScore;
        
        return $tempRows;
    }

    /**
     * Get course content coverage over time
     *
     * @param  mixed $userId
     * @return mixed
     */
    private function getCourseContentCoverageOverTime($sessions){
        $tempRows = array();
        $maxMOnthPeriod = 12;
        
        for ($i=0; $i < $maxMOnthPeriod; $i++) { 
            $monthRows = array();
            $month = date('Y-m', strtotime(date('Y-m')." -$i month"));
            $monthRows['month'] = $month;
            $totalMonthCourseCoverage = 0;
            foreach ($sessions as $eachData) {
                $sessionsCreatedOn = date('Y-m', strtotime($eachData->created_at));
                
                if($sessionsCreatedOn === $month){
                    $totalMonthCourseCoverage ++;
                }
            }
            $monthRows['content_coverage'] = $totalMonthCourseCoverage;
            $tempRows[] = $monthRows;
        }

        return $tempRows;
    }

    /**
     * Get course content time_coverage over time
     *
     * @param  mixed $userId
     * @return mixed
     */
    private function getCourseContentTimeCoverageOverTime($sessions){
        $tempRows = array();
        $maxMOnthPeriod = 12;
        
        for ($i=0; $i < $maxMOnthPeriod; $i++) { 
            $monthRows = array();
            $month = date('Y-m', strtotime(date('Y-m')." -$i month"));
            $monthRows['month'] = $month;
            $totalMonthCourseTimeCoverage = 0;
            foreach ($sessions as $eachData) {
                $sessionsCreatedOn = date('Y-m', strtotime($eachData->created_at));
                $splitTime = $eachData->article_assignment_completion_time;
                $totalTime = $this->getTotalTimeFromSplitTime($splitTime);
                if($sessionsCreatedOn === $month){
                    $totalMonthCourseTimeCoverage = $totalMonthCourseTimeCoverage + $totalTime;
                }
            }
            $monthRows['content_time_coverage'] = round($totalMonthCourseTimeCoverage ,2);
            $tempRows[] = $monthRows;
        }

        return $tempRows;
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

    /**
     * Get all study assignment session time across
     *
     * @param  mixed $articleId
     * @param  mixed $userId
     * @return mixed
     */
    private function getAllStudyAssignmentSessionTimeAcross($userId){
        return CourseMaterialArticleAssignmentResultModel::select(
            'tbl_course_material_article_assignment_result.article_id',
            'tbl_course_material_article_assignment_result.article_assignment_completion_time',
            'tbl_course_material_article.course_material_type_id',
            'tbl_course_material_article_assignment_result.article_assignment_total_no_of_questions',
            'tbl_course_material_article_assignment_result.article_assignment_total_no_of_correct_answers',
            'tbl_course_material_article_assignment_result.created_at'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_article_assignment_result.article_id'
            )
            ->where('tbl_course_material_article_assignment_result.user_id', '=', $userId)
            ->orderBy('tbl_course_material_article_assignment_result.created_at', 'ASC')
            ->get();
    }

    
    /**
     * Check if result exist
     *
     * @param  mixed $articleId
     * @param  mixed $userId
     * @return void
     */
    public function checkIfResultExist($userId, $articleId)
    {
        return CourseMaterialArticleAssignmentResultModel::where('user_id', '=', $userId)
                ->where('article_id', '=', $articleId)
                ->exists();
    }

    /**
     * Check if result exist for any user
     *
     * @param  mixed $articleId
     * @return void
     */
    public function checkIfResultExistForAnyUser($articleId)
    {
        return CourseMaterialArticleAssignmentResultModel::where('article_id', '=', $articleId)
                ->exists();
    }

    /**
     * Get max reward for user performing assignment
     *
     * @param  mixed $articleId
     * @param  mixed $userId
     * @return mixed
     */
    public function getTotalStudyPoints($userId){
        return CourseMaterialArticleAssignmentResultModel::select(
            'tbl_course_material_article_assignment_result.article_assignment_completion_reward'
            )
            ->where('tbl_course_material_article_assignment_result.user_id', '=', $userId)
            ->sum('tbl_course_material_article_assignment_result.article_assignment_completion_reward');
    }

}
