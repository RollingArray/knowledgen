<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoreSubjectArea extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_core_subject_area', function (Blueprint $table) {
            $table->string('subject_area_id')->primary();
            $table->string('subject_area_name');
            $table->timestamps();
            
            $table->index(['subject_area_name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_core_subject_area');
    }
}