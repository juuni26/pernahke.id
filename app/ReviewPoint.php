<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\ReviewPoint;

class ReviewPoint extends Model
{
    protected $table = 'review_points';
    protected $fillable = [
        'orangs_id',
        'review_point',
        'reviews_id',
    ];

    public function reviews(){
        return $this->belongsTo('App\Review');
    }

    public function orangs(){
        return $this->belongsTo('App\Orang');
    }


    public static function ins($id,$vote,$review_id){
        if($vote == 'up') $vote = 1;
        else if($vote == 'nothing') $vote = 0;
        else if($vote == 'down') $vote = -1;
        else return 'no';

        $unique = ReviewPoint::where('orangs_id',$id)->where('reviews_id',$review_id)->first();
        if($unique){
            $unique->review_point = $vote;
            $unique->save();
            return 'yes';
        }


        $ins = new ReviewPoint([
            'orangs_id'    => $id,
            'review_point' => $vote,
            'reviews_id'   => $review_id
        ]);

        $cek = $ins->save();
        if($cek) return 'yes';
        else return 'no';
    }
}
