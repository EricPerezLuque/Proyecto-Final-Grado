function validarNulos(IdForm){
    var control = true;
    $(IdForm + ' input').each(function(){
        if($(this).val() === ""){
            $(this).css('border','1px solid red');
            control = false;
        }else if($(this).children("option:selected").val() === ""){
			$(this).css('border','1px solid red');
            control = false;
		}else{
            $(this).css('border','');
        }
    })

    if(control){
        return true;
    }else{
        createError("Todos los campos son obligatorios.");
        return false;
    }
}

function validarPesoArchivo(){
    var fileSize = $('#subida_nuevo_sonido')[0].files[0].size;
    var siezekiloByte = parseInt(fileSize / 1024);
    if (siezekiloByte >  1000) {
        createError("Audio muy pesado, maximo: 1MB");
        return false;
    }
    else{
        return true;
    }
}