<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Session;
use App\Orang;
use Carbon\Carbon;

class Session extends Model
{
    protected $table = 'sessions';
    public $timestamps=  false;
    protected $fillable = [
        'orangs_id',
        'token',
        'waktu'
    ];


    public function orangs(){
        return $this->belongsTo('App\Orang');
    }

    public static function login($email){
        $cek = Orang::where('email',$email)->first();
        $ins = new Session([
            'orangs_id' => $cek->id,
            'token'     => encrypt($cek->id),
            'waktu'     => Carbon::now(),
        ]);
        $cek = $ins->save();
        if($cek){
            return $ins->token;
        } else {
            return 'no';
        }

    }

    public static function update($token){
        $token = Session::where('orangs_id',(decrypt($token)))->first();
        if(!$token) return 'no';
        $waktu = Carbon::parse($token->waktu);
        $cek = Session::cek($waktu);
        if($cek == 'no'){
            return 'no';
        } else{
            $token->token = encrypt($token->orangs_id);
            $token->save();
            return $token->token;
        }
    }

    public static function cek($waktu){
        $now = Carbon::now();
        if($waktu->diffInMinutes($now) >= 30){
            return 'no';
        } else {
            return 'yes';
        }
    }


}
