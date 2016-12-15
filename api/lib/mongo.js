'use strict';

const q = require('q');
const mongoose = require('mongoose');
const logger = require('./logger');

const connect = dbAddr => {
  const deferred = q.defer();
  const db = mongoose.connection;

  mongoose.connect(dbAddr);
  db.on('error', () => {
    logger.error('Error al conectarse a la base de datos')
    deferred.reject();
  });
  db.once('open', function() {
    logger.info('Conectado')
    deferred.resolve();
  });

  return deferred.promise;
}

module.exports = {
  connect
}
