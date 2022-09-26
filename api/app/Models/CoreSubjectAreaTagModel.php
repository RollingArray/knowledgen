<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoreSubjectAreaTagModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_core_subject_area_tag';

    
    /**
     * $primaryKey
     *
     * @var string
     */
    protected $primaryKey = 'subject_area_tag_id';

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'subject_area_id', 
        'subject_area_tag_id', 
        'subject_area_tag_name',
    ];

    /**
     * Relation - Belongs to core subject area
     *
     * @return void
     */
    public function coreSubjectArea()
    {
        return $this->belongsTo(CoreSubjectAreaModel::class);
    }
}
