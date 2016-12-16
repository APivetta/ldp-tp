# Biblioteca API REST

CAECE - Lenguajes de Programación - 2º cuatrimestre 2016

___

# Tabla de Contenidos
* [Manual](#manual)
    * [Estructura de Archivos](#estructura-de-archivos)
* [Instalación](#instalación)
    * [Dependencias](#dependencias)
    * [Instalando](#instalando)
    * [Corriendo la API](#corriendo-la-api)
        * [Desarrollo](#desarrollo)
        * [Producción](#producción)

## Estructura de Archivos
Se estructuran los archivos en componentes. Un componente es un concepto auto contenido, puede ser desde una funcionalidad entera a elementos de la UI.

```
api
..index.js * definicion de las rutas de la API
⋅⋅lib/ * modulos
⋅⋅⋅⋅book.js * definición del esquema de libro que se mapea conta la base de datos.
⋅⋅⋅⋅config.sample.js * Archivo de configuración de ejemplo, copiarlo a config.js y completarlos con los datos del ambiente correspondientes.
⋅⋅⋅⋅logger.js * modulo de logueo.
⋅⋅⋅⋅mongo.js * modulo que se encarga de la conexión a la base de datos MongoDB.
```

# Instalación
## Dependencias
Herramientas necesarias para correr la api:
* `node` y `npm`
* Una base de datos `Mongo DB`

Una vez instalado node, instalar los siguientes paquetes globales:  
`npm install -g forever nodemon`

## Instalando
* `clone` este repositorio
* `npm install -g forever nodemon` instalar dependencias globales (paso anterior)
* `npm install` en la carpeta raiz del repositorio para instalar dependencias locales
* `cp lib/config.sample.js config.js` y complete los valores reales en el archivo de configuración

## Corriendo la API
Gulp se utiliza para compilar y lanzar la aplicación. Una vez instaladas toda las dependencias, pueden correr la aplicación corriendo `gulp serve` en la carpeta raiz del repositorio desde la terminal.
 
### Desarrollo
* `nodemon index.js`
  * Levanta la API y la refresca en cada modificación de los archivos de código.
  
### Desarrollo
* `forever start index.js`
  * Levanta la API como demonio y la levanta automaticamente ante fallas.