'use strict';

const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const config = require('./lib/config');
const mongo = require('./lib/mongo');
const logger = require('./lib/logger');
const Book = require('./lib/book');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

router.get('/', (req, res) => {
  res.json({ message: 'OK' });
});

router.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*
Ruta						Verbo HTTP	Descripcion
/api/authors				GET			Lista todos los autores
/api/authors/:publisher		GET			Lista todos los autores de una editorial
/api/books					GET			Lista todos los libros segun filtros
/api/books					POST		Crea un nuevo libro
/api/books					DELETE		Borra todos los libros
/api/books/:isbn			GET			Trae un libro
/api/books/:isbn			PUT			Actualiza un libro
/api/books/:isbn			DELETE		Borra un libro
*/

router.route('/authors')
  //Lista todos los autores
  .get((req, res) => {
    Book.find({}, 'authors', (err, books) => {
      if (err) {
        logger.error(err.message);
        res.status(500).send(err);
      } else {
        let authorsHash = {};
        books.forEach(book => book.authors.forEach(author => authorsHash[author] = ''));
        //Ordena alfabeticamente y devuelve los autores
        res.json(Object.keys(authorsHash).sort((a, b) => (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0));
      }
    });
  });

router.route('/authors/:publisher')
  //Lista todos los autores de una editorial
  .get((req, res) => {
    Book.find({ publisher: req.params.publisher }, 'authors', (err, books) => {
      if (err) {
        logger.error(err.message);
        res.status(500).send(err);
      } else {
        let authorsHash = {};
        books.forEach(book => book.authors.forEach(author => authorsHash[author] = ''));
        //Ordena alfabeticamente y devuelve los autores
        res.json(Object.keys(authorsHash).sort((a, b) => (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0));
      }
    });
  });

router.route('/books')
  //Crea un nuevo libro
  .post((req, res) => {
    //verifico que el libro no exista
    Book.findOne({ ISBN: req.body.ISBN }, (err, book) => {
      if (book) {
        res.status(400).json({ message: 'El libro ya existe' });
      } else {
        const book = new Book(req.body);

        req.checkBody('ISBN', 'ISBN requerido').notEmpty();
        req.checkBody('title', 'Titulo requerido').notEmpty();
        req.checkBody('authors', 'Al menos un autor es requerido').notEmpty();
        req.checkBody('pageCount', 'Cantidad de Páginas invalidas o no especificadas').notEmpty().isInt();
        req.checkBody('year', 'Año invalido o no especificado').notEmpty().isInt();
        req.checkBody('publisher', 'Editorial requerida').notEmpty();
        req.checkBody('genre', 'Género requerido').notEmpty();

        req.getValidationResult().then(result => {
          if (result.isEmpty()) {
            book.save(err => {
              if (err) {
                logger.error(err.message);
                res.status(500).send(err);
              } else {
                logger.info(`Libro ${book.ISBN} creado`);
                res.json({ message: `Libro ${book.ISBN} creado` });
              }
            });
          } else {
            res.status(400).json(result.array());
          }
        });
      }
    })
  })
  //Lista todos los libros segun filtros
  .get((req, res) => {
    Book.findByFilters(req.query, (err, books) => {
      if (err) {
        logger.error(err.message);
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  })
  //Borra todos los libros
  .delete((req, res) => {
    Book.remove({}, (err, book) => {
      if (err) {
        logger.error(err.message);
        res.status(500).send(err);
      } else {
        logger.info('Todos los libros fueron borrados');
        res.json({ message: 'Todos los libros fueron borrados' });
      }
    });
  });

router.route('/books/:isbn')
  // Trae un libro segun su ISBN
  .get((req, res) => {
    Book.findOne({ ISBN: req.params.isbn }, (err, book) => {
      if (err) {
        logger.error(err.message);
        res.status(500).send(err);
      } else {
        res.json(book);
      }
    });
  })
  // Actualiza los datos de un libro
  .put((req, res) => {
    Book.findOne({ ISBN: req.params.isbn }, (err, book) => {
      if (err) {
        logger.error(err.message);
        res.status(500).send(err);
      } else if (book) {
        delete req.body.ISBN; //No se puede modificar el ISBN

        req.body.pageCount ? req.checkBody('pageCount', 'Cantidad de Páginas invalidas').isInt() : undefined;
        req.body.year ? req.checkBody('year', 'Año invalido').isInt() : undefined;

        req.getValidationResult().then(result => {
          if (result.isEmpty()) {
            Object.assign(book, req.body);
            book.save((err) => {
              if (err) {
                logger.error(err.message);
                res.status(500).send(err);
              } else {
                logger.info(`Libro ${req.params.isbn} modificado`);
                res.json({ message: `Libro ${req.params.isbn} modificado` });
              }
            });
          } else {
            res.status(400).json(result.array());
          }
        });
      } else {
        res.status(400).json({ message: 'Libro inexistente' });
      }
    });
  })
  // Borra un libro
  .delete((req, res) => {
    //verifico que el libro exista
    Book.findOne({ ISBN: req.params.isbn }, (err, book) => {
      if (!book) {
        res.status(400).json({ message: 'El libro no existe' });
      } else {
        Book.remove({
          ISBN: req.params.isbn
        }, (err, book) => {
          if (err) {
            logger.error(err.message);
            res.status(500).send(err);
          } else {
            logger.info(`Libro ${req.params.isbn} borrado`);
            res.json({ message: `Libro ${req.params.isbn} borrado` });
          }
        });
      }
    });
  });

app.use('/api', router);

//Empieza a escuchar requests
mongo.connect(config.mongo).then(() => {
  app.listen(config.apiPort);
  logger.info(`Api escuchando en puerto ${config.apiPort}`);
});
