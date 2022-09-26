<?php

namespace App\Http\Services;

use App\Http\Interfaces\CoreSubjectAreaTagServiceInterface;
use App\Models\CoreSubjectAreaTagModel;

class CoreSubjectAreaTagService implements CoreSubjectAreaTagServiceInterface
{        
    /**
     * Get all subject area tag
     *
     * @return void
     */
    public function getAllSubjectAreaTag(){
        return CoreSubjectAreaTagModel::get();
    }
    
    /**
     * Get subject area tag by id
     *
     * @param  mixed $subjectAreaId
     * @return void
     */
    public function getSubjectAreaTagById($subjectAreaTagId)
    {
        return CoreSubjectAreaTagModel::where('subject_area_tag_id', '=', $subjectAreaTagId)
                ->get();
    }
}