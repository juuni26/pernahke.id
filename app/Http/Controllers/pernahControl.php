<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use DB;
use Carbon\Carbon;

use App\Provinsi;
use App\Kota;
use App\Tempat;
use App\Kategori;
use App\Session;
use App\Orang;
use App\PengenKe;
use App\Review;
use App\ReviewPoint;


class pernahControl extends Controller
{

    public function index(){
        return view('inputan');
    }


    public function respon($status='',$message='',$data='',$token=''){
        return response()->json([
            'status'  => $status,
            'message' => $message,
            'token'   => $token,
            'data'    => $data,
        ]);
    }

    public function tester(){
        $data = PengenKe::find(1);
    }

    public function insProvinsi(request $req){

        // if(!$req->token){
        //     return $this->respon('failed','Session habis!');
        // } else {
        //     $token = Session::update($req->token);
        //     if($token == 'no'){
        //         return $this->respon('failed','Session bermasalah!');
        //     } else {
                
        //     }

        // }

        if(!$req->nama_provinsi){
            return $this->respon('failed','Provinsi tidak boleh kosong!');
        } else{
            $provinsi = $req->nama_provinsi;
        }

        if(!$req->image_url){
            $image = '[]';
        } else {
            $image = $req->image_url;
        } 
            

        $ins = Provinsi::insProvinsi($provinsi,$image);
        if($ins == 'no') {
            return $this->respon('failed','Gagal memasukkan provinsi!');
        } else {
            return $this->respon('success','Berhasil memasukkan provinsi!',$ins,$token);
        }

    }

    public function insKota(request $req){
        if(!$req->id_provinsi){
            return $this->respon('success','Provinsi tidak boleh kosong!');
        } else{
            $provinsi = $req->id_provinsi;
        }
        if(!$req->nama_kota){
            return $this->respon('failed','Kota tidak boleh kosong!');
        } else{
            $kota = $req->nama_kota;
        }

        if(!$req->image_url){
            $image = '[]';
        } else {
            $image = $req->image_url;
        } 
            

        $ins = Kota::insKota($provinsi,$kota,$image);
        if($ins == 'no') {
            return $this->respon('failed','Gagal memasukkan kota!');
        } else {
            return $this->respon('success','Berhasil memasukkan kota!',$ins);
        }
    }

    public function insTempat(request $req){
        if(!$req->id_kota){
            return $this->respon('failed','Kota tidak boleh kosong!');
        } else{
            $kota = $req->id_kota;
        }
        if(!$req->nama_tempat){
            return $this->respon('failed','Tempat tidak boleh kosong!');
        } else{
            $tempat = $req->nama_tempat;
        }

        if(!$req->alamat){
            return $this->respon('failed','Alamat tidak boleh kosong!');
        }else{
            $alamat = $req->alamat;
        }

        if(!$req->image_url){
            $image = '[]';
        } else {
            $image = $req->image_url;
        } 

        if(!$req->biaya){
            return $this->respon('failed','Biaya tidak boleh kosong!');
        }else{
            $biaya = $req->biaya;
        }

        if(!$req->deskripsi){
            return $this->respon('failed','Deskripsi tidak boleh kosong!');
        }else{
            $deskripsi = $req->deskripsi;
        }

        if(!$req->hashtag){
            return $this->respon('failed','Hashtag tidak boleh kosong!');
        }else{
            $hashtag = $req->hashtag;
        }

        if(!$req->id_kategori){
            return $this->respon('failed','Kategori tidak boleh kosong!');
        }else{
            $kategori = $req->id_kategori;
        }


        $ins = Tempat::insTempat($kota,$tempat,$alamat,$biaya,$deskripsi,$image,$hashtag,$kategori);
        if($ins == 'no') {
            return $this->respon('failed','Gagal memasukkan tempat!');
        } else {
            $data = array(
                'tempat'        => $ins->tempat,
                'alamat'        => $ins->alamat,
                'gmaps'         => $ins->gmaps,
                'foto'          => $ins->foto,
                'biaya'         => $ins->biaya,
                'deskripsi'     => $ins->deskripsi,
                'hashtag'       => $ins->hashtag,
                'kota'          => $ins->kotas->kota,
                'kategori'      => $ins->kategoris->pluck('kategori')->toArray() 
            );
            $data = (object) $data;
            return $this->respon('success','Berhasil memasukkan tempat!',$data);
        }


    }

    public function insKategori(request $req){
        if(!$req->kategori){
            return $this->respon('failed','kategori tidak boleh kosong!');
        } else{
            $kategori = $req->kategori;
        }
            

        $ins = Kategori::insKategori($kategori);
        if($ins == 'no') {
            return $this->respon('failed','Gagal memasukkan kategori!');
        } else {
            return $this->respon('success','Berhasil memasukkan kategori!',$ins);
        }
    }

    public function getProvinsi(){
        $data = Provinsi::all();
        return response()->json([
            'data' => $data,
        ]);
    }

    public function getKota(){
        $data = Kota::all();
        return response()->json([
            'data' => $data,
        ]);
    }

    public function getKategori(){
        $data = Kategori::all();
        return response()->json([
            'data' => $data,
        ]);
    }
    public function getTempat(){
        $data = Tempat::all();
        foreach($data as $d){
            $item[]= [
                'tempat'        => $d->tempat,
                'alamat'        => $d->alamat,
                'gmaps'         => $d->gmaps,
                'foto'          => $d->foto,
                'biaya'         => $d->biaya,
                'deskripsi'     => $d->deskripsi,
                'hashtag'       => $d->hashtag,
                'kota'          => $d->kotas->kota,
                'kategori'      => $d->kategoris->pluck('kategori')->toArray() ,
            ];
        }
        return response()->json([
            'data' => $item,
        ]);
    }

    public function login(request $req){
        if(!$req->email){
            return $this->respon('failed','Email tidak ditemukan!');
        } else {
            $email = $req->email;
        }

        if(!$req->password){
            return $this->respon('failed','Password tidak boleh kosong!');
        } else {
            $password = $req->password;
        }

        $cek = Orang::where('email',$email)->first();
        if($cek){
            if(Hash::check($password, $cek->password)){
                $sess = Session::login($cek->id);

                if($sess == 'no'){
                    return $this->respon('failed','Gagal memasukkan session!');
                } else {
                    return $this->respon('success','Login sukses!',$cek->nama,$sess);
                }
            } else {
                return $this->respon('failed','Email atau Password salah!');
            } 
        } else {
            return $this->respon('failed','Email atau Password salah!');
        }

    }

    public function register(request $req){
        if(!$req->name || !$req->email || !$req->password || !$req->alamat){
            return $this->respon('failed','Data tidak boleh kosong!');
        } else{
            $nama = $req->name;
            $email = $req->email;
            $password = $req->password;
            $tempat_tinggal = $req->alamat;
            $telepon = $req->no_telp;
            $ktp = $req->ktp;
        }

        $ins = Orang::register($nama,$email,$password,$tempat_tinggal,$telepon,$ktp);
        if($ins == 'no'){
            return $this->respon('failed','Gagal register!');
        } else{
            return $this->respon('success','Berhasil melakukan register, Silahkan melakukan login!');            
        }

    }

    public function logout(request $req){
        if(!$req->token) return $this->respon('failed','Gagal logout!');
        $token = $req->token;
        $out = Session::where('orangs_id',decrypt($token))->first();
        if (!$out) return $this->respon('failed','Gagal logout!');
        $out->waktu = null;
        $cek = $out->save();
        if($cek){
            return $this->respon('success','Berhasil logout!');
        } else{
            return $this->respon('failed','Gagal logout!');
        }
    }

    public function getKotaP($id){
        if(!$id) return $this->respon('failed','Provinsi tidak ditemukan!');
        $kota = Kota::where('provinsis_id',$id)->get();
        $provinsi = Provinsi::find($id);
        if($kota->isEmpty()) return $this->respon('failed','Provinsi tidak ditemukan!');
        return $this->respon('success','Berikut kota yang ada di provinsi '.strtoupper($provinsi),$kota);
    }

    public function getTempatK($id){
        if(!$id) return $this->respon('failed','Kota tidak ditemukan!');
        $tempat = Tempat::where('kotas_id',$id)->get();
        $kota = Kota::find($id);
        if($tempat->isEmpty()) return $this->respon('failed','Kota tidak ditemukan!');
        return $this->respon('success','Berikut tempat yang ada di kota '.strtoupper($kota),$tempat);
    }

    public function getTempatD($id){
        if(!$id) {
            return $this->respon('failed','Tempat tidak ditemukan!');
        }

        $data = Tempat::find($id);

        if(!$data){
            return $this->respon('failed','Tempat tidak ditemukan!');
        } 
            
        $item[]= [
            'tempat'        => $data->tempat,
            'alamat'        => $data->alamat,
            'gmaps'         => $data->gmaps,
            'foto'          => $data->foto,
            'biaya'         => $data->biaya,
            'deskripsi'     => $data->deskripsi,
            'hashtag'       => $data->hashtag,
            'kota'          => $data->kotas->kota,
            'kategori'      => $data->kategoris->pluck('kategori')->toArray(),
        ];
        return $this->respon('success','Berikut detail tempat '.strtoupper($data->tempat),$item);

    }

    public function getSearch(request $req){
        
        $search = $req->search;
        $explode = explode(" ",$search);
        if($search){
            foreach($explode as $d){
                $kata = '%'.$d.'%';
                $item = Tempat::where('hashtag','like',$kata)->orWhere('tempat','like',$kata)->get();
                $item = $item->merge($item);
                
            }
        } else {
            $item = Tempat::all();
        }

        return $this->respon('success','',$item);

    }

    public function listSearch(){
        $item_hashtag = [];
        $i=0;
        $hashtag = Tempat::all()->pluck('hashtag')->toArray();
        foreach($hashtag as $h){
            $hash = explode(',',$h);
            if(count($hash)>1){
                foreach($hash as $h){
                    $item_hashtag[] = $h;
                }
            } else{
                $item_hashtag[] = $hash[0];
            }
        }
        $kategori = Kategori::all()->pluck('kategori')->toArray();
        $data = array_unique(array_merge($item_hashtag,$kategori));
        if(count($data) >0){
         sort($data);         
            return $this->respon('success','',(object)$data);
        } else{
            return $this->respon('success','Tidak ada data!',[]);
        }

    }

    public function like(request $req){
        if($req->token) {
            $cek = Session::cekToken($req->token);
            if($cek == 'no'){
                return $this->respon('failed','Waktu login anda habis!');
            } 
            $update = Session::updateToken($req->token);
            if($update == 'no'){
                return $this->respon('failed','Anda harus login ulang!');
            }
            $token = $update;
        } else{
            return $this->respon('failed','Anda harus login terlebih dahulu!');
        }
        if(!$req->tempat){
            return $this->respon('failed','Tidak ada tempat yang dipilih!');
        } else $tempat = $req->tempat;

        if(!$req->status){
            return $this->respon('failed','Error!');
        } else $status = $req->status;

        $ins = PengenKe::like($token,$tempat,$status);
        if($ins == 'no'){
            return $this->respon('failed','Gagal like tempat!');
        } else {
            if($status == 'active'){
                return $this->respon('success','Semoga anda bisa kesini!','',$token);
            } else {
                return $this->respon('success','Mengapa anda tidak mau kesini?','',$token);
            }
        }


    }

    public function getPengenke(request $req){
        if($req->token) {
            $cek = Session::cekToken($req->token);
            if($cek == 'no'){
                return $this->respon('failed','Waktu login anda habis!');
            } 
            $update = Session::updateToken($req->token);
            if($update == 'no'){
                return $this->respon('failed','Anda harus login ulang!');
            }
            $token = $update;
        } else{
            return $this->respon('failed','Anda harus login terlebih dahulu!');
        }

        $data = Pengenke::where('orangs_id',decrypt($req->token))->where('tempats_id',$req->tempat)->first();
        $count = PengenKe::where('tempats_id',$req->tempat)->where('status',1)->count();
        if($data){
            $item = [
                'status' => $data->status,
                'total'  => $count,
            ];
            $item = (object)$item;
        } else {
            $item = [];
            $item = (object)$item;
        }
        if($data){
            return $this->respon('success','',$item,$token);
        } else{
            return $this->respon('failed','Tidak bisa kesini!');
        }
    }

    public function review(request $req){
        if($req->token) {
            $cek = Session::cekToken($req->token);
            if($cek == 'no'){
                return $this->respon('failed','Waktu login anda habis!');
            } 
            $update = Session::updateToken($req->token);
            if($update == 'no'){
                return $this->respon('failed','Anda harus login ulang!');
            }
            $token = $update;
        } else{
            return $this->respon('failed','Anda harus login terlebih dahulu!');
        }


        $review = $req->review;
        $orang_id = decrypt($token);
        $rating = $req->rating;
        $foto = $req->foto;
        $tempat_id = $req->tempat;

        if(!$review || !$tempat_id){
            return $this->respon('failed','Masukkan review anda!');
        }

        $ins = Review::ins($orang_id,$review,$tempat_id);
        if($ins == 'yes'){
            return $this->respon('success','Terima kasih atas sharing anda!','',$token);
        } else {
            return $this->respon('failed','Gagal sharing!');
        }

    }

    public function reviewPoint(request $req){
        if($req->token) {
            $cek = Session::cekToken($req->token);
            if($cek == 'no'){
                return $this->respon('failed','Waktu login anda habis!');
            } 
            $update = Session::updateToken($req->token);
            if($update == 'no'){
                return $this->respon('failed','Anda harus login ulang!');
            }
            $token = $update;
        } else{
            return $this->respon('failed','Anda harus login terlebih dahulu!');
        }

        $vote = $req->vote;
        $review_id = $req->review_id;
        if(!$vote){
            return $this->respon('failed','Anda belum vote!');
        }

        $ins = ReviewPoint::ins(decrypt($token),$vote,$review_id);
        if($ins == 'yes'){
            return $this->respon('success','Terima kasih atas vote anda!');
        } else {
            return $this->respon('failed','Gagal vote!');
        }
    }

    public function getReview(request $req){
        $id = $req->tempat;
        if($req->token) {
            $cek = Session::cekToken($req->token);
            if($cek == 'no'){
                return $this->respon('failed','Waktu login anda habis!');
            } 
            $update = Session::updateToken($req->token);
            if($update == 'no'){
                return $this->respon('failed','Anda harus login ulang!');
            }
            $token = $update;
        } else {
            return $this->respon('no_token');
        }
        $orang = decrypt($req->token);
        



        if(!$id) return $this->respon('failed','Tidak ada data!');
        $data = Review::where('tempats_id',$id)->get();
        $item = [];
        if($data->isEmpty()) return $this->respon('success','Tidak ada data!',$item);
        
        $i=0;
        foreach($data as $d ){
            $total = ReviewPoint::where('reviews_id',$d->id)->sum('review_point');
            $vote = ReviewPoint::where('reviews_id',$d->id)->where('orangs_id',$orang)->first();
            if($vote){
                $vote = $vote->review_point;
                if($vote == 1) $vote = 'up';
                else if($vote == -1) $vote = 'down';
                else $vote = 'nothing';
            }
            $item[$i] = [
                'id'                => $d->id,
                'nama'              => $d->orangs->nama,
                'asal'              => $d->orangs->tempat_tinggal,
                'foto'              => $d->orangs->foto,
                'review'            => $d->review,
                'vote'              => $vote,
                'total'             => $total,
            ];
            $i++;
        }
        if(count($item) > 0){
            return $this->respon('success','',($item));
        } else {
            $item = [];
            return $this->respon('failed','Tidak dapat mengambil data!',$item);
        }
    }


}
