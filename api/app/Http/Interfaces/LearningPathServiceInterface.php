<?php

namespace App\Http\Interfaces;

Interface LearningPathServiceInterface
{
    public function checkIfCourseMaterialInLearningPath($userId, $courseMaterialId);

    public function deleteLearningPath($userId, $courseMaterialId);

    public function getLearningPath($userId);

    public function getLearningPathDetailsByMaterial($userId, $courseMaterialId);
}