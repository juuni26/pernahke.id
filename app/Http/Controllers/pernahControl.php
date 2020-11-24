<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Provinsi;
use App\Kota;

class pernahControl extends Controller
{
    public function insProvinsi(request $req){

        if(!$req->nama_provinsi){
            return response()->json([
                'status'  => 'error',
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
                'status'  => 'error',
                'message' => 'Gagal memasukkan provinsi!'
            ]);
        } else {
            return response()->json([
                'status'  => 'success',
                'message' => 'Berhasil memasukkan provinsi!'
            ]);
        }

    }

    public function insKota(request $req){
        if(!$req->nama_provinsi){
            return response()->json([
                'status'  => 'error',
                'message' => 'Provinsi tidak boleh kosong!'
            ]);
        } else{
            $provinsi = $req->nama_provinsi;
        }
        if(!$req->nama_kota){
            return response()->json([
                'status'  => 'error',
                'message' => 'Provinsi tidak boleh kosong!'
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
                'status'  => 'error',
                'message' => 'Gagal memasukkan kota!'
            ]);
        } else {
            return response()->json([
                'status'  => 'success',
                'message' => 'Berhasil memasukkan kota!'
            ]);
        }
    }
}
