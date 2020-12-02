<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orang extends Model
{
    protected $table = 'orangs';
    protected $fillable = [
        'nama',
        'email',
        'password',
        'tempat_tinggal',
        'telepon',
        'ktp'
    ];


    public function sessions(){
        return $this->hasOne('App\Session');
    }
}
