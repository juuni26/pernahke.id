<?php
// react
Route::get('/{path?}', [
    'uses' => 'pernahControl@index',
    'as' => 'react',
    'where' => ['path' => '^(?!data/).*$']
]);
// tester
Route::get('tester','pernahControl@tester');
// admin post
route::post('create/provinsi','pernahControl@insProvinsi');
route::post('create/kota','pernahControl@insKota');
route::post('create/tempat','pernahControl@insTempat');
route::post('create/kategori','pernahControl@insKategori');
// admin get
route::get('data/provinsi','pernahControl@getProvinsi');
route::get('data/kota','pernahControl@getKota');
route::get('data/tempat','pernahControl@getTempat');
route::get('data/kategori','pernahControl@getKategori');
// post
route::post('register','pernahControl@register');
route::post('login','pernahControl@login');
route::post('logout','pernahControl@logout');
// token needed
route::post('like','pernahControl@like');
route::post('pengenke','pernahControl@getPengenKe');
route::post('review','pernahControl@review');
route::post('reviewvote','pernahControl@reviewPoint');
route::post('data/review','pernahControl@getReview');
route::post('create/sarantempat','pernahControl@saranTempat');
// get
route::get('/data/kota-provinsi/{id}','pernahControl@getKotaP');
route::get('/data/kota-tempat/{id}','pernahControl@getTempatK');
route::get('/data/tempat-detail/{id}','pernahControl@getTempatD');
route::get('search','pernahControl@getSearch');
route::get('data/listsearch','pernahControl@listSearch');

