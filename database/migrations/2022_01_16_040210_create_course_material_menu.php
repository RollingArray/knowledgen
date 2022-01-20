<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseMaterialMenu extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_course_material_menu', function (Blueprint $table) {
            $table->id();
            $table->string('course_material_id');
            $table->string('parent_article_id');
            $table->string('child_article_id')->nullable();
            $table->string('sub_child_article_id')->nullable();
            $table->integer('parent_article_order');
            $table->integer('child_article_order')->nullable();
            $table->integer('sub_child_article_order')->nullable();
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
        Schema::dropIfExists('tbl_course_material_menu');
    }
}
