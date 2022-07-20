<?php

namespace App\Http\Services;

use App\Http\Interfaces\CourseMaterialMenuServiceInterface;
use App\Http\Interfaces\ReturnDataStructureServiceInterface;
use App\Models\CourseMaterialChildMenuModel;
use App\Models\CourseMaterialParentMenuModel;
use App\Models\CourseMaterialSubChildMenuModel;

class CourseMaterialMenuService implements CourseMaterialMenuServiceInterface
{  
        
    /**
     * returnDataStructureServiceInterface
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
     * Get All Menu For Material
     *
     * @param  mixed $courseMaterialId
     * @return void
     */
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
    
    /**
     * Get All Child Menu For Parent
     *
     * @param  mixed $courseMaterialId
     * @param  mixed $parentArticleId
     * @return void
     */
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
    
    /**
     * Get All Sub Child Menu For Parent
     *
     * @param  mixed $courseMaterialId
     * @param  mixed $childArticleId
     * @return void
     */
    public function getAllSubChildMenuForParent($courseMaterialId, $childArticleId)
    {
        $tempRows = array();

        $rows = $this->getSubChildMenu($courseMaterialId, $childArticleId);
        
        return $this->returnDataStructureServiceInterface->generateServiceReturnDataStructure($rows);
    }
    
    /**
     * Get Parent Menu
     *
     * @param  mixed $courseMaterialId
     * @return mixed
     */
    private function getParentMenu($courseMaterialId)
    {
        return CourseMaterialParentMenuModel::select(
            'tbl_course_material_parent_menu.parent_article_id', 
            'tbl_course_material_parent_menu.parent_article_order', 
            'tbl_course_material_parent_menu.course_material_id', 
            'tbl_course_material_article.article_title',
            'tbl_course_material_article.article_status',
            'tbl_course_material_article.course_material_type_id',
            'tbl_course_material_article.article_completion_time',
            'tbl_course_material_article.article_completion_reward'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_parent_menu.parent_article_id'
            )
            ->where('tbl_course_material_parent_menu.course_material_id', '=', $courseMaterialId)
            ->where('tbl_course_material_article.course_material_id', '=', $courseMaterialId)
            ->get();
    }
    
    /**
     * Get Parent Menu By Id
     *
     * @param  mixed $courseMaterialId
     * @param  mixed $parentArticleId
     * @return void
     */
    public function getParentMenuById($courseMaterialId, $parentArticleId)
    {
        return CourseMaterialParentMenuModel::select(
            'tbl_course_material_parent_menu.parent_article_id', 
            'tbl_course_material_parent_menu.parent_article_order', 
            'tbl_course_material_parent_menu.course_material_id', 
            'tbl_course_material_article.article_title',
            'tbl_course_material_article.article_status',
            'tbl_course_material_article.course_material_type_id',
            'tbl_course_material_article.article_completion_time',
            'tbl_course_material_article.article_completion_reward'
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
    
    /**
     * Get Child Menu
     *
     * @param  mixed $courseMaterialId
     * @param  mixed $parentArticleId
     * @return mixed
     */
    private function getChildMenu($courseMaterialId, $parentArticleId)
    {
        return CourseMaterialChildMenuModel::select(
            'tbl_course_material_child_menu.parent_article_id', 
            'tbl_course_material_child_menu.child_article_id', 
            'tbl_course_material_child_menu.child_article_order', 
            'tbl_course_material_child_menu.course_material_id', 
            'tbl_course_material_article.article_title',
            'tbl_course_material_article.article_status',
            'tbl_course_material_article.course_material_type_id',
            'tbl_course_material_article.article_completion_time',
            'tbl_course_material_article.article_completion_reward'
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
    
    /**
     * Get Child Menu By Id
     *
     * @param  mixed $courseMaterialId
     * @param  mixed $articleId
     * @return void
     */
    public function getChildMenuById($courseMaterialId, $articleId)
    {
        return CourseMaterialChildMenuModel::select(
            'tbl_course_material_child_menu.parent_article_id', 
            'tbl_course_material_child_menu.child_article_id', 
            'tbl_course_material_child_menu.child_article_order', 
            'tbl_course_material_child_menu.course_material_id', 
            'tbl_course_material_article.article_title',
            'tbl_course_material_article.article_status',
            'tbl_course_material_article.course_material_type_id',
            'tbl_course_material_article.article_completion_time',
            'tbl_course_material_article.article_completion_reward'
            )
            ->join(
                'tbl_course_material_article',
                'tbl_course_material_article.article_id','=','tbl_course_material_child_menu.child_article_id'
            )
            ->where('tbl_course_material_child_menu.course_material_id', '=', $courseMaterialId)
            ->where('tbl_course_material_child_menu.child_article_id', '=', $articleId)
            ->where('tbl_course_material_article.course_material_id', '=', $courseMaterialId)
            ->where('tbl_course_material_article.article_id', '=', $articleId)
            ->first();
    }

    
    /**
     * Get Sub Child Menu
     *
     * @param  mixed $courseMaterialId
     * @param  mixed $childArticleId
     * @return mixed
     */
    public function getSubChildMenu($courseMaterialId, $childArticleId)
    {
        return CourseMaterialSubChildMenuModel::select(
            'tbl_course_material_sub_child_menu.child_article_id', 
            'tbl_course_material_sub_child_menu.sub_child_article_id', 
            'tbl_course_material_sub_child_menu.sub_child_article_order', 
            'tbl_course_material_sub_child_menu.course_material_id', 
            'tbl_course_material_article.article_title',
            'tbl_course_material_article.article_status',
            'tbl_course_material_article.course_material_type_id',
            'tbl_course_material_article.article_completion_time',
            'tbl_course_material_article.article_completion_reward'
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
    
    /**
     * Get Sub Child Menu By Id
     *
     * @param  mixed $courseMaterialId
     * @param  mixed $subChildArticleId
     * @return void
     */
    public function getSubChildMenuById($courseMaterialId, $subChildArticleId)
    {
        return CourseMaterialSubChildMenuModel::select(
            'tbl_course_material_sub_child_menu.child_article_id', 
            'tbl_course_material_sub_child_menu.sub_child_article_id', 
            'tbl_course_material_sub_child_menu.sub_child_article_order', 
            'tbl_course_material_sub_child_menu.course_material_id', 
            'tbl_course_material_article.article_title',
            'tbl_course_material_article.article_status',
            'tbl_course_material_article.course_material_type_id',
            'tbl_course_material_article.article_completion_time',
            'tbl_course_material_article.article_completion_reward'
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
    
    /**
     * Delete Parent Menu
     *
     * @param  mixed $courseMaterialId
     * @param  mixed $parentArticleId
     * @return void
     */
    public function deleteParentMenu($courseMaterialId, $parentArticleId)
    {
        return CourseMaterialParentMenuModel::where('course_material_id', '=', $courseMaterialId)
                ->where('parent_article_id', '=', $parentArticleId)
                ->delete();
    }
    
    /**
     * Delete Child Menu
     *
     * @param  mixed $courseMaterialId
     * @param  mixed $parentArticleId
     * @param  mixed $childArticleId
     * @return void
     */
    public function deleteChildMenu($courseMaterialId, $parentArticleId, $childArticleId)
    {
        return CourseMaterialChildMenuModel::where('course_material_id', '=', $courseMaterialId)
                ->where('parent_article_id', '=', $parentArticleId)
                ->where('child_article_id', '=', $childArticleId)
                ->delete();
    }
    
    /**
     * Delete Sub Child Menu
     *
     * @param  mixed $courseMaterialId
     * @param  mixed $childArticleId
     * @param  mixed $subChildArticleId
     * @return void
     */
    public function deleteSubChildMenu($courseMaterialId, $childArticleId, $subChildArticleId)
    {
        return CourseMaterialSubChildMenuModel::where('course_material_id', '=', $courseMaterialId)
                ->where('child_article_id', '=', $childArticleId)
                ->where('sub_child_article_id', '=', $subChildArticleId)
                ->delete();
    }
}
