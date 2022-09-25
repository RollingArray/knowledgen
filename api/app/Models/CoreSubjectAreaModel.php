<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoreSubjectAreaModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_core_subject_area';

    
    /**
     * $primaryKey
     *
     * @var string
     */
    protected $primaryKey = 'subject_area_id';

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'subject_area_id', 
        'subject_area_name',
    ];
}
