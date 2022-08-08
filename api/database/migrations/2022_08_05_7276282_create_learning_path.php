<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLearningPath extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_learning_path', function (Blueprint $table) {
            $table->string('course_material_id');
            $table->string('user_id');
            $table->timestamps();
            $table->index([
                'user_id',
                'course_material_id']
            );

            $table->foreign('user_id')
                ->references('user_id')
                ->on('tbl_users')
                ->onDelete('cascade');
            
            $table->foreign('course_material_id')
                ->references('course_material_id')
                ->on('tbl_course_material')
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
        Schema::dropIfExists('tbl_learning_path');
    }
}
