<?php

namespace App\Http\Interfaces;

Interface CourseMaterialMenuServiceInterface
{
    public function getAllMenuForMaterial($courseMaterialId);

    public function getMenu($courseMaterialId, $parentArticleId, $childArticleId, $subChildArticleId);

    public function deleteMenu($courseMaterialId, $parentArticleId, $childArticleId, $subChildArticleId);

    public function getSubChildMenuById($courseMaterialId, $subChildArticleId);

    public function getChildMenuById($courseMaterialId, $parentArticleId);

    public function getParentMenuById($courseMaterialId, $parentArticleId);
}