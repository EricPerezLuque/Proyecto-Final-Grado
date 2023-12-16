function tracks_mis_pistas(){
    tracks = []
    for (const key in datos_JSON) {
        var track = {
            nombre : datos_JSON[key]["nombre_mostrar"],
            volumen : 70,
            audio : datos_JSON[key]["nombre_link"],
            nombre_general : datos_JSON[key]["nombre_original"],
            casillas : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        };   
        tracks.push(track); 
    }
}

function mostrarListaAudios(){
    
    tracks_mis_pistas();

    var tbody_tabla_mis_pistas = $("#tbody_tabla_mis_pistas");

    for (const key in tracks) {
        
        var nuevo_tr = $("<tr>");
        var nuevo_th = $("<th scope=row>");
        var td_nombre_audio = $("<td class=td_nombre_audio >");
        var input_td_nombre_audio = $("<input class=input_nombre_audio disabled>").attr("numero_nombre_mostrar",key).val(tracks[key]["nombre"]);
        var td_botones = $("<td>");
        var boton_eliminar = $("<button class='btn btn-danger eliminar' style='margin-left: 5%' title='Click para eliminar el audio'>").attr("numero_audio",key);
        var boton_editar = $("<button class='btn btn-warning editar' title='Click para editar el nombre'>").attr("numero_audio",key);
        var icono_boton_editar = $("<i>").attr("class","material-icons").attr("style","float:right").text("create");
        var icono_boton_eliminar = $("<i>").attr("class","material-icons").attr("style","float:right").text("delete");
        

        $(td_nombre_audio).append(input_td_nombre_audio);

        $(boton_editar).append(icono_boton_editar);
        $(td_botones).append(boton_editar);

        $(boton_eliminar).append(icono_boton_eliminar);
        $(td_botones).append(boton_eliminar);

        $(nuevo_tr).append(nuevo_th).append(td_nombre_audio).append(td_botones);
        $(tbody_tabla_mis_pistas).append(nuevo_tr);
    }

    $( document ).ready(function() {
        $( ".eliminar" ).on( "click",  eliminarAudio );
        $( ".editar" ).on( "click",  editarNombreAudio );
    });    
    
}

function nuevoAudioLocalStorage(){

    var ultimo_track = tracks.length-1;
    var track = {
        nombre : tracks[ultimo_track]["nombre"],
        volumen : 70,
        audio : tracks[ultimo_track]["audio"],
        nombre_general : datos_JSON[ultimo_track]["nombre_original"],
        casillas : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    };   

    var audios_local = JSON.parse(localStorage.local_tracks);

    audios_local.push(track);

    localStorage.local_tracks = JSON.stringify(audios_local);

}

function eliminarAudio(){
    var form_mis_pistas = $("#form_mis_pistas");
    $("#metodo_form_mis_pistas").val("delete");
    var numero_audio = $(this).attr("numero_audio");
    var nombre_audio_link = tracks[numero_audio]["audio"];
    var nombre_audio_link_sin_public = nombre_audio_link.replace('public/', '');

    $("#form_mis_pistas").attr("action","/eliminar_audio/"+nombre_audio_link_sin_public);

    eliminarDelLocalStorage(nombre_audio_link);

    $(form_mis_pistas).submit();
}

function eliminarDelLocalStorage(nombre_audio_link){
    var array_localstorage = JSON.parse(localStorage.local_tracks);

    for (const key in array_localstorage) {
        if (array_localstorage[key]["audio"] == nombre_audio_link) {
            array_localstorage.splice(key, 1);
        }
    }

    localStorage.local_tracks = JSON.stringify(array_localstorage);
}

function editarNombreAudio(){

    cambiarInputEditarNombre(this);
    
}

function cambiarInputEditarNombre(boton){

    numero_boton_audio = $(boton).attr("numero_audio");
    input_audio = $("[numero_nombre_mostrar]").eq(numero_boton_audio)[0];
    icono_boton = $(boton).children()[0];

    if ($(icono_boton).text() == "create") {
        //deshabilitamos todos para que no pueda hacer mas de uno:
        $("[numero_nombre_mostrar]").attr("disabled",true);
        $(".editar").children().text("create")

        $(input_audio).attr("disabled",false);
        $(icono_boton).text("save");
    }
    else if ($(icono_boton).text() == "save") {
        /*
        $(input_audio).attr("disabled",true);
        $(icono_boton).text("create");
        */
        var nuevo_nombre = $(input_audio).val();
        enviarPeticionEditarNombreAudio(boton, nuevo_nombre);
    }
}

function enviarPeticionEditarNombreAudio(boton, nuevo_nombre){

    var form_mis_pistas = $("#form_mis_pistas");
    $("#metodo_form_mis_pistas").val("put");
    var numero_audio = $(boton).attr("numero_audio");
    var nombre_audio_link = tracks[numero_audio]["audio"];
    var nombre_audio_link_sin_public = nombre_audio_link.replace('public/', '');

    $("#input_nuevo_nombre_audio").val(nuevo_nombre);

    if (validarNulos("#form_mis_pistas")){
        $(form_mis_pistas).attr("action","/editar_nombre_audio/"+nombre_audio_link_sin_public);

        editarAudioLocalStorage(nombre_audio_link, nuevo_nombre);

        $(form_mis_pistas).submit();
    }

}

function editarAudioLocalStorage(nombre_audio_link, nuevo_nombre){

    var audios_local = JSON.parse(localStorage.local_tracks);
    
    for (const key in audios_local) {
        if (audios_local[key]["audio"] == nombre_audio_link) {
            audios_local[key]["nombre"] = nuevo_nombre;
        }
    }
    localStorage.local_tracks = JSON.stringify(audios_local);
}