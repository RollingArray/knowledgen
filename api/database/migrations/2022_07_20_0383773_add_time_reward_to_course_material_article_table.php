<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTimeRewardToCourseMaterialArticleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tbl_course_material_article', function (Blueprint $table) {
            $table->integer('article_completion_time')->default('0');
            $table->integer('article_completion_reward')->default('0');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_course_material_article', function (Blueprint $table) {
            $table->dropColumn('article_completion_time');
            $table->dropColumn('article_completion_reward');
        });
    }
}
