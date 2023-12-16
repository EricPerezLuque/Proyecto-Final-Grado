$( document ).ready(function() {       
    
    $('#form_modal_nuevo_sonido').submit(function(e){
        e.preventDefault();
        if (validarNulos("#form_modal_nuevo_sonido") && validarPesoArchivo()) {

            var ruta = window.location.origin+$("#form_modal_nuevo_sonido").attr("action");
            var nuevo_nombre_del_sonido = $("#form_modal_nuevo_sonido input[name=nuevo_nombre_del_sonido]").val();
            var sonido = $("#form_modal_nuevo_sonido input[name=sonido]");
            var token = $("#form_modal_nuevo_sonido input[name=_token]").val();
            var form = $('#form_modal_nuevo_sonido');
            
            $.ajax({
                url: ruta,
                headers:{'X-CSRF-TOKEN':token},
                data: new FormData(form[0]),
                //data: form.serialize(),
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    $('#modal_nuevo_sonido').modal('hide');
                    $('#form_modal_nuevo_sonido')[0].reset();
                    $( '.modal-backdrop' ).remove();//eliminamos el fondo oscuro que deja el modal (hay veces que no se va)
                    //$("#slide_general").html(data);
                    $("#tbody_tabla_mis_pistas").html("");
                    $("#tbody_tabla_mis_pistas").html(data);
                    nuevoAudioLocalStorage();
                },
                error: function(data) {
                    //console.log(data.responseJSON);
                    console.log("Error");
                    createError("Error");
                },/*
                error: function(xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.errors);
                }
                */
            })
        }
    });

    $('#form_mis_pistas').submit(function(e){
        e.preventDefault();

            var ruta = window.location.origin+$("#form_mis_pistas").attr("action");
            var token = $("#form_mis_pistas input[name=_token]").val();

            if (ruta.indexOf("/eliminar_audio/") != -1) {
                $.ajax({
                    url: ruta,
                    headers:{'X-CSRF-TOKEN':token},
                    type: 'DELETE',
                    dataType: 'json',
                    success: function(data){
                        $("#tbody_tabla_mis_pistas").html("");
                        $("#tbody_tabla_mis_pistas").html(data);
                    },
                    error: function(data) {
                        //console.log(data.responseJSON);
                        console.log("Error");
                        createError("Error");
                    },/*
                    error: function(xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.log(err.errors);
                    }*/
                    
                })
            }
            else if(ruta.indexOf("/editar_nombre_audio/") != -1){
                var nuevo_nombre_audio = $("#input_nuevo_nombre_audio").val();
                $.ajax({
                    url: ruta,
                    headers:{'X-CSRF-TOKEN':token},
                    data: {nuevo_nombre_audio: nuevo_nombre_audio},
                    type: 'PUT',
                    dataType: 'json',
                    success: function(data){
                        $("#tbody_tabla_mis_pistas").html("");
                        $("#tbody_tabla_mis_pistas").html(data);
                    },
                    error: function(data) {
                        //console.log(data.responseJSON);
                        console.log("Error");
                        createError("Error");
                    },/*
                    error: function(xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        console.log(err.errors);
                    }*/
                    
                })
            }
            else{
                console.log("error");
            }
            
            
    });

});
