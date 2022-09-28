<?php

namespace App\Http\Interfaces;

Interface CoreSubjectAreaTagAnalysisServiceInterface
{
    public function getAllSubjectAreaTagAnalysis($userId);

    public function getSubjectAreaTagAnalysisById($subjectAreaTagId, $userId);

    public function incrementOrUpdateAnalysis($coreSubjectAreaTagAnalysis, $userId);
}