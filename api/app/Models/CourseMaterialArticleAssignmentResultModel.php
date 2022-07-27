<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseMaterialArticleAssignmentResultModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_course_material_article_assignment_result';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'article_id',
        'user_id',
        'article_assignment_completion_time',
        'article_assignment_completion_reward',
        'article_assignment_total_no_of_questions',
        'article_assignment_total_no_of_correct_answers'
    ];

    /**
     * Relation - Belongs to Course Materiel Article
     *
     * @return void
     */
    public function courseMaterialArticle()
    {
        return $this->belongsTo(CourseMaterialArticleModel::class);
    }
}
