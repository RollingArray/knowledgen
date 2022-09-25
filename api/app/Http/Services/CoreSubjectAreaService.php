<?php

namespace App\Http\Services;

use App\Http\Interfaces\CoreSubjectAreaServiceInterface;
use App\Models\CoreSubjectAreaModel;

class CoreSubjectAreaService implements CoreSubjectAreaServiceInterface
{        
    /**
     * getAllSubjectArea
     *
     * @return void
     */
    public function getAllSubjectArea(){
        return CoreSubjectAreaModel::get();
    }
    
    /**
     * getSubjectAreaById
     *
     * @param  mixed $subjectAreaId
     * @return void
     */
    public function getSubjectAreaById($subjectAreaId)
    {
        return CoreSubjectAreaModel::where('subject_area_id', '=', $subjectAreaId)
                ->get();
    }
}