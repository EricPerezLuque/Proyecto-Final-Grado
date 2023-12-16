# ProyectoFinal: DrumSecuence


## Tabla de contenidos
1. [Desarrollador](#desarrollador)
2. [Contenido](#contenido)
3. [Requisitos](#requisitos)

## Desarrollador <a name="desarrollador"></a>

- Eric Pérez - https://github.com/EricPerLuq

## Contenido
Como en cualquier repositorio de Laravel, todo el contenido del javascript, css e imagenes, se encuentra en la carpeta "public".

Todas las rutas externas, las podremos ver en la vista "master" o "app", situadas en: 

> /resources/views/layouts

El resto del contenido se encuentra en las demas vistas 

> /resources/views/

## Requisitos: <a name="requisitos"></a>
Para poder ejecutar la aplicacion, necesitaremos tener instalado un servidor **[mysql](https://www.mysql.com)**, **[composer](https://getcomposer.org/)** y **[Laravel](https://laravel.com)**.

Una vez lo tengamos todo instalado, crearemos la base de datos.

Al tener ya la base de datos, tendremos que hacer dentro de la carpeta un **composer install**, copiaremos el fichero ".env.example" y crearemos uno, llamado ".env", donde pegaremos el contenido, cambiando el nombre de la base de datos, el usuario y la contraseña.

***
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE="nombre_de_la_base_de_datos"
    DB_USERNAME="usuario"
    DB_PASSWORD="contraseña"
***

Procederemos a hacer el comando para generar la clave que utilizará la aplicación, y la migracion de la base de datos:
***
    php artisan key:generate
    php artisan migrate
***

(En caso de que ya tuviesemos una migracion hecha, podemos usar el comando "php artisan migrate:fresh" para borrar las tablas de la base de datos, y que nos la vuelva a crear. **Borrara toda la informacion que tengamos en la base de datos**)

Para que se guarden bien los audios, debemos hacer un comando, el cual creara un link a la carpeta storage para poder guardar en local los ficheros y luego poder mostrarlos linkandolos a la base de datos.
***
    php artisan storage:link
***

Una vez tengamos el link generado, copiaremos los audios de **audios_principales** dentro del directorio **storage** situado dentro de la carpeta **Public**.

Para añadir informacion a la base de datos, tendremos el seeder, el cual lo utilizaremos con el siguiente comando:
***
    php artisan db:seed
***
(El contenido lo puedes modificar desde su respectiva carpeta, ya que utilizara los datos que nosotros le hemos dado)

Una vez hayamos hecho esto, tendremos la informacion generada en la base de datos para poder utilizar la aplicación.

Por ultimo, para hacer funcionar el mail (tanto verificacion como recuperar contraseña), tendremos que volver a modificar el fichero **.env**, rellenando los siguientes campos:
***
    MAIL_DRIVER=smtp
    MAIL_HOST="smtp_que_escojamos"
    MAIL_PORT="puerto_smpt"
    MAIL_USERNAME="usuario_mail"
    MAIL_PASSWORD="contraseña_mail"
    MAIL_ENCRYPTION="encriptacion_mail"
***

Para finalizar, ejecutaremos el comando *"php artisan serve"*, y ya podremos utilizar la aplicacion al completo!.
