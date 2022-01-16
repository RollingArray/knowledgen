<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseMaterialArticle extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_course_material_article', function (Blueprint $table) {
            $table->string('article_id')->primary();
            $table->string('course_material_id');
            $table->string('article_title');
            $table->integer('article_feedback_delightful');
            $table->integer('article_feedback_neutral');
            $table->integer('article_feedback_sad');
            $table->timestamps();
            $table->index([
                'article_id',
                'article_title']
            );
            
            $table->foreign('course_material_id')
                ->references('course_material_id')
                ->on('tbl_course_material')
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
        Schema::dropIfExists('tbl_course_material_article');
    }
}
