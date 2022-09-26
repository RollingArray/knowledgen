<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialQuizServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\CourseMaterialQuizAnswerModel;
use App\Models\CourseMaterialQuizModel;

class CourseMaterialQuizService implements CourseMaterialQuizServiceInterface
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
     * Get all quiz for article
     *
     * @param  mixed $courseMaterialId
     * @return mixed
     */
    public function getAllQuizForArticle($articleId)
    {
        $tempRows = array();

        $rows = $this->getQuestions($articleId);
        
        foreach ($rows as $eachData) {
            $questionId = $eachData->question_id;
            $eachData['options'] = $this->getAnswersForQuestion($questionId);
            $tempRows[] = $eachData;
        }

        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($tempRows);
    }

     /**
     * Get question details
     *
     * @param  mixed $questionId
     * @return mixed
     */
    public function getQuestionDetails($questionId)
    {
        $rows = $this->getQuestion($questionId);
        $questionId = $rows->question_id;
        $answers = $this->getAnswersForQuestion($questionId);
        $rows['options'] = $answers;
        return $rows;
    }
    
    /**
     * Get questions
     *
     * @param  mixed $articleId
     * @return mixed
     */
    private function getQuestions($articleId)
    {
        return CourseMaterialQuizModel::select(
            'tbl_course_material_quiz.article_id', 
            'tbl_course_material_article.course_material_id', 
            'tbl_course_material_quiz.question_id',
            'tbl_course_material_quiz.question',
            'tbl_course_material_quiz.quiz_type',
            'tbl_core_subject_area_tag.subject_area_id',
            'tbl_course_material_quiz.subject_area_tag_id',
            'tbl_core_subject_area_tag.subject_area_tag_name'
            )
            ->join(
                'tbl_core_subject_area_tag',
                'tbl_course_material_quiz.subject_area_tag_id','=','tbl_core_subject_area_tag.subject_area_tag_id'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_quiz.article_id'
            )
            ->where('tbl_course_material_quiz.article_id', '=', $articleId)
            ->get();
    }
       
    /**
     * Get answers for question
     *
     * @param  mixed $questionId
     * @return mixed
     */
    public function getAnswersForQuestion($questionId)
    {
        return CourseMaterialQuizAnswerModel::where('question_id', '=', $questionId)
                ->get();
    }
    
    /**
     * Get question
     *
     * @param  mixed $questionId
     * @return mixed
     */
    public function getQuestion($questionId)
    {
        return CourseMaterialQuizModel::select(
            'tbl_course_material_quiz.article_id', 
            'tbl_course_material_article.course_material_id', 
            'tbl_course_material_quiz.question_id',
            'tbl_course_material_quiz.question',
            'tbl_course_material_quiz.quiz_type',
            'tbl_core_subject_area_tag.subject_area_id',
            'tbl_course_material_quiz.subject_area_tag_id',
            'tbl_core_subject_area_tag.subject_area_tag_name'
            )
            ->join(
                'tbl_core_subject_area_tag',
                'tbl_course_material_quiz.subject_area_tag_id','=','tbl_core_subject_area_tag.subject_area_tag_id'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_quiz.article_id'
            )
            ->where('tbl_course_material_quiz.question_id', '=', $questionId)
            ->get()
            ->first();
    }

     /**
     * Delete answers for question
     *
     * @param  mixed $questionId
     * @return mixed
     */
    public function deleteAnswersForQuestion($questionId)
    {
        return CourseMaterialQuizAnswerModel::where('question_id', '=', $questionId)
                ->delete();
    }

     /**
     * Delete answers for question
     *
     * @param  mixed $questionId
     * @return mixed
     */
    public function deleteQuestion($questionId)
    {
        return CourseMaterialQuizModel::where('question_id', '=', $questionId)
                ->delete();
    }
}
