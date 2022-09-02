<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseMaterialArticleRevision extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_course_material_article_revision', function (Blueprint $table) {
            $table->string('article_revision_id')->primary();
            $table->string('article_id');
            $table->string('user_id');
            $table->string('article_revision_date');
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
        Schema::dropIfExists('tbl_course_material_article_revision');
    }
}
