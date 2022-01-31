<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentAvailabilityPlanner extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_student_availability_planner', function (Blueprint $table) {
            $table->string('planner_id')->primary();
            $table->string('user_id');
            $table->date('availability_date');
            $table->time('availability_from');
            $table->time('availability_to');
            $table->longText('availability_context');
            $table->timestamps();
            
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
        Schema::dropIfExists('tbl_student_availability_planner');
    }
}
