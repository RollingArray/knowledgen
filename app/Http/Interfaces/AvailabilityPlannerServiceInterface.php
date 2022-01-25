<?php

namespace App\Http\Interfaces;

Interface AvailabilityPlannerServiceInterface
{
    public function matchSkillWithAvailability($userId, $availabilityContext, $availabilityDate);

    public function getTeacherAvailabilityByDate($userId, $availabilityDate);

    public function getStudentAvailabilityByDate($userId, $availabilityDate);

    public function getAllStudentAvailabilityByDate($userId, $availabilityDate);

    public function getStudentPlannerDetails($userId, $plannerId);
}