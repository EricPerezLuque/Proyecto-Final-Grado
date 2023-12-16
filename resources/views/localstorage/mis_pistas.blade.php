@include('layouts.app') {{--Esto es el nav del login--}}

@extends('layouts.master')

@section('contenido')
    <div class="row" style="background-color:gray">
        <div style="text-align:left" class="col-sm-2">
        </div>
        <div class="col-sm-8" id="Botonera">
            @auth
                @include('modals/modal_nuevo_sonido')
                <label class="Botons btn btn-secondary" id="subir_sonido" data-toggle="modal" data-target="#modal_nuevo_sonido" title="Click para subir una cancion">
                    <i class="material-icons" style="float:right" >add</i>
                </label>
            @endauth

            @guest
                <label class="Botons btn btn-secondary" id="subir_sonido" title="Click para subir una cancion" onclick="alert('Registrate o logueate para poder subir una cancion')">
                    <i class="material-icons" style="float:right">music_note</i>
                </label>
            @endguest

        </div>
    </div>

    <div class="row mis_pistas_panel" style="background-color:gray">

        <div class="slide_general" id="slide_general">
			
        </div>

        <table class="table table-striped table-dark" id="tabla_mis_pistas">
            <thead>
                <tr>
                    <th scope="col"> </th>
                    <th scope="col">Nombre Audio</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody id="tbody_tabla_mis_pistas">
                {{-- Aqui iran los datos del javascript --}}
            </tbody>
        </table>

    </div>

    <form id="form_mis_pistas" action="" method="post" style="display:none">
        <input id="metodo_form_mis_pistas" name="_method" type="hidden"/>
        <input name="nuevo_nombre_audio" id="input_nuevo_nombre_audio" type="hidden">
        {{ csrf_field() }}
    </form>

    <script>

        var datos_JSON = {!! json_encode($ListaAudios->toArray(), JSON_HEX_TAG) !!};

        mostrarListaAudios();
    
    </script>
@endsection