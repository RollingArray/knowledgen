<?php

namespace App\Http\Interfaces;

Interface CoreSubjectAreaTagServiceInterface
{
    public function getAllSubjectAreaTag();

    public function getSubjectAreaTagById($subjectAreaId);
}