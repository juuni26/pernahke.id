<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSaranTempatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sarans_tempats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('orangs_id');
            $table->unsignedBigInteger('kotas_id');
            $table->unsignedBigInteger('kategoris_id');
            $table->string('saran_tempat',255);
            $table->string('alamat',255);
            $table->string('gmaps');
            $table->string('deskripsi');
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
        Schema::dropIfExists('sarans_tempats');
    }
}
