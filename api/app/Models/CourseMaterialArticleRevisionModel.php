<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseMaterialArticleRevisionModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_course_material_article_revision';

    
    /**
     * $primaryKey
     *
     * @var string
     */
    protected $primaryKey = 'article_revision_id';

    protected $keyType = 'string';

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'article_revision_id',
        'article_id',
        'user_id',
        'article_revision_date',
    ];

    /**
     * Relation - Belongs to Course Materiel Articles
     *
     * @return void
     */
    public function materialArticle()
    {
        return $this->belongsTo(CourseMaterialArticleModel::class);
    }
}
