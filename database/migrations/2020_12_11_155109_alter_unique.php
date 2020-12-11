<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUnique extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('provinsis', function (Blueprint $table) {$table->unique(['provinsi']);});
        Schema::table('kotas', function (Blueprint $table) {$table->unique(['kota']);});
        Schema::table('kategoris', function (Blueprint $table) {$table->unique(['kategori']);});
        Schema::table('tempats', function (Blueprint $table) {$table->string('tempat',100)->change();$table->unique(['tempat','kotas_id']);});
        Schema::table('orangs', function (Blueprint $table) {$table->unique(['email']);});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('provinsis', function (Blueprint $table) {$table->dropUnique(['provinsi']);});
        Schema::table('kotas', function (Blueprint $table) {$table->dropUnique(['kota']);});
        Schema::table('kategoris', function (Blueprint $table) {$table->dropUnique(['kategori']);});
        Schema::table('tempats', function (Blueprint $table) {$table->dropUnique(['tempat','kotas_id']);});
        Schema::table('orangs', function (Blueprint $table) {$table->dropUnique(['email']);});
    }
}
