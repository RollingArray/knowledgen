<?php

namespace App\Http\Interfaces;

Interface CourseMaterialArticleServiceInterface
{
    public function getAllCourseMaterielArticles($courseMaterialId);

    public function getCourseMaterialArticleById($articleId);

    public function deleteCourseMaterialArticleById($articleId);
}