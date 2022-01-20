<?php

namespace App\Http\Interfaces;

Interface AvailabilityPlannerServiceInterface
{
    public function matchSkillWithAvailability($availabilityContext, $availabilityDate);
}