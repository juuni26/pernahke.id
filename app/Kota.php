<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Kota;

class Kota extends Model
{
    protected $table = 'kotas';
    protected $fillable = [
        'kota',
        'provinsis_id',
        'foto'
    ];

    public function provinsis(){
        return $this->belongsTo('App\Provinsi');
    }

    public static function insKota($prov,$kota,$image){
        
        $ins = new Kota([
            'kota'          => $kota,
            'provinsis_id'  => $prov,
            'foto'          => $image,
        ]);
        $check = $ins->save();

        if($check){
            return $ins;
        } else {
            return 'no';
        }
    }
}
