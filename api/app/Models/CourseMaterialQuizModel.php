<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseMaterialQuizModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_course_material_quiz';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'article_id',
        'question_id',
        'question',
        'quiz_type',
        'subject_area_tag_id'
    ];

    protected $primaryKey = 'question_id';

    protected $keyType = 'string';


    /**
     * Relation - Belongs to Course Materiel
     *
     * @return void
     */
    public function courseMaterial()
    {
        return $this->belongsTo(CourseMaterialModel::class);
    }

    /**
     * Relation - Has many Course Materiel Quiz Answers
     *
     * @return void
     */
    public function courseMaterialQuizAnswers()
    {
        return $this->hasMany(CourseMaterialQuizAnswerModel::class);
    }

    /**
     * Relation - Has one core subject area tag
     *
     * @return void
     */
    public function coreSubjectAreaTag()
    {
        return $this->hasOne(CoreSubjectAreaTagModel::class);
    }
}
