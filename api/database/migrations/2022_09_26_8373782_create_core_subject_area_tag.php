<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoreSubjectAreaTag extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_core_subject_area_tag', function (Blueprint $table) {
            $table->string('subject_area_tag_id')->primary();
            $table->string('subject_area_id');
            $table->string('subject_area_tag_name');
            $table->timestamps();
            
            $table->index(['subject_area_tag_name']);

            $table->foreign('subject_area_id')
                ->references('subject_area_id')
                ->on('tbl_core_subject_area');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_core_subject_area_tag');
    }
}