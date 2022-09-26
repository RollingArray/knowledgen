<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSubjectTagToCourseMaterialQuiz extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tbl_course_material_quiz', function (Blueprint $table) {
            $table->string('subject_area_tag_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_course_material_quiz', function (Blueprint $table) {
            $table->dropColumn('subject_area_tag_id');
        });
    }
}
