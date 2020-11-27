<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Altertempat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tempats', function (Blueprint $table) {
            $table->text('foto')->change();
            $table->text('gmaps')->nullable()->change();
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
        Schema::table('tempats', function (Blueprint $table) {
            $table->string('gmaps',255)->nullable()->change();
            $table->string('foto')->change();
            $table->string('deskripsi')->change();
        });
    }
}
