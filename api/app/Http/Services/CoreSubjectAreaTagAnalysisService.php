<?php

namespace App\Http\Services;

use App\Http\Interfaces\CoreSubjectAreaTagAnalysisServiceInterface;
use App\Models\CoreSubjectAreaTagAnalysisModel;

class CoreSubjectAreaTagAnalysisService implements CoreSubjectAreaTagAnalysisServiceInterface
{
       
    /**
     * getAllSubjectAreaTagAnalysis
     *
     * @param  mixed $userId
     * @return void
     */
    public function getAllSubjectAreaTagAnalysis($userId)
    {
        return CoreSubjectAreaTagAnalysisModel::select(
            'tbl_tag_analysis.subject_area_tag_id',
            'tbl_core_subject_area_tag.subject_area_tag_name',
            'tbl_tag_analysis.weak_area_analysis',
            'tbl_tag_analysis.strong_area_analysis',
            'tbl_tag_analysis.user_id',
            'tbl_core_subject_area_tag.subject_area_id',
            'tbl_core_subject_area.subject_area_name'
            )
            ->join(
                'tbl_core_subject_area_tag',
                'tbl_tag_analysis.subject_area_tag_id','=','tbl_core_subject_area_tag.subject_area_tag_id'
            )
            ->join(
                'tbl_core_subject_area',
                'tbl_core_subject_area_tag.subject_area_id','=','tbl_core_subject_area.subject_area_id'
            )
            ->where('tbl_tag_analysis.user_id', '=', $userId)
            ->get();
    }

    /**
     * Get subject area tag analysis by id
     *
     * @param  mixed $subjectAreaId 
     * @param  mixed $userId 
     * @return mixed
     */
    public function getSubjectAreaTagAnalysisById($subjectAreaTagId, $userId)
    {
        return CoreSubjectAreaTagAnalysisModel::where('subject_area_tag_id', '=', $subjectAreaTagId)
            ->where('user_id', '=', $userId)
            ->first();
    }
    
    /**
     * incrementOrUpdateAnalysis
     *
     * @param  mixed $coreSubjectAreaTagAnalysis
     * @param  mixed $userId
     * @return void
     */
    public function incrementOrUpdateAnalysis($coreSubjectAreaTagAnalysis, $userId)
    {
        foreach ($coreSubjectAreaTagAnalysis as $eachTag) {

            $model = $this->getSubjectAreaTagAnalysisById($eachTag['subjectAreaTagId'], $userId);

            if ($model !== null) {
                $model->weak_area_analysis = $model->weak_area_analysis + $eachTag['weakAreaAnalysis'];
                $model->strong_area_analysis = $model->strong_area_analysis + $eachTag['strongAreaAnalysis'];
                $model->save();
            } else {

                $model = new CoreSubjectAreaTagAnalysisModel();
                $model->tag_analysis_id = uniqid();
                $model->subject_area_tag_id = $eachTag['subjectAreaTagId'];
                $model->weak_area_analysis = $eachTag['weakAreaAnalysis'];
                $model->strong_area_analysis = $eachTag['strongAreaAnalysis'];
                $model->user_id = $userId;
                $model->save();
            }
        }
    }
}
