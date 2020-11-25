<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTempatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tempats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('tempat',255);
            $table->string('alamat',255);
            $table->string('gmaps',255)->nullable();
            $table->string('foto');
            $table->string('biaya');
            $table->string('deskripsi');
            $table->string('hashtag');
            $table->unsignedBigInteger('kotas_id');
            $table->timestamps();


            $table->foreign('kotas_id')->references('id')->on('kotas')
            ->onDelete('cascade')
            ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tempats');
    }
}
