# TP Lenguajes de Programacion 2C 2016 CAECE

Sistema de Administración de Libros

___

# Docente:
	Diana Cicinelli 

# Alumno:
	Agustín Pivetta, 992850

# Especificación:
Se desea hacer un sistema que administre los libros de una biblioteca pequeña. Se deberá diseñar una base de datos, basada en un lista simplemente encadenada de libros, que permita altas, bajas, consultas y modificaciones.
La estructura básica para un libro deberá contener la siguiente información: titulo, autor (hasta tres autores), cantidad de páginas, número ISBN, año de edición, editorial, género al que pertenece (ficción, política, biografía, historia, aventura, etc), pueden agregarle otros datos que crean convenientes.

# Funcionalidad:
## Se deberá permitir realizar las siguientes operaciones:
* Dar de alta un libro (se deberá verificar que el libro no exista).
* Dar de baja un libro (se deberá verificar que el libro exista).
* Consultar por un libro de un determinado título.
* Modificar los datos de un libro.
* Listados:
	1. Listar todos los autores existentes.
	2. Listar todos los libros existentes.
	3. Listar todos los libros de un género determinado.
	4. Listar todos los libros que posee un autor determinado.
	5. Listar todos los libros de una editorial determinada.
	6. Listar todos los libros de una editorial determinada en un rango de años de edición.
	7. Listar todos los autores de una determinada editorial.
	8. Listar todos los libros que fueron editados en un determinado año.
	9. Listar todos los libros de los autores cuyos apellidos comienzan con una letra determinada.
	10. Listar todos los libros cuyos títulos contengan una palabra determinada.

# Manuales:
Este sistema consiste de una API REST implementada en Node.js y un sitio web implementado con el Framework Angular.js. Para ver los manuales de instalación y documentación de cada uno, leer los README correspondientes dentro de cada carpeta.