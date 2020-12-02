<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use DB;

use App\Provinsi;
use App\Kota;
use App\Tempat;
use App\Kategori;
use App\Session;

class pernahControl extends Controller
{

    public function respon($status='',$message='',$data='',$token=''){
        return response()->json([
            'status'  => $status,
            'message' => $message,
            'token'   => $token,
            'data'    => $data,
        ]);
    }

    public function insProvinsi(request $req){

        if(!$req->token){
            $this->respon('failed','Session habis!');
        } else {
            $token = Session::update($req->token);
            if($token == 'no'){
                $this->respon('failed','Session bermasalah!');
            } else {
                
            }

        }

        if(!$req->nama_provinsi){
            $this->respon('failed','Provinsi tidak boleh kosong!');
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
            $this->respon('failed','Gagal memasukkan provinsi!');
        } else {
            $this->respon('success','Berhasil memasukkan provinsi!',$ins,$token);
        }

    }

    public function insKota(request $req){
        if(!$req->id_provinsi){
            $this->respon('success','Provinsi tidak boleh kosong!');
        } else{
            $provinsi = $req->id_provinsi;
        }
        if(!$req->nama_kota){
            $this->respon('failed','Kota tidak boleh kosong!');
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
            $this->respon('failed','Gagal memasukkan kota!');
        } else {
            $this->respon('success','Berhasil memasukkan kota!',$ins);
        }
    }

    public function insTempat(request $req){
        if(!$req->id_kota){
            $this->respon('failed','Kota tidak boleh kosong!');
        } else{
            $kota = $req->id_kota;
        }
        if(!$req->nama_tempat){
            $this->respon('failed','Tempat tidak boleh kosong!');
        } else{
            $tempat = $req->nama_tempat;
        }

        if(!$req->alamat){
            $this->respon('failed','Alamat tidak boleh kosong!');
        }else{
            $alamat = $req->alamat;
        }

        if(!$req->image_url){
            $image = '[]';
        } else {
            $image = $req->image_url;
        } 

        if(!$req->biaya){
            $this->respon('failed','Biaya tidak boleh kosong!');
        }else{
            $biaya = $req->biaya;
        }

        if(!$req->deskripsi){
            $this->respon('failed','Deskripsi tidak boleh kosong!');
        }else{
            $deskripsi = $req->deskripsi;
        }

        if(!$req->hashtag){
            $this->respon('failed','Hashtag tidak boleh kosong!');
        }else{
            $hashtag = $req->hashtag;
        }

        if(!$req->id_kategori){
            $this->respon('failed','Kategori tidak boleh kosong!');
        }else{
            $kategori = $req->id_kategori;
        }


        $ins = Tempat::insTempat($kota,$tempat,$alamat,$biaya,$deskripsi,$image,$hashtag,$kategori);
        if($ins == 'no') {
            $this->respon('failed','Gagal memasukkan tempat!');
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
            $this->respon('success','Berhasil memasukkan tempat!',$data);
        }


    }

    public function insKategori(request $req){
        if(!$req->kategori){
            $this->respon('failed','kategori tidak boleh kosong!');
        } else{
            $kategori = $req->kategori;
        }
            

        $ins = Kategori::insKategori($kategori);
        if($ins == 'no') {
            $this->respon('failed','Gagal memasukkan kategori!');
        } else {
            $this->respon('success','Berhasil memasukkan kategori!',$ins);
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
            $this->respon('failed','Email tidak ditemukan!');
        } else {
            $email = $req->email;
        }

        if(!$req->password){
            $this->respon('failed','Password tidak boleh kosong!');
        } else {
            $password = $req->password;
        }

        $cek = Orang::where('email',$email)->first();
        if(!$cek){
            if(Hash::check($password, $cek->password)){
                $sess = Session::login($email);
                if($sess == 'no'){
                    $this->respon('failed','Gagal memasukkan session!');
                } else {
                    $this->respon('success','Login sukses!','',$sess);
                }
            } else {
                $this->respon('failed','Email atau Password salah!');
            } 
        } else {
            $this->respon('failed','Email atau Password salah!');
        }

    }

}
