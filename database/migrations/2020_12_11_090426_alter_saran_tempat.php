<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterSaranTempat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sarans_tempats', function (Blueprint $table) {
            
        $table->string('gmaps')->nullable()->change();
        $table->longText('deskripsi')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sarans_tempats', function (Blueprint $table) {
            $table->string('gmaps');
            $table->string('deskripsi');
        });
    }
}
