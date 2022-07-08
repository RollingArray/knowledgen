<?php

namespace App\Http\Interfaces;

Interface ArticleTextDocumentServiceInterface
{
    public function getArticleTextDocument($articleId);
    
    public function getArticleTextDocumentByArticleId($articleId);
}