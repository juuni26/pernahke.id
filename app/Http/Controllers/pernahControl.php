<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Provinsi;
use App\Kota;
use App\Tempat;
use App\Kategori;

class pernahControl extends Controller
{
    public function insProvinsi(request $req){

        if(!$req->nama_provinsi){
            return response()->json([
                'status'  => 'failed',
                'message' => 'Provinsi tidak boleh kosong!'
            ]);
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
            return response()->json([
                'status'  => 'failed',
                'message' => 'Gagal memasukkan provinsi!',
            ]);
        } else {
            return response()->json([
                'status'  => 'success',
                'message' => 'Berhasil memasukkan provinsi!',
                'id'      => $ins,
            ]);
        }

    }

    public function insKota(request $req){
        if(!$req->id_provinsi){
            return response()->json([
                'status'  => 'failed',
                'message' => 'Provinsi tidak boleh kosong!'
            ]);
        } else{
            $provinsi = $req->id_provinsi;
        }
        if(!$req->nama_kota){
            return response()->json([
                'status'  => 'failed',
                'message' => 'Kota tidak boleh kosong!'
            ]);
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
            return response()->json([
                'status'  => 'failed',
                'message' => 'Gagal memasukkan kota!'
            ]);
        } else {
            return response()->json([
                'status'  => 'success',
                'message' => 'Berhasil memasukkan kota!',
                'id'      => $ins,
            ]);
        }
    }

    public function insTempat(request $req){
        if(!$req->id_kota){
            return response()->json([
                'status'  => 'failed',
                'message' => 'Kota tidak boleh kosong!'
            ]);
        } else{
            $kota = $req->id_kota;
        }
        if(!$req->nama_tempat){
            return response()->json([
                'status'  => 'failed',
                'message' => 'Provinsi tidak boleh kosong!'
            ]);
        } else{
            $tempat = $req->nama_tempat;
        }

        if(!$req->alamat){
            return response()->json([
                'status'  => 'failed',
                'message' => 'Alamat tidak boleh kosong!'
            ]);
        }else{
            $alamat = $req->alamat;
        }

        if(!$req->image_url){
            $image = '[]';
        } else {
            $image = $req->image_url;
        } 

        if(!$req->budget){
            return response()->json([
                'status'  => 'failed',
                'message' => 'Budget tidak boleh kosong!'
            ]);
        }else{
            $biaya = $req->budget;
        }

        if(!$req->deskripsi){
            return response()->json([
                'status'  => 'failed',
                'message' => 'Deskripsi tidak boleh kosong!'
            ]);
        }else{
            $deskripsi = $req->deskripsi;
        }

        if(!$req->hashtag){
            return response()->json([
                'status'  => 'failed',
                'message' => 'Hashtag tidak boleh kosong!'
            ]);
        }else{
            $hashtag = $req->hashtag;
        }

        if(!$req->id_kategori){
            return response()->json([
                'status'  => 'failed',
                'message' => 'Kategori tidak boleh kosong!'
            ]);
        }else{
            $kategori = $req->id_kategori;
        }


        $ins = Tempat::insTempat($kota,$tempat,$alamat,$biaya,$deskripsi,$image,$hashtag,$kategori);
        if($ins == 'no') {
            return response()->json([
                'status'  => 'failed',
                'message' => 'Gagal memasukkan tempat!'
            ]);
        } else {
            return response()->json([
                'status'  => 'success',
                'message' => 'Berhasil memasukkan tempat!',
            ]);
        }


    }

    public function insKategori(request $req){
        if(!$req->kategori){
            return response()->json([
                'status'  => 'failed',
                'message' => 'kategori tidak boleh kosong!'
            ]);
        } else{
            $kategori = $req->kategori;
        }
            

        $ins = Kategori::insKategori($kategori);
        if($ins == 'no') {
            return response()->json([
                'status'  => 'failed',
                'message' => 'Gagal memasukkan kategori!',
            ]);
        } else {
            return response()->json([
                'status'  => 'success',
                'message' => 'Berhasil memasukkan kategori!',
                'id'      => $ins,
            ]);
        }
    }
}
