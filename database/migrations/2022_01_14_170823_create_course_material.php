<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseMaterial extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_course_material', function (Blueprint $table) {
            $table->string('course_material_id')->primary();
            $table->string('user_id');
            $table->string('course_material_name');
            $table->longText('course_material_description');
            $table->timestamps();
            $table->index(['course_material_name']);
            
            $table->foreign('user_id')
                ->references('user_id')
                ->on('tbl_users')
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
        Schema::dropIfExists('tbl_course_material');
    }
}