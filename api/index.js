'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./lib/config');
const mongo = require('./lib/mongo');
const logger = require('./lib/logger');
const Book = require('./lib/book');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
  res.json({ message: 'OK' });
});

router.use((req, res, next) => {
  console.log(req.body);
  next();
});

/*
Ruta				Verbo HTTP	Descripcion
/api/books			GET			Lista todos los libros segun filtros
/api/books			POST		Crea un nuevo libro
/api/books/:isbn	GET			Trae un libro
/api/books/:isbn	PUT			Actualiza un libro
/api/books/:isbn	DELETE		Borra un libro
*/

router.route('/books')
  //Crea un nuevo libro
  .post((req, res) => {
    const book = new Book(req.body);

    book.save(err => {
      if (err) {
        logger.error(err.message);
        res.send(err);
      } else {
        logger.info(`Book ${book.ISBN} created`);
        res.json({ message: `Book ${book.ISBN} created` });
      }
    });
  })
  //Lista todos los libros segun filtros
  .get((req, res) => {
    //TODO filtros
    Book.find((err, books) => {
      if (err) {
        logger.error(err.message);
        res.send(err);
      } else {
        res.json(books);
      }
    });
  });


router.route('/books/:isbn')
  // Trae un libro segun su ISBN
  .get((req, res) => {
    Book.findOne({ ISBN: req.params.isbn }, (err, book) => {
      if (err) {
        logger.error(err.message);
        res.send(err);
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
        res.send(err);
      } else {
        delete req.body.ISBN; //No se puede modificar el ISBN
        Object.assign(book, req.body);
        book.save((err) => {
          if (err) {
            logger.error(err.message);
            res.send(err);
          } else {
            logger.info(`Book ${book.ISBN} modified`);
            res.json({ message: `Book ${book.ISBN} modified` });
          }
        });
      }
    });
  })
  // Borra un libro
  .delete((req, res) => {
    Book.remove({
      ISBN: req.params.isbn
    }, (err, book) => {
      if (err) {
        logger.error(err.message);
        res.send(err);
      } else {
        logger.info(`Book ${book.ISBN} deleted`);
        res.json({ message: `Book ${book.ISBN} deleted` });
      }
    });
  });














app.use('/api', router);

//Empieza a escuchar requests
mongo.connect(config.mongo).then(() => {
  app.listen(config.apiPort);
  logger.info(`Api listening on port ${config.apiPort}`);
});
