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

bookSchema.statics.findByFilters = function(filters, cb) {
  const textfields = ['ISBN', 'title', 'authors', 'publisher', 'genre'];
  let query = {};

  textfields.forEach(field => {
    if (filters[field]) { query[field] = new RegExp(`^${filters[field]}$`, "i"); }
  });

  if (filters.year) { query.year = filters.year; }
  if (filters.pageCount) { query.pageCount = filters.pageCount; }

  //rango de años
  if (!filters.year && (filters.yearFrom || filters.yearTo)) {
    query.year = {};
    if (filters.yearFrom) { query.year.$gte = filters.yearFrom; }
    if (filters.yearTo) { query.year.$lte = filters.yearTo; }
  }

  if (!filters.title && filters.titlePattern) { query.title = new RegExp(`${filters.titlePattern}`, "i"); }
  if (!filters.authors && filters.authorsPattern) { query.authors = new RegExp(`${filters.authorsPattern}`, "i"); }

  return this.find(query, cb);
};

module.exports = mongoose.model('Book', bookSchema);
