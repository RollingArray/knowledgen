<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAllowedIterationToCourseMaterialArticleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tbl_course_material_article', function (Blueprint $table) {
            $table->integer('article_allowed_iteration')->default('-1');
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
            $table->dropColumn('article_allowed_iteration');
        });
    }
}
