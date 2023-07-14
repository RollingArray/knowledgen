<?php

namespace App\Http\Interfaces;

Interface CourseMaterialAssignmentResultServiceInterface
{
    public function getAssignmentLeaderBoard($articleId);

    public function getAllSessionTime($articleId, $userId);

    public function checkIfResultExist($userId, $articleId);

    public function getAllSession($userId);

    public function getCourseMaterialAllSessions($userId, $courseMaterialId);

    public function getTotalStudyPoints($userId);

    public function checkIfResultExistForAnyUser($articleId);
}