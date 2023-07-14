<?php

namespace App\Http\Interfaces;

Interface CourseMaterialQuizServiceInterface
{
    public function getAllQuizForArticle($articleId);

    public function getQuestion($questionId);

    public function getQuestionDetails($questionId);

    public function getAnswersForQuestion($questionId);

    public function deleteAnswersForQuestion($questionId);

    public function deleteQuestion($questionId);

    public function getAllSubjectAreaTagFroCourseMaterial($courseMaterialId);
}