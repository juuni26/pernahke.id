<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterSaranTempat2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sarans_tempats', function (Blueprint $table) {
            $table->dropColumn('kategoris_id');
            $table->string('kategori');
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
            $table->dropColumn('kategori');
            $table->unsignedBigInteger('kategoris_id');
        });
    }
}
