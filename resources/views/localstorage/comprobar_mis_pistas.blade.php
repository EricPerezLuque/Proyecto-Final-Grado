<script>

    var datos_JSON_usuario = {!! json_encode($ListaAudios_usuario->toArray(), JSON_HEX_TAG) !!};
    var datos_JSON_predeterminados = {!! json_encode($ListaAudios_predeterminados->toArray(), JSON_HEX_TAG) !!};

    //recogemos los datos que traemos del localstorage para compararlos
    tracks = JSON.parse(localStorage.local_tracks);

    //recogemos los datos principales para compararlos
    var tracks_predeterminados = [];

    for (const key in datos_JSON_predeterminados) {
        var track_pre = {
            nombre : datos_JSON_predeterminados[key]["nombre_mostrar"],
            volumen : 70,
            audio : datos_JSON_predeterminados[key]["nombre_link"],
            casillas : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        };   
        tracks_predeterminados.push(track_pre);
    }
    
    function comprobar_datos_mis_pistas(){
        for (const key in tracks_predeterminados) {
            if ( tracks_predeterminados[key]["audio"] != tracks[key]["audio"] ) {
                return false;
            }
            else{
                return true;
            }
        }
    }

    if ( comprobar_datos_mis_pistas() ){
        for (const key in tracks_predeterminados) {
            tracks.shift();
        }
        localStorage.local_tracks = JSON.stringify(tracks);
        window.location = "/mis_pistas";
    }else{
        console.log(tracks);
        window.location = "/mis_pistas";
    }

</script>