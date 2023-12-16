<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NuevoSonidoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nuevo_nombre_del_sonido' => 'required', 
            'sonido' => 'required|mimes:mpga,mp3,mp4,wav,mid,aac',
        ];
    }

    public function messages()
    {
        return [
            'nuevo_nombre_del_sonido.required' => 'El campo del Nombre no puede estar vacio',
            'sonido.required' => 'Debes introducir un archivo compatible (mp3, mp4, wav, mid o aac)',
        ];
    }
}
