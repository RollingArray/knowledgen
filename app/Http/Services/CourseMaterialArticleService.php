<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialArticleServiceInterface;
use App\Models\CourseMaterialArticleModel;

class CourseMaterialArticleService implements CourseMaterialArticleServiceInterface
{    
    public function getAllCourseMaterielArticles($courseMaterialId)
    {
        return CourseMaterialArticleModel::where('course_material_id', '=', $courseMaterialId)
                ->get();
    }

    public function getCourseMaterialArticleById($articleId)
    {
        return CourseMaterialArticleModel::where('article_id', $articleId)
                ->first();
    }

    public function deleteCourseMaterialArticleById($articleId)
    {
        return CourseMaterialArticleModel::where('article_id', '=', $articleId)
                ->delete();
    }
}