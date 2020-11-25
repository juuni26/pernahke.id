<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Provinsi;

class Provinsi extends Model
{
    protected $table = 'provinsis';
    protected $fillable = [
        'provinsi',
        'foto',
    ];
    
    public function kotas(){
        return $this->hasMany('App\Kota');
    }

    public static function insProvinsi($prov,$image){
        $ins = new Provinsi([
            'provinsi' => $prov,
            'foto'     => $image,
        ]);
        $check = $ins->save();
        if(!$check){
            return 'no';
        } else {
            return $ins;
        }
    }
}
