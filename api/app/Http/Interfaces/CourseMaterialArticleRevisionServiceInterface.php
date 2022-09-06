<?php

namespace App\Http\Interfaces;

Interface CourseMaterialArticleRevisionServiceInterface
{
    public function getRevisionsByDate($userId, $articleRevisionDate);

    public function getAllRevisionsByDate($userId, $articleRevisionDate);
}