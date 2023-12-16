//variable global para poder parar el set interval
var Loop=[];
var tracks = [];
var Tempo;
//añade a la array global los datos de cada track
function datosTracks(){

    ////////Local Storage (guardar la informacion)
    if(typeof(Storage) !== "undefined") {
        if (localStorage.local_tracks) {
            introducirLocalStorage();
        } 
        else {
            crearTracks(datos_JSON);
        }
    } else {
            document.getElementById("#slide_general").innerHTML = "Sorry, your browser does not support web storage...";
    }

    
    
}

function introducirLocalStorage(){
    //para borrar el localstorage:
    //localStorage.clear();
    tracks = JSON.parse(localStorage.local_tracks);

    //crearemos el panel
    crearPanel();
}

function crearTracks(datos_JSON){
    tracks = [];
    for (const key in datos_JSON) {
        var track = {
            nombre : datos_JSON[key]["nombre_mostrar"],
            volumen : 70,
            audio : datos_JSON[key]["nombre_link"],
            nombre_general : datos_JSON[key]["nombre_original"],
            casillas : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

        };   
        
        //array de objetos
        tracks.push(track);

        //objeto de objetos
        //tracks["track"+key] = track;     
    }
    localStorage.local_tracks = JSON.stringify(tracks);

    //crearemos el panel
    crearPanel();
}

$( document ).ready(function() {
    
    //inicializamos los audios
    for (const key in tracks) {

        var nombre_cancion = tracks[key]["audio"];
        var ruta_audios = "/storage/";
        nombre_cancion = nombre_cancion.replace('public/', '');
        new Audio(ruta_audios+nombre_cancion);
        
    }

 /// Validacion del Tempo
    var number = document.getElementById('input-metro');

    if (number) {
        //al teclear
        number.onkeydown = function(e) {
            if(!((e.keyCode > 95 && e.keyCode < 106) //numerico1
            || (e.keyCode > 47 && e.keyCode < 58) //numerico2
            || (e.keyCode > 36 && e.keyCode < 41) //flechas
            || e.keyCode == 8 || e.keyCode == 46)) { //supr y backspace
                return false;
            }
        }
    }

    //onclicks

    //$( ".myslider" ).on( "click",  clickCasilla );
    $( "#limpiar" ).on( "click",  limpiarCasillas );
    $( "#stop" ).on( "click",  pararSonido);
    $( "#play" ).on( "click",  pasarDatosAPlaySonido );
    $("#form_descargar_json").on( "click", descargarJSON );
    $('#input_file_subir_json').on('change', leerArchivo);

    
});


function crearPanel(){

    var tabla = $("<table id=tabla_panel class=tabla_panel table table-striped style='width:1024px;'>");

    $("#slide_general").append(tabla);
    numerosCasillasDelReproductor();

    for (const key in tracks) {
        //if (key > 5){
            var nombre_mostrar = tracks[key]["nombre"];

            var agregar_td_nombres = $("<td>").text(nombre_mostrar).css("margin-top","10px");
            
            var tr_pista = $("<tr>");
            
            $(tr_pista).append(agregar_td_nombres);
            $(tabla).append(tr_pista);
            
            crearCasillas(key, tr_pista);
            crearSlide(key, tr_pista);
        //}
        
    }
    //asignaremos el onclick despues de crear las teclas
    $( ".Tecla" ).on( "click",  clickCasilla );
    lineasDelReproductor();
}

function clickCasilla(){

    var casilla_pulsada = $(this).attr("pista");
    var casilla_por_filas = $(this).attr("casilla_por_filas");

    //al hacer click, se cambiara el modelo(array de objetos), el cual indica que esta iluminada la casilla
    var casilla_iluminada = tracks[casilla_pulsada]["casillas"][casilla_por_filas];

    if (casilla_iluminada == 1){
        $( this ).css("background-color","#686868");
        tracks[casilla_pulsada]["casillas"][casilla_por_filas] = 0;
                
    }else{
        $( this ).css("background-color","cyan");
        tracks[casilla_pulsada]["casillas"][casilla_por_filas] = 1;
        
        var num_pista = $(this).attr("pista");
        var nombre_cancion = tracks[num_pista]["audio"];

        var porcentaje_volumen = tracks[num_pista]["volumen"];
        Sonido(nombre_cancion, porcentaje_volumen);
    }    

    localStorage.local_tracks = JSON.stringify(tracks);
    
}

function Sonido (nombre_cancion, porcentaje_volumen){
    var ruta_audios = "/storage/";
    nombre_cancion = nombre_cancion.replace('public/', '');
    //como se guarda en la base de datos al inicio "public/", lo eliminaremos
    var audio = new Audio(ruta_audios+nombre_cancion);
    var porcentaje_volumen_exacto = porcentaje_volumen/100;
    audio.volume = porcentaje_volumen_exacto;
    audio.play();
}

function limpiarCasillas (){
    $( ".Tecla" ).css("background-color","#686868");
    for (const key in tracks) {
        tracks[key]["casillas"] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    localStorage.local_tracks = JSON.stringify(tracks);
}


function crearCasillas(key, tr_pista){
    //var CssCasilla={"border":'solid #545454 3px',"width":'40px',"height":'40px',"border-radius":'5px',"background-color":'#686868'};
    var Teclas=$("<td>").attr("class","Teclas");
    $(tr_pista).append(Teclas)

    for (var i=0; i<=15; i++) {
        if (tracks[key]["casillas"][i] == 0) {
            var CssCasilla={"border":'solid #545454 3px',"width":'40px',"height":'40px',"border-radius":'5px',"background-color":'#686868'};
        }
        else{
            var CssCasilla={"border":'solid #545454 3px',"width":'40px',"height":'40px',"border-radius":'5px',"background-color":'cyan'};
        }
        var Tecla=$('<div>').attr("class","Tecla").attr("pista",key).attr("casilla_por_filas",i).css(CssCasilla);      
        $(Teclas).append(Tecla);
    }
}

function crearSlide(key, tr_pista){
    var DivSlide=$('<div>').attr("class","rangeslider");
    var volumen_track = tracks[key]["volumen"];
    var inputSlide=$('<input>').attr({"type":"range","min":"0","max":"100","value":volumen_track,"class":"myslider"});
    /*
    , "pista_volumen":key
    */
    //posible atributo para cambiar el volumen al objeto
    var SpanNumVolumen=$('<span>').attr("class","num_volumen");
    $(tr_pista).append(DivSlide);
    $(DivSlide).append(inputSlide);
    $(DivSlide).append(SpanNumVolumen);
    var rangeslider = inputSlide[0];
    var output = SpanNumVolumen[0];
    output.innerHTML = rangeslider.value;     
    rangeslider.oninput = function() {
    output.innerHTML = this.value; 
    tracks[key]["volumen"] = parseInt(this.value);
    localStorage.local_tracks = JSON.stringify(tracks);
    } 
}

function numerosCasillasDelReproductor(){
    var tabla = $("#tabla_panel");
    var tr_numeros_lineas_tempo = $("<tr>");
    var primer_td_invisible = $("<td>");
    var td_numeros_lineas = $("<td>").attr("class","numeros_lineas_reproductor");
    var CssCasilla={"width":'40px',"height":'12px', "text-align":"center", "font-size":"13px"};

    for (let index = 0; index < 16; index++) {
        var div_linea_tempo = $("<div>").attr("class","numeros_linea_tempo").text(index+1).css(CssCasilla);
        $(td_numeros_lineas).append(div_linea_tempo);
    }

    $(tr_numeros_lineas_tempo).append(primer_td_invisible);
    $(tr_numeros_lineas_tempo).append(td_numeros_lineas);
    $(tabla).append(tr_numeros_lineas_tempo);
}

function lineasDelReproductor(){
    var tabla = $("#tabla_panel");
    var tr_lineas_divisorias = $("<tr>");
    var primer_td_invisible = $("<td>");
    var td_lineas = $("<td>").attr("class","lineas_reproductor");
    var CssCasilla={"width":'40px',"height":'40px', "text-align":"center"};
    //$(".linea_divisoria").eq(0).css("color","cyan");
    //$(".linea_divisoria:eq(0)").css("color","cyan");

    for (let index = 0; index < 16; index++) {
        var div_linea_divisoria = $("<div>").attr("class","linea_divisoria").text("'").css(CssCasilla);
        $(td_lineas).append(div_linea_divisoria);
    }

    $(tr_lineas_divisorias).append(primer_td_invisible);
    $(tr_lineas_divisorias).append(td_lineas);
    $(tabla).append(tr_lineas_divisorias);
}

function pasarDatosAPlaySonido(){
    var numero_de_tracks = tracks.length;
/*
    if(Tempo>240 || Tempo< 40){
        alert(Tempo);
        return ;    
    }
*/
    if($('#input-metro').val()<= 0){
        createError("No puedes introducir menos de un 1 en el tempo");
        return;    
    }
    var arrayTiempo = [];
    var arrayTemporal = [];

    for (var i = 0; i <= 15; i++) {
        for (var z = 0; z < numero_de_tracks; z++) {
            casilla_iluminada = tracks[z]["casillas"][i];
            if (z != numero_de_tracks) {
                if (casilla_iluminada == 1){
                    //playSonido(tracks[z]);
                    arrayTemporal.push(tracks[z]);
                }
            }
        }
        arrayTiempo[i] = arrayTemporal;
        arrayTemporal = [];
    }

    var l = 0;
    RecibirTempo();
    Loop = setInterval(function(){
        $(".linea_divisoria").css("color","black");
        $(".linea_divisoria").eq(l).css("color","cyan");
        $(".numeros_linea_tempo").css("color","black");
        $(".numeros_linea_tempo").eq(l).css("color","cyan");
        
        pasarArrayASonido(arrayTiempo[l]);
        
        l++;
        if (l >= 16) {
            //l = 0;
            pararSonido2();
            pasarDatosAPlaySonido();
        }
        
    },Tempo)
    $("#play").attr("style","display:none");
    $("#stop").attr("style","display:inline-block");
}

function pasarArrayASonido(arrayTiempo){
    for (const key in arrayTiempo) {
        playSonido(arrayTiempo[key]);
    }
}

function playSonido(track){
    var porcentaje_volumen = track["volumen"];
    var nombre = track["audio"];
    Sonido(nombre,porcentaje_volumen);
}

function pararSonido(){
    $(".linea_divisoria").css("color","black");
    $(".numeros_linea_tempo").css("color","black");
    for (var i =0; i <= Loop; i++) {
        clearInterval(i);
    }
    $("#stop").attr("style","display:none");
    $("#play").attr("style","display:inline-block");
}

function pararSonido2(){
    //esta no tiene "color:black"
    for (var i =0; i <= Loop; i++) {
        clearInterval(i);
    }
    $("#stop").attr("style","display:none");
    $("#play").attr("style","display:inline-block");
}

//Descargar JSON
function descargarJSON(){

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tracks));
    $("#form_descargar_json").attr("href",dataStr).attr("download", "pistas.json");
    //boton_descarga.click();
}

//Subir JSON
function leerArchivo(e) {
    var booleano;
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        if (JSON.parse(contenido).length == JSON.parse(localStorage.local_tracks).length) {
            for (const key in JSON.parse(localStorage.local_tracks)) {

                if (JSON.parse(contenido)[key]["nombre_general"] === JSON.parse(localStorage.local_tracks)[key]["nombre_general"]) {
                    booleano = true;
                }
                else{
                    booleano = false;
                }
            }
        }
        if (booleano) {
            localStorage.local_tracks = contenido;
            tracks = JSON.parse(localStorage.local_tracks);
            $("#slide_general").html("");
            datosTracks();
        }
        else{
            createError("Error, no has subido el mismo tipo de pistas");
        }
    };
    lector.readAsText(archivo);
    
}
  
function RecibirTempo(){
    var valTempo=$('#input-metro').val();
    Tempo=60000/valTempo;
}

var global_countTime;

function uniqueError(id){
    var control = true;
    $('.Error').each(function(){
        if($(this).attr('id') === id){
            control = false;
        }
    });

    return control;
}
function createError(Message,id){
    if(uniqueError(id)){
        $('<div>').attr({class:'Error',id:id}).text(Message).prepend($('<img>',{src:'/img/Exclamacion.png',width:'40px'}))
        .appendTo('.ErrorContainer');
        $('.ErrorContainer').show();
        setTimer();
    }
}

function setTimer(){
    clearTimeout(global_countTime);
    global_countTime =  setTimeout(function (){
        var errorContainer = $('.ErrorContainer');
        errorContainer.hide();
        errorContainer.empty();
    }, 5000);
}
