<?php

namespace App\Http\Interfaces;

Interface CourseMaterialAssignmentResultServiceInterface
{
    public function getAssignmentLeaderBoard($articleId);

    public function getAllSessionTime($articleId, $userId);
}