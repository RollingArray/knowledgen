<?php

namespace App\Http\Interfaces;

Interface CourseMaterialMenuServiceInterface
{
    public function getAllMenuForMaterial($courseMaterialId);

    public function deleteParentMenu($courseMaterialId, $parentArticleId);

    public function deleteChildMenu($courseMaterialId, $parentArticleId, $childArticleId);

    public function deleteSubChildMenu($courseMaterialId, $childArticleId, $subChildArticleId);

    public function getSubChildMenuById($courseMaterialId, $subChildArticleId);

    public function getChildMenuById($courseMaterialId, $articleId);

    public function getParentMenuById($courseMaterialId, $parentArticleId);
}