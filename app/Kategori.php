<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Kategori;

class Kategori extends Model
{
    protected $table = 'kategoris';
    protected $fillable = [
        'kategori',
    ];

    public static function insProvinsi($kategori){
        $ins = new Provinsi([
            'kategori' => $kategori,
        ]);
        $check = $ins->save();

        if(!$check){
            return 'no';
        } else {
            return $ins->id;
        }
    }
}
