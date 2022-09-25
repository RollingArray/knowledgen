<?php

namespace App\Http\Interfaces;

Interface CoreSubjectAreaServiceInterface
{
    public function getAllSubjectArea();

    public function getSubjectAreaById($subjectAreaId);
}