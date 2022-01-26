<?php

namespace App\Http\Services;

use App\Http\Interfaces\ArticleComponentServiceInterface;
use App\Http\Interfaces\AvailabilityPlannerServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\ArticleComponentModel;
use App\Models\StudentAvailabilityPlannerModel;
use App\Models\TeacherAvailabilityPlannerModel;
use App\Models\User;

class ArticleComponentService implements ArticleComponentServiceInterface
{    
	protected $returnDataStructureServiceInterface;

    public function __construct(
		ReturnDataStructureServiceInterface $returnDataStructureServiceInterface
	) {
		$this->returnDataStructureServiceInterface = $returnDataStructureServiceInterface;
	}

	public function getArticleComponents($articleId){
		$rows = ArticleComponentModel::where('article_id', '=', $articleId)
		->get();

		return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($rows);
	}
}