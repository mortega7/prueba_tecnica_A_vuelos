# Sistema de Reservas de Vuelos

Este proyecto es un sistema de reservas de vuelos que incluye funcionalidades para el registro de vuelos, búsqueda de vuelos disponibles, realización de reservas y estadísticas sobre las aerolíneas.

### Contenido del Repositorio

* frontend/: Contiene el código del frontend de la aplicación.
* backend/: Contiene el código del backend de la aplicación.
* sql_dump/: Contiene el dump inicial para la base de datos, están la estructura de las tablas y unos inserts básicos. También contiene la imagen con el MER (Modelo Entidad-Relación).
* .env.example: Archivo con las variables de entorno de la base de datos.
* docker-compose.yml: Archivo de configuración para orquestar contenedores Docker.
* README.md: Este archivo.

### Despliegue

Para desplegar este proyecto en tu entorno local, sigue estos pasos:

* Asegúrate de tener Docker instalado en tu equipo.
* Clona este repositorio en tu equipo local.
* Navega al directorio raíz del repositorio clonado.
* Renombra los archivos .env.example que se encuentran en el directorio raíz, en el directorio backend y en el directorio frontend, deben quedar como .env
* Coloca los valores de las variables de entorno de cada uno de estos archivos .env según la configuración que necesites. _NOTA:_ Los usuarios de la base de datos del .env de la raiz deben ser iguales a los del backend. Este usuario también te sirve para ingresar al phpMyAdmin.
* Ejecuta el comando _docker-compose up_ en tu terminal.
* Accede a la aplicación frontend en [http://localhost:3000](http://localhost:3000).
* _Opcional:_ Puedes acceder al phpMyAdmin para visualizar la base de datos en [http://localhost:8102](http://localhost:8102).

### Tecnologías Utilizadas

* Backend: Node.js y Express
* Frontend: React y Next.js
* Base de Datos: MySQL
* Contenedores: Docker

### Contacto

Si tienes alguna pregunta o sugerencia sobre este proyecto, no dudes en ponerte en contacto conmigo a través de [morteguita@gmail.com](morteguita@gmail.com)

&copy; Manuel Ortega - 2024