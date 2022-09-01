<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseMaterialFlashCardModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_course_material_flash_card';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'article_id',
        'material_id',
        'question_id',
        'front_media_type',
        'front_media',
        'front_content',
        'back_media_type',
        'back_media',
        'back_content',
        'back_content_more'
    ];

    protected $primaryKey = 'card_id';

    protected $keyType = 'string';

    /**
     * Relation - Belongs to Course Materiel article
     *
     * @return void
     */
    public function courseMaterialArticle()
    {
        return $this->belongsTo(CourseMaterialArticleModel::class);
    }
}
