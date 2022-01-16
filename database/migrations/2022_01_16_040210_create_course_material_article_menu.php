<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseMaterialArticleMenu extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_course_material_article_menu', function (Blueprint $table) {
            $table->id();
            $table->string('parent_article_id');
            $table->string('child_article_id');
            $table->string('sub_child_article_id');
            $table->integer('parent_article_order');
            $table->integer('child_article_order');
            $table->integer('sub_child_article_order');
            $table->timestamps();
            
            $table->foreign('parent_article_id')
                ->references('article_id')
                ->on('tbl_course_material_article')
                ->onDelete('cascade');

            $table->foreign('child_article_id')
                ->references('article_id')
                ->on('tbl_course_material_article')
                ->onDelete('cascade');

            $table->foreign('sub_child_article_id')
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
        Schema::dropIfExists('tbl_course_material_article_menu');
    }
}
