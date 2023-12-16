<script>

    var datos_JSON = {!! json_encode($ListaAudios->toArray(), JSON_HEX_TAG) !!};

    mostrarListaAudios();
    

{{--
    //Esto era para añadir en las propias pistas de la raiz
    /*
    var datos_JSON = {!! json_encode($ListaAudios->toArray(), JSON_HEX_TAG) !!};
    var NumeroPistas = {!! json_encode($NumeroPistas, JSON_HEX_TAG) !!};

    //crearPanel(datos_JSON);

    tracks = JSON.parse(localStorage.local_tracks);

    var track = {
        nombre : $(datos_JSON).last()[0]["nombre_mostrar"],
        volumen : 70,
        audio : $(datos_JSON).last()[0]["nombre_link"],
        casillas : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    };   
    
    //array de objetos
    tracks.push(track);
    
    localStorage.local_tracks = JSON.stringify(tracks);

    datosTracks();
    //crearPanel2(tracks);
    */
--}}
                
</script>