<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseMaterialArticleModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_course_material_article';

    /**
     * $primaryKey
     *
     * @var string
     */
    protected $primaryKey = 'article_id';
    
    /**
     * keyType
     *
     * @var string
     */
    protected $keyType = 'string';
    
    /**
     * incrementing
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'article_id', 
        'article_title',
        'course_material_type_id'
    ];

    /**
     * Course Materiel Articles
     *
     * @return void
     */
    public function courseMaterielArticles()
    {
        return $this->hasMany(CourseMaterialArticleModel::class);
    }
}
