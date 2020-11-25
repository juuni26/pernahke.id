<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('inputan', function () {
    return view('inputan');
});

route::post('create/provinsi','pernahControl@insProvinsi');
route::post('create/kota','pernahControl@insKota');
route::post('create/tempat','pernahControl@insTempat');
route::post('create/kategori','pernahControl@insKategori');

route::get('data/provinsi','pernahControl@getProvinsi');
route::get('data/kota','pernahControl@getKota');
route::get('data/tempat','pernahControl@getTempat');
route::get('data/kategori','pernahControl@getKategori');

