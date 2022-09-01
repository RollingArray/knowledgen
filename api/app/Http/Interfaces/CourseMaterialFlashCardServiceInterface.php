<?php

namespace App\Http\Interfaces;

Interface CourseMaterialFlashCardServiceInterface
{
    public function getAllFlashCardForArticle($articleId);

    public function getFlashCardDetails($cardId);

    public function deleteCard($cardId);
}