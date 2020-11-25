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

    public function tempats(){
        return $this->belongsToMany(
            Tempat::class,
            'kategoris_tempats',
            'kategoris_id',
            'tempats_id'
        );
        
    }

    public static function insKategori($kategori){
        $ins = new Kategori([
            'kategori' => $kategori,
        ]);
        $check = $ins->save();

        if(!$check){
            return 'no';
        } else {
            return $ins;
        }
    }
}
