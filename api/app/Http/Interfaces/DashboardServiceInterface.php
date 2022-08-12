<?php

namespace App\Http\Interfaces;

Interface DashboardServiceInterface
{
    public function getStudentDashboard($userId);

    public function getTeacherDashboard($userId);
}