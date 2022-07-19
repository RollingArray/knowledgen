<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseMaterialQuizAnswerModel extends BaseModel{

    use HasFactory;

    /**
     * $table
     *
     * @var string
     */
    protected $table = 'tbl_course_material_quiz_answer';

    protected $primaryKey = 'answer_id';

    protected $keyType = 'string';

    protected $casts = [
        'is_correct' => 'boolean',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'question_id',
        'answer_id',
        'answer',
        'is_correct'
    ];

    /**
     * Relation - Belongs to Course Materiel Quiz
     *
     * @return void
     */
    public function courseMaterialQuiz()
    {
        return $this->belongsTo(CourseMaterialQuizModel::class);
    }
}
