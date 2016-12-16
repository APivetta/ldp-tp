# Biblioteca App

CAECE - Lenguajes de Programación - 2º cuatrimestre 2016

___

# Tabla de Contenidos
* [Manual](#manual)
    * [Sistema de Compilación](#sistema-de-compilación)
    * [Estructura de Archivos](#estructura-de-archivos)
* [Instalación](#instalación)
    * [Dependencias](#dependencias)
    * [Instalando](#instalando)
    * [Corriendo la App](#corriendo-la-app)
        * [Gulp Tasks](#gulp-tasks)
    * [Generando Componentes](#generando-componentes)   

# Manual
## Sistema de Compilación
Esta aplicación usa Gulp y Webpack como sistema de compilación.

`Webpack` se encarga de compilar y cargar todos los archivos:
* Transpila ES6 a ES5 usando `Babel`
* Carga archivos HTML como modulos
* Transpila las hojas de estilos en SASS y las agrega al DOM
* Refresca la página del servidor de desarrollo cuando ocurren cambios
* Realiza Hot module replacement con las hojas de estilos
* Compila la aplicación
* Carga todos los modulos

`Gulp` es el orquestador:
* Inicia y llama a Webpack
* Sirve la aplicación localmente para desarrollo
* Genera templates de componentes


## Estructura de Archivos
Se estructuran los archivos en componentes. Un componente es un concepto auto contenido, puede ser desde una funcionalidad entera a elementos de la UI.

```
client
..index.html
⋅⋅app/
⋅⋅⋅⋅app.js * punto de entrada de la app
⋅⋅⋅⋅app.components.js * componente principal
⋅⋅⋅⋅app.scss * estilos
⋅⋅⋅⋅app.html * 
⋅⋅⋅⋅common/ * funcionalidad y estilos compartidos en toda la aplicación
⋅⋅⋅⋅components/ * contenedor de los componentes
⋅⋅⋅⋅⋅⋅components.js * punto de entrada de los componentes
⋅⋅⋅⋅⋅·component/ * un componente particular
⋅⋅⋅⋅⋅⋅⋅·component.js * punto de entrada del componente (rutas, configuraciones, etc)
⋅⋅⋅⋅⋅⋅⋅·component.component.js * "directiva" del componente
⋅⋅⋅⋅⋅⋅⋅·component.controller.js * controlador del componente
⋅⋅⋅⋅⋅⋅⋅·component.scss * estilos
⋅⋅⋅⋅⋅⋅⋅·component.html * template
```


# Instalación
## Dependencias
Herramientas necesarias para correr la aplicación:
* `node` y `npm`

Una vez instalado node, instalar los siguientes paquetes globales:  
`npm install -g gulp karma karma-cli webpack babel`

## Instalando
* `clone` este repositorio
* `npm install -g gulp karma karma-cli webpack babel` instalar dependencias globales (paso anterior)
* `npm install` en la carpeta raiz del repositorio para instalar dependencias locales

## Corriendo la App
Gulp se utiliza para compilar y lanzar la aplicación. Una vez instaladas toda las dependencias, pueden correr la aplicación corriendo `gulp serve` en la carpeta raiz del repositorio desde la terminal.
 
### Gulp Tasks
Lista de todas las gulp tasks:
* `webpack`
  * Corre Webpack, que transpilará, concatenará, y compirimira (armará el "bundle") todos los recursos y modulos en `dist/bundle.js`. También prepara `index.html` para ser usado como el punto de entrada de la aplicación.
* `serve`
  * Inicia un dev server con `webpack-dev-server`, sirve la carpeta client.
* `watch`
  * Alias de `serve`
* `default` (Es la tarea default cuando se llama a `gulp` sin argumentos)
  * Corre `serve`.
* `component`
  * Genera un nuevo componente de Angular. [Ver](#generando-componentes) para mas detalles.
  
### Generando Componentes 
Mantener una estructura de carpetas consistente ayuda a la predictibilidad. Se utiliza una tarea de gulp para automatizar la creacion de nuevos compomentes de la siguiente forma:
```
⋅⋅⋅⋅⋅⋅component/
⋅⋅⋅⋅⋅⋅⋅⋅component.js // punto de entrada donde se cargan todas las dependencias
⋅⋅⋅⋅⋅⋅⋅⋅component.component.js
⋅⋅⋅⋅⋅⋅⋅⋅component.controller.js
⋅⋅⋅⋅⋅⋅⋅⋅component.html
⋅⋅⋅⋅⋅⋅⋅⋅component.scss // con scope para afecar solo su propio template
⋅⋅⋅⋅⋅⋅⋅⋅component.spec.js // contiene esqueleto de tests
```

Para generar un componente, ejecutar `gulp component --name nombreDelComponente`.

Asegurese de que el nombre sea único o se sobre-escribirá el componente existente.

El componente será creado, por default, dento de `client/app/components`. Para cambiarlo, use el flag `--parent`, seguido de un path relativo a `client/app/components/`.

Por ejemplo, ejecutar `gulp component --name signup --parent auth` creará el componente `signup` en `client/app/components/auth/signup`.  

Ejecutar `gulp component --name footer --parent ../common` creará el componente `footer` en `client/app/common/footer`.  

Asegurese de que `--name` sea escrito en camelcase.