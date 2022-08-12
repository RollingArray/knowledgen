<?php

namespace App\Http\Interfaces;

Interface CourseMaterialAssignmentResultServiceInterface
{
    public function getAssignmentLeaderBoard($articleId);

    public function getAllSessionTime($articleId, $userId);

    public function checkIfResultExist($userId, $articleId);

    public function getAllSession($userId);
}