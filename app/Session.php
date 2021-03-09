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

    public static function register($id){
        $cek = Orang::find($id);
        if(!$cek) return 'no';
        $ins = new Session([
            'orangs_id' => $cek->id,
            'token'     => encrypt($cek->id),
            'waktu'     => null,
        ]);
        $cek = $ins->save();
        if($cek){
            return 'yes';
        } else {
            return 'no';
        }

    }

    public static function login($id){
        if(!$id) return 'no';
        $cek = Session::updateToken(encrypt($id));
        if($cek == 'no') return 'no';

        return encrypt($id);
    }

    public static function cekToken($token){
        if(!$token) return 'no';
        try{
            $tes = decrypt($token);
        } catch(\Exception $e){
            return 'no';
        }
        $token = Session::where('orangs_id',(decrypt($token)))->first();
        if(!$token) return 'no';
        if(!$token->waktu){
            $waktu = Carbon::now();
            $token->waktu = $waktu;
        } else{
            $waktu = Carbon::parse($token->waktu);
        }
        $now = Carbon::now();
        if($waktu->diffInDays($now) >= 1){
            return 'no';
        } else {
            $token->save();
            return 'yes';
        }
    }

    public static function updateToken($token){
        if(!$token) return 'no';
        try{
            $tes = decrypt($token);
        } catch(\Exception $e){
            return 'no';
        }
        $token = Session::where('orangs_id',(decrypt($token)))->first();
        if(!$token) return 'no';
        $token->waktu = Carbon::now();
        $cek = $token->save();
        if($cek){
            return encrypt($token->orangs_id);
        } else{
            return 'no';
        }
    }

    


}
