<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialArticleRevisionServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\CourseMaterialArticleRevisionModel;

class CourseMaterialArticleRevisionService implements CourseMaterialArticleRevisionServiceInterface
{    
	protected $returnDataStructureServiceInterface;

    public function __construct(
		ReturnDataStructureServiceInterface $returnDataStructureServiceInterface
	) {
		$this->returnDataStructureServiceInterface = $returnDataStructureServiceInterface;
	}

		
	/**
	 * Get revisions by date
	 *
	 * @param  mixed $userId
	 * @param  mixed $articleRevisionDate
	 * @return void
	 */
	public function getRevisionsByDate($userId, $articleRevisionDate)
    {
		$rows =  CourseMaterialArticleRevisionModel::select(
			'tbl_users.user_id', 
			'tbl_users.user_type', 
			'tbl_course_material_article_revision.article_revision_id',
			'tbl_course_material_article_revision.article_id',
			'tbl_course_material_article.course_material_id',
			'tbl_course_material_article.article_title',
			'tbl_course_material_article.course_material_type_id',
			'tbl_course_material_article.article_summery',
			'tbl_course_material_article_revision.article_revision_date'
			)
			->join(
				'tbl_users',
				'tbl_users.user_id','=','tbl_course_material_article_revision.user_id'
			)
			->join(
				'tbl_course_material_article',
				'tbl_course_material_article.article_id','=','tbl_course_material_article_revision.article_id'
			)
			->where('tbl_users.user_id', '=', $userId)
            ->where('article_revision_date', '=', $articleRevisionDate)
			->get();
			//dd($rows);
			return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($rows);
    }

	public function getAllRevisionsByDate($userId, $articleRevisionDate, $articleId)
    {
        return CourseMaterialArticleRevisionModel::select(
			'tbl_users.user_id', 
			'tbl_users.user_type', 
			'tbl_course_material_article_revision.article_revision_id',
			'tbl_course_material_article_revision.article_id',
			'tbl_course_material_article.course_material_id',
			'tbl_course_material_article.article_title',
			'tbl_course_material_article.course_material_type_id',
			'tbl_course_material_article.article_summery',
			'tbl_course_material_article_revision.article_revision_date'
			)
			->join(
				'tbl_users',
				'tbl_users.user_id','=','tbl_course_material_article_revision.user_id'
			)
			->join(
				'tbl_course_material_article',
				'tbl_course_material_article.article_id','=','tbl_course_material_article_revision.article_id'
			)
			->where('tbl_users.user_id', '=', $userId)
            ->where('tbl_course_material_article_revision.article_revision_date', '=', $articleRevisionDate)
			->where('tbl_course_material_article_revision.article_id', '=', $articleId)
			->first();
    }
}