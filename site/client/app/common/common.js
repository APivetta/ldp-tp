import angular from 'angular';
import navbar from './navbar/navbar';
import booksAPI from './booksAPI/booksAPI';
import authorsAPI from './authorsAPI/authorsAPI';
import './common.scss';

let commonModule = angular.module('app.common', [
  navbar,
  booksAPI,
  authorsAPI
])

.name;

export default commonModule;
