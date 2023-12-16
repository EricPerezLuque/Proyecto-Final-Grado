    {{-- <style>
        #errores{
            color:green;
        }
    </style> --}}
    <!-- Modal -->
    <div class="modal" tabindex="-1" role="dialog" id="modal_nuevo_sonido">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                
                {{-- <div class="alert alert-danger" style="display:none"></div>
                <div class="modal-header" id="modal_header_nuevo_sonido">
                    <h5 class="modal-title">Nuevo Sonido</h5>
                    <div class="alert alert-danger" id="errores_nuevo_sonido" role="alert" style="display:none;">
                        <p id="p_error_nuevo_sonido"></p>
                    </div>
                </div> --}}
                   
                <div class="modal-body">
                    <form method="POST" action="/nuevo_sonido/{{ Auth::user()->id }}" id="form_modal_nuevo_sonido" enctype="multipart/form-data">
                        {{ csrf_field() }}
                        <div>   
                            {{-- <div class="form-group">
                                <h3>Introduce un nuevo sonido:</h3>
                                <br>
                            </div> --}}
                            <div class="form-group">
                                <h3>Introduce un nombre para el sonido:</h3>
                                <br>
                                <input type="text" name="nuevo_nombre_del_sonido" id="nuevo_nombre_del_sonido">
                                <br>
                            </div>
                            <div class="form-group" id="div_subir_sonido">
                                <h3>Introduce el sonido</h3>
                                <br>
                                <input type="file" name="sonido" id="subida_nuevo_sonido" accept="audio/mpga, audio/mp3, video/mp4, audio/wav, audio/mid, audio/aac">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="click_cerrar_nuevo_sonido" >Close</button>
                            <button class="btn btn-success" id="boton_guardar_cambios_nuevo_sonido">Guardar Cambios</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
