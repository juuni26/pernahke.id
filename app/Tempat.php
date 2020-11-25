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

        if($check){
            return 'yes';
        } else {
            return 'no';
        }
    }
}
