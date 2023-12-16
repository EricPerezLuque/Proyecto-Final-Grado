<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

use App\Http\Requests\NuevoSonidoRequest;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\audios;
use Auth;

class AudiosController extends Controller
{
    public function index(){
        if (Auth::user()) {
            $ListaAudios = DB::table('audios')->where('id_usuario', 1)->orWhere('id_usuario', Auth::user()->id)->get();
            return view('index', compact('ListaAudios'));
        }
        else{
            $ListaAudios = DB::table('audios')->where('id_usuario', 1)->get();
            return view('index', compact('ListaAudios'));
        }
       
    }

    public function MisAudios(){
        if (Auth::user()) {
            $ListaAudios = DB::table('audios')->where('id_usuario', Auth::user()->id)->get();
            return view('localstorage.mis_pistas', compact('ListaAudios'));
        }
        else{
            $ListaAudios = DB::table('audios')->where('id_usuario', 1)->get();
            return view('index', compact('ListaAudios'));
        }
    }

    //Hay errores al usar el Request "NuevoSonidoRequest"
    public function nuevoSonido(Request $request, $id){

        if ($request->ajax()) {
      
            //return response()->json($request->all());
            
            $validator = Validator::make($request->all(), [
                'nuevo_nombre_del_sonido' => 'required',
                'sonido' => 'required|mimes:mpga,mp3,mp4,wav,mid,aac|max:1000'
                    ]);
            
            if($validator->fails()){
                return response()->json("Error en el formato o en el peso del archivo", 404); // Status code here
                //return response()->json($validator->errors());
                //return redirect()->back()->withErrors($validator);
            }
            
            else {     

            $sonido_a_almacenar = $request->file('sonido');
            $sonido = new audios;

            $sonido->id_usuario = $id;
            $sonido->nombre_original = $sonido_a_almacenar->getClientOriginalName();
            $sonido->nombre_link = $sonido_a_almacenar->store('public');
            $sonido->nombre_mostrar = $request->input('nuevo_nombre_del_sonido');
            $sonido->save();

            //para la raiz era este:
            //$ListaAudios = DB::table('audios')->where('id_usuario', 1)->orWhere('id_usuario', Auth::user()->id)->get();
            $ListaAudios = DB::table('audios')->where('id_usuario', Auth::user()->id)->get();
            return response()->json(view('bladesajax.panel', compact('ListaAudios'))->render());    
            
            //return redirect()->back();
            //return $this->index_auntenticado($id);
    
            }
        }        
    }

    public function logoutLocalStorage(){
        return view('localstorage.logout');
    }

    public function loginLocalStorage(){
        //$ListaAudios_predeterminados = DB::table('audios')->where('id_usuario', 1)->orWhere('id_usuario', Auth::user()->id)->get();
        $ListaAudios_usuario = DB::table('audios')->where('id_usuario', Auth::user()->id)->get();
        //return view('localstorage.login', compact('ListaAudios_predeterminados', 'ListaAudios_usuario'));
        return view('localstorage.login', compact('ListaAudios_usuario'));
    }

    public function eliminarAudio($id){
        if(request()->ajax()){
            if (Auth::user()) {
                $nombre_a_buscar = "public/".$id;
                $nombre_link_audio = DB::table('audios')->where('id_usuario', Auth::user()->id)->Where('nombre_link', $nombre_a_buscar)->delete();

                $path = public_path()."/storage/".$id;
                unlink($path);
                
                $ListaAudios = DB::table('audios')->where('id_usuario', Auth::user()->id)->get();
                return response()->json(view('bladesajax.panel', compact('ListaAudios'))->render());
                //return redirect()->back();
            }
        }
    }

    public function editarNombreAudio(request $request, $id){
        if(request()->ajax()){
            $nombre_a_buscar = "public/".$id;
            $nombre_link_audio = audios::where('id_usuario', Auth::user()->id)->Where('nombre_link', $nombre_a_buscar)->first();
            $nombre_link_audio->nombre_mostrar = $request->input("nuevo_nombre_audio");
            $nombre_link_audio->save();
            
            $ListaAudios = DB::table('audios')->where('id_usuario', Auth::user()->id)->get();
            return response()->json(view('bladesajax.panel', compact('ListaAudios'))->render());
            //return redirect()->back();
        }

    }
}
