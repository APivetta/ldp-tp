'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  ISBN: String,
  title: String,
  authors: [String],
  pageCount: Number,
  year: Number,
  publisher: String,
  genre: String
});

module.exports = mongoose.model('Book', bookSchema);