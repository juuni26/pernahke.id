<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SaranTempat extends Model
{
    protected $table = 'sarans_tempats';
    protected $fillable = [
        'orangs_id',
        'kotas_id',
        'kategori',
        'saran_tempat',
        'alamat',
        'gmaps',
        'deskripsi',
    ];

    public static function ins($orang,$kota,$tempat,$alamat,$deskripsi,$kategori,$gmaps=''){
        $ins = new SaranTempat([
            'orangs_id'     => $orang,
            'kotas_id'      => $kota,
            'kategori'      => $kategori,
            'saran_tempat'  => $tempat,
            'alamat'        => $alamat,
            'gmaps'         => $gmaps,
            'deskripsi'     => $deskripsi
        ]);
        $cek = $ins->save();
        if($cek){
            return 'yes';
        } else return 'no';
    }
}
