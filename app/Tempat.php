<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Tempat;

class Tempat extends Model
{
    protected $table = 'tempats';
    protected $fillable = [
        'tempat',
        'kotas_id',
        'alamat',
        'gmaps',
        'foto',
        'biaya',
        'deskripsi',
        'hashtag'
    ];

    public function kategoris(){
        return $this->belongsToMany(
            Kategori::class,
            'kategoris_tempats',
            'tempats_id',
            'kategoris_id'
        );
    }

    public function kotas(){
        return $this->belongsTo('App\Kota');
    }

    public static function insTempat($kota,$tempat,$alamat,$biaya,$deskripsi,$image,$hashtag,$kategori,$gmaps = NULL){
        
        $ins = new Tempat([
            'tempat'            =>$tempat,
            'kotas_id'          =>$kota,
            'alamat'            =>$alamat,
            'gmaps'             =>$gmaps,
            'foto'              =>$image,
            'biaya'             =>$biaya,
            'deskripsi'         =>$deskripsi,
            'hashtag'           =>$hashtag,
        ]);
        $check = $ins->save();
        $ins->kategoris()->attach(explode(',',$kategori));
        if($check){
            return $ins;
        } else {
            return 'no';
        }
    }
}
