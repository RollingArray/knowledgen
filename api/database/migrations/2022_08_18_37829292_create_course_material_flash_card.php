<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseMaterialFlashCard extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_course_material_flash_card', function (Blueprint $table) {
            $table->string('card_id')->primary();
            $table->string('article_id');
            $table->string('front_media_type');
            $table->string('front_media');
            $table->longText('front_content');
            $table->string('back_media_type');
            $table->string('back_media');
            $table->longText('back_content');
            $table->longText('back_content_more');
            $table->timestamps();
            
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
        Schema::dropIfExists('tbl_course_material_flash_card');
    }
}