<?php

namespace App\Http\Services;

use App\Http\Interfaces\ArticleTextDocumentServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\ArticleTextDocumentModel;

class ArticleTextDocumentService implements ArticleTextDocumentServiceInterface
{    	
	/**
	 * Return Data Structure Service Interface
	 *
	 * @var mixed
	 */
	protected $returnDataStructureServiceInterface;
    
    /**
     * __construct
     *
     * @return void
     */
    public function __construct(
		ReturnDataStructureServiceInterface $returnDataStructureServiceInterface
	) {
		$this->returnDataStructureServiceInterface = $returnDataStructureServiceInterface;
	}
	
	/**
	 * Get Article Text Document
	 *
	 * @param  mixed $articleId
	 * @return void
	 */
	public function getArticleTextDocument($articleId){
		$rows =  ArticleTextDocumentModel::select(
			'tbl_article_text_document.article_text_document_id', 
			'tbl_article_text_document.article_id', 
			'tbl_article_text_document.article_text_document_content',
			'tbl_course_material_article.course_material_id',
			'tbl_course_material_article.article_status'
			)
			->join(
				'tbl_course_material_article',
				'tbl_article_text_document.article_id','=','tbl_course_material_article.article_id'
			)
			->where('tbl_article_text_document.article_id', '=', $articleId)
			->get();

		return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($rows);
	}
	
	/**
	 * Get Article Text Document By Article Id
	 *
	 * @param  mixed $articleId
	 * @return void
	 */
	public function getArticleTextDocumentByArticleId($articleId)
    {
        return ArticleTextDocumentModel::where('article_id', $articleId)
                ->first();
    }
}