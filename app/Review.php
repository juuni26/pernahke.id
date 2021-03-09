<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Review;

class Review extends Model
{
    protected $table = 'reviews';
    protected $fillable = [
        'review',
        'orangs_id',
        'tempats_id',
        'rating',
        'foto',
    ];

    public function review_points(){
        return $this->hasMany('App\ReviewPoint');
    }

    public function orangs(){
        return $this->belongsTo('App\Orang');
    }

    public static function ins($id,$review,$tempat_id,$rating=null,$foto=''){
        $ins = new Review ([
            'orangs_id' => $id,
            'review'    => $review,
            'rating'    => $rating,
            'tempats_id'=> $tempat_id,
            'foto'      => $foto,
        ]);
        $cek = $ins->save();
        if($cek){
            return 'yes';
        } else {
            return 'no';
        }
    }
}
