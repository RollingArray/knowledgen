<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoreSubjectAreaTagAnalysisModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_tag_analysis';

    
    /**
     * $primaryKey
     *
     * @var string
     */
    protected $primaryKey = 'tag_analysis_id';

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tag_analysis_id', 
        'subject_area_tag_id', 
        'weak_area_analysis', 
        'strong_area_analysis',
        'user_id'
    ];

    /**
     * Relation - Belongs to core subject area tag
     *
     * @return void
     */
    public function coreSubjectAreaTag()
    {
        return $this->belongsTo(CoreSubjectAreaTagModel::class);
    }

    /**
     * Relation - Belongs to user
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
