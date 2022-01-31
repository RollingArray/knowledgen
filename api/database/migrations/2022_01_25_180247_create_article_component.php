<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticleComponent extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_article_component', function (Blueprint $table) {
            $table->string('article_component_id')->primary();
            $table->string('article_id');
            $table->integer('article_component_order');
            $table->string('article_component_type');
            $table->longText('article_component_content');
            $table->timestamps();
            
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
        Schema::dropIfExists('tbl_article_component');
    }


}
