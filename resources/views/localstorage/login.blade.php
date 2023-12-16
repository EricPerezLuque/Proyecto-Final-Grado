<script>
    /*
    localStorage.clear();
    window.location = "/";
    */
    var datos_JSON_usuario = {!! json_encode($ListaAudios_usuario->toArray(), JSON_HEX_TAG) !!};

    tracks = JSON.parse(localStorage.local_tracks);
    for (const key in datos_JSON_usuario) {
        var track = {
            nombre : datos_JSON_usuario[key]["nombre_mostrar"],
            volumen : 70,
            audio : datos_JSON_usuario[key]["nombre_link"],
            casillas : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        };   
        
        //array de objetos
        tracks.push(track);

        //objeto de objetos
        //tracks["track"+key] = track;     
    }
    localStorage.local_tracks = JSON.stringify(tracks);

    window.location = "/email/verify";
</script>