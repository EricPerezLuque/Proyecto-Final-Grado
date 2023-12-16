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
/*
Route::get('/', function () {
    return view('welcome');
});
*/

Auth::routes(['verify' => true]);

Route::get('/','AudiosController@index');
Route::get('/mis_audios', 'AudiosController@misAudios');

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/logout_storage', 'AudiosController@logoutLocalStorage');
Route::get('/login_storage', 'AudiosController@loginLocalStorage');

Route::post('/logout', '\App\Http\Controllers\Auth\LoginController@logout');

Route::post('/nuevo_sonido/{id}', 'AudiosController@nuevoSonido');
Route::delete('/eliminar_audio/{id}', 'AudiosController@eliminarAudio');
Route::put('/editar_nombre_audio/{id}', 'AudiosController@editarNombreAudio');