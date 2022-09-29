<?php

namespace App\Http\Interfaces;

Interface CourseMaterialServiceInterface
{
    public function getAllUserCourseMateriels($userId);

    public function getAllUserCourseMaterielsWithFirstParentMenu($userId);

    public function getAllUserCourseMaterielsWithLearningPath($userId);

    public function getCourseMaterialById($courseMaterialId);

    public function getCourseMaterialByIdWithFirstParentMenu($courseMaterialId);

    public function deleteCourseMaterialById($courseMaterialId);

    public function checkIfUserIsCourseOwner($userId, $courseMaterialId);

    public function findRecommendedCourses($availabilityContext);

    public function findRecommendedCoursesWithLearningPath($availabilityContext, $userId);
}