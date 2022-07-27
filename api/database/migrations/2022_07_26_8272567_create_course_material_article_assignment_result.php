<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseMaterialArticleAssignmentResult extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_course_material_article_assignment_result', function (Blueprint $table) {
            $table->string('article_id');
            $table->string('user_id');
            $table->string('article_assignment_completion_time')->default('00:00:00');
            $table->integer('article_assignment_completion_reward')->default('0');
            $table->integer('article_assignment_total_no_of_questions')->default('0');
            $table->integer('article_assignment_total_no_of_correct_answers')->default('0');
            $table->timestamps();
            
            $table->foreign('user_id')
                ->references('user_id')
                ->on('tbl_users')
                ->onDelete('cascade');

            $table->foreign('article_id')
                ->references('article_id')
                ->on('tbl_course_material_article')
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
        Schema::dropIfExists('tbl_course_material_article_assignment_result');
    }
}
