<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Orang;
use App\PengenKe;

class PengenKe extends Model
{
    protected $table = "pengen_kes";
    protected $fillable = [
        'orangs_id',
        'tempats_id',
        'status'
    ];



    public function orangs(){
        return $this->belongsTo('App\Orang');
    }

    public function tempats(){
        return $this->belongsTo('App\Tempat');
    }

    public static function like($token,$tempat_id,$status){
        if(!$token || !$tempat_id || !$status) return 'no';
        if($status == 'active') $status = 1;
        else if($status == 'inactive') $status = 0;
        else return 'no';

        $update = PengenKe::where('tempats_id',$tempat_id)->where('orangs_id',decrypt($token))->first();
        if($update){
            $update->status = $status;
            $update->save();
            return 'yes';
        }

        $ins = new PengenKe([
            'orangs_id' => decrypt($token),
            'tempats_id'=> $tempat_id,
            'status'    => $status,
        ]);
        $ins->save();
        return 'yes';
    }
}
