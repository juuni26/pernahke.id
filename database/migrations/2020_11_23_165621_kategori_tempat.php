<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class KategoriTempat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kategoris_tempats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('kategoris_id');
            $table->unsignedBigInteger('tempats_id');
            $table->timestamps();

            $table->foreign('kategoris_id')
                ->references('id')
                ->on('kategoris')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('tempats_id')
                ->references('id')
                ->on('tempats')
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
        Schema::dropIfExists('kategoris_tempats');
    }
}
