<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialMenuServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\CourseMaterialChildMenuModel;
use App\Models\CourseMaterialMenuModel;
use App\Models\CourseMaterialParentMenuModel;
use App\Models\CourseMaterialSubChildMenuModel;
use CreateCourseMaterialSubChildMenu;

class CourseMaterialMenuService implements CourseMaterialMenuServiceInterface
{  
    
    protected $returnDataStructureServiceInterface;

    public function __construct(
		ReturnDataStructureServiceInterface $returnDataStructureServiceInterface
	) {
		$this->returnDataStructureServiceInterface = $returnDataStructureServiceInterface;
	}

    
    public function getAllMenuForMaterial($courseMaterialId)
    {
        $tempRows = array();

        $rows = $this->getParentMenu($courseMaterialId);
        
        foreach ($rows as $eachData) {
            $parentArticleId = $eachData->parent_article_id;
            $eachData['childMenu'] = $this->getAllChildMenuForParent($courseMaterialId, $parentArticleId);
            $tempRows[] = $eachData;
        }

        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($tempRows);
    }

    public function getAllChildMenuForParent($courseMaterialId, $parentArticleId)
    {
        $tempRows = array();

        $rows = $this->getChildMenu($courseMaterialId, $parentArticleId);
        foreach ($rows as $eachData) {
            $childArticleId = $eachData->child_article_id;
            $eachData['subChildMenu'] = $this->getAllSubChildMenuForParent($courseMaterialId, $childArticleId);
            $tempRows[] = $eachData;
        }

        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($tempRows);
    }

    public function getAllSubChildMenuForParent($courseMaterialId, $childArticleId)
    {
        $tempRows = array();

        $rows = $this->getSubChildMenu($courseMaterialId, $childArticleId);
        
        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($rows);
    }

    public function getParentMenu($courseMaterialId)
    {
        return CourseMaterialParentMenuModel::select(
            'tbl_course_material_parent_menu.parent_article_id', 
            'tbl_course_material_parent_menu.parent_article_order', 
            'tbl_course_material_parent_menu.course_material_id', 
            'tbl_course_material_article.article_title'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_parent_menu.parent_article_id'
            )
            ->where('tbl_course_material_parent_menu.course_material_id', '=', $courseMaterialId)
            ->where('tbl_course_material_article.course_material_id', '=', $courseMaterialId)
            ->get();
    }

    public function getParentMenuById($courseMaterialId, $parentArticleId)
    {
        return CourseMaterialParentMenuModel::select(
            'tbl_course_material_parent_menu.parent_article_id', 
            'tbl_course_material_parent_menu.parent_article_order', 
            'tbl_course_material_parent_menu.course_material_id', 
            'tbl_course_material_article.article_title'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_parent_menu.parent_article_id'
            )
            ->where('tbl_course_material_parent_menu.course_material_id', '=', $courseMaterialId)
            ->where('tbl_course_material_parent_menu.parent_article_id', '=', $parentArticleId)
            ->where('tbl_course_material_article.course_material_id', '=', $courseMaterialId)
            ->where('tbl_course_material_article.article_id', '=', $parentArticleId)
            ->first();
    }

    public function getChildMenu($courseMaterialId, $parentArticleId)
    {
        return CourseMaterialChildMenuModel::select(
            'tbl_course_material_child_menu.parent_article_id', 
            'tbl_course_material_child_menu.child_article_id', 
            'tbl_course_material_child_menu.child_article_order', 
            'tbl_course_material_child_menu.course_material_id', 
            'tbl_course_material_article.article_title'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_child_menu.child_article_id'
            )
            ->where('tbl_course_material_child_menu.course_material_id', '=', $courseMaterialId)
            ->where('tbl_course_material_child_menu.parent_article_id', '=', $parentArticleId)
            ->where('tbl_course_material_article.course_material_id', '=', $courseMaterialId)
            
            ->get();
    }

    public function getChildMenuById($courseMaterialId, $childArticleId)
    {
        return CourseMaterialChildMenuModel::select(
            'tbl_course_material_child_menu.parent_article_id', 
            'tbl_course_material_child_menu.child_article_id', 
            'tbl_course_material_child_menu.child_article_order', 
            'tbl_course_material_child_menu.course_material_id', 
            'tbl_course_material_article.article_title'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_child_menu.child_article_id'
            )
            ->where('tbl_course_material_child_menu.course_material_id', '=', $courseMaterialId)
            ->where('tbl_course_material_child_menu.child_article_id', '=', $childArticleId)
            ->where('tbl_course_material_article.course_material_id', '=', $courseMaterialId)
            ->where('tbl_course_material_article.article_id', '=', $childArticleId)
            ->first();
    }


    public function getSubChildMenu($courseMaterialId, $childArticleId)
    {
        return CourseMaterialSubChildMenuModel::select(
            'tbl_course_material_sub_child_menu.child_article_id', 
            'tbl_course_material_sub_child_menu.sub_child_article_id', 
            'tbl_course_material_sub_child_menu.sub_child_article_order', 
            'tbl_course_material_sub_child_menu.course_material_id', 
            'tbl_course_material_article.article_title'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_sub_child_menu.sub_child_article_id'
            )
            ->where('tbl_course_material_sub_child_menu.course_material_id', '=', $courseMaterialId)
            ->where('tbl_course_material_sub_child_menu.child_article_id', '=', $childArticleId)
            ->where('tbl_course_material_article.course_material_id', '=', $courseMaterialId)
            
            ->get();
    }

    public function getSubChildMenuById($courseMaterialId, $subChildArticleId)
    {
        return CourseMaterialSubChildMenuModel::select(
            'tbl_course_material_sub_child_menu.child_article_id', 
            'tbl_course_material_sub_child_menu.sub_child_article_id', 
            'tbl_course_material_sub_child_menu.sub_child_article_order', 
            'tbl_course_material_sub_child_menu.course_material_id', 
            'tbl_course_material_article.article_title'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_sub_child_menu.sub_child_article_id'
            )
            ->where('tbl_course_material_sub_child_menu.sub_child_article_id', '=', $subChildArticleId)
            ->where('tbl_course_material_article.article_id', '=', $subChildArticleId)
            ->where('tbl_course_material_article.course_material_id', '=', $courseMaterialId)
            ->first();
    }

    public function getMenu($courseMaterialId, $parentArticleId, $childArticleId, $subChildArticleId)
    {
        return CourseMaterialMenuModel::where('course_material_id', '=', $courseMaterialId)
                ->where('parent_article_id', '=', $parentArticleId)
                ->where('child_article_id', '=', $childArticleId)
                ->where('sub_child_article_id', '=', $subChildArticleId)
                ->get();
    }

    public function deleteMenu($courseMaterialId, $parentArticleId, $childArticleId, $subChildArticleId)
    {
        return CourseMaterialMenuModel::where('course_material_id', '=', $courseMaterialId)
                ->where('parent_article_id', '=', $parentArticleId)
                ->where('child_article_id', '=', $childArticleId)
                ->where('sub_child_article_id', '=', $subChildArticleId)
                ->delete();
    }
}
