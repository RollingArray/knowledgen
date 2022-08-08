<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class LearningPathModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_learning_path';

    /**
     * $primaryKey
     *
     * @var string
     */
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_material_id', 
        'user_id'
    ];

     /**
     * Relation - Belongs to user
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

     /**
     * Relation - Belongs to Course Materiel
     *
     * @return void
     */
    public function courseMaterial()
    {
        return $this->belongsTo(CourseMaterialModel::class);
    }
}
