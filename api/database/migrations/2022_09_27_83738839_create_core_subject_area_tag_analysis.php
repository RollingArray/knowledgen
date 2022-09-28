<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoreSubjectAreaTagAnalysis extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_tag_analysis', function (Blueprint $table) {
            $table->string('tag_analysis_id')->primary();
            $table->string('subject_area_tag_id');
            $table->integer('weak_area_analysis')->default(0);
            $table->integer('strong_area_analysis')->default(0);
            $table->string('user_id');
            $table->timestamps();

            $table->foreign('user_id')
                ->references('user_id')
                ->on('tbl_users');
            
            $table->foreign('subject_area_tag_id')
                ->references('subject_area_tag_id')
                ->on('tbl_core_subject_area_tag');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_tag_analysis');
    }
}