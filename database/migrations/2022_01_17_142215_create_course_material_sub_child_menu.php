<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseMaterialSubChildMenu extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_course_material_sub_child_menu', function (Blueprint $table) {
            $table->string('sub_child_article_id')->primary();
            $table->string('child_article_id');
            $table->integer('sub_child_article_order');
            $table->string('course_material_id');
            
            $table->timestamps();
            
            $table->foreign('course_material_id')
                ->references('course_material_id')
                ->on('tbl_course_material')
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
        Schema::dropIfExists('tbl_course_material_sub_child_menu');
    }
}
