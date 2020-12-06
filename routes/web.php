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

// Route::get('/', function () {  
//     return view('welcome');
// });

// Route::get('{/?}', function () {
//     return view('inputan');
// });

Route::get('/{path?}', [
    'uses' => 'pernahControl@index',
    'as' => 'react',
    // 'where' => ['path' => '.*']
    'where' => ['path' => '^(?!data/).*$']

]);


Route::get('tester','pernahControl@tester');

route::post('create/provinsi','pernahControl@insProvinsi');
route::post('create/kota','pernahControl@insKota');
route::post('create/tempat','pernahControl@insTempat');
route::post('create/kategori','pernahControl@insKategori');
route::post('register','pernahControl@register');
route::post('login','pernahControl@login');
route::post('logout','pernahControl@logout');


route::get('data/provinsi','pernahControl@getProvinsi');
route::get('data/kota','pernahControl@getKota');
route::get('data/tempat','pernahControl@getTempat');
route::get('data/kategori','pernahControl@getKategori');
route::get('/data/kota-provinsi/{id}','pernahControl@getKotaP');
route::get('/data/kota-tempat/{id}','pernahControl@getTempatK');
route::get('/data/tempat-detail/{id}','pernahControl@getTempatD');
route::get('search','pernahControl@getSearch');
