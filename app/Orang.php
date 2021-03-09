<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use App\Orang;
use App\Session;

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

    public function pengenkes(){
        return $this->hasMany('App\PengenKe');
    }

    public function review_points(){
        return $this->hasMany('App\ReviewPoint');
    }

    public function reviews(){
        return $this->hasMany('App\Review');
    }

    public static function register($nama,$email,$password,$tempat_tinggal,$telepon,$ktp){
        $ins = new Orang([
            'nama' => $nama,
            'email' => $email,
            'password' => Hash::make($password),
            'tempat_tinggal' => $tempat_tinggal,
            'telepon' => $telepon,
            'ktp' => $ktp
        ]);
        $cek = $ins->save();
        if($cek){
            $sess = Session::register($ins->id);
            if($sess == 'no') $this->respon('failed','Gagal Register!');
            return 'yes';
        } else {
            return 'no';
        }
    }
}
