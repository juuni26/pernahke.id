<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReviewPointsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('review_points', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('orangs_id');            
            $table->unsignedBigInteger('reviews_id');
            $table->integer('review_point');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('review_points');
    }
}
