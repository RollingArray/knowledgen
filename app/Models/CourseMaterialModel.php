<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class CourseMaterialModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_course_material';

    
    /**
     * $primaryKey
     *
     * @var string
     */
    protected $primaryKey = 'course_material_id';

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_material_id', 
        'course_material_name', 
        'course_material_description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
