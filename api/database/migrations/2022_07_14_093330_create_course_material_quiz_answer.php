<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseMaterialQuizAnswer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_course_material_quiz_answer', function (Blueprint $table) {
            $table->string('answer_id')->primary();
            $table->string('question_id');
            $table->longText('answer');
            $table->boolean('is_correct');
            $table->timestamps();
            
            $table->foreign('question_id')
                ->references('question_id')
                ->on('tbl_course_material_quiz')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_course_material_quiz_answer');
    }
}
