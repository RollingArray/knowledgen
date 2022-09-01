<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialFlashCardServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\CourseMaterialFlashCardAnswerModel;
use App\Models\CourseMaterialFlashCardModel;

class CourseMaterialFlashCardService implements CourseMaterialFlashCardServiceInterface
{  
        
    /**
     * Return data structure service interface
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
     * Get all flash card for article
     *
     * @param  mixed $articleId
     * @return mixed
     */
    public function getAllFlashCardForArticle($articleId)
    {
        return CourseMaterialFlashCardModel::select(
            'tbl_course_material_flash_card.article_id', 
            'tbl_course_material_article.course_material_id', 
            'tbl_course_material_flash_card.card_id',
            'tbl_course_material_flash_card.front_media_type',
            'tbl_course_material_flash_card.front_media',
            'tbl_course_material_flash_card.front_content',
            'tbl_course_material_flash_card.back_media_type',
            'tbl_course_material_flash_card.back_media',
            'tbl_course_material_flash_card.back_content',
            'tbl_course_material_flash_card.back_content_more'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_flash_card.article_id'
            )
            ->where('tbl_course_material_flash_card.article_id', '=', $articleId)
            ->get();
    }

    /**
     * Get flash card details
     *
     * @param  mixed $cardId
     * @return mixed
     */
    public function getFlashCardDetails($cardId)
    {
        return CourseMaterialFlashCardModel::select(
            'tbl_course_material_flash_card.article_id', 
            'tbl_course_material_article.course_material_id', 
            'tbl_course_material_flash_card.card_id',
            'tbl_course_material_flash_card.front_media_type',
            'tbl_course_material_flash_card.front_media',
            'tbl_course_material_flash_card.front_content',
            'tbl_course_material_flash_card.back_media_type',
            'tbl_course_material_flash_card.back_media',
            'tbl_course_material_flash_card.back_content',
            'tbl_course_material_flash_card.back_content_more'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_flash_card.article_id'
            )
            ->where('tbl_course_material_flash_card.card_id', '=', $cardId)
            ->get()
            ->first();
    }

     /**
     * Delete card
     *
     * @param  mixed $cardId
     * @return mixed
     */
    public function deleteCard($cardId)
    {
        return CourseMaterialFlashCardModel::where('card_id', '=', $cardId)
                ->delete();
    }
}
