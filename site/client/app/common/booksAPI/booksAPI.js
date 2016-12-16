import angular from 'angular';
import booksAPIFactory from './booksAPI.factory';

let booksAPIModule = angular.module('booksAPI', [])

.factory('booksAPI', booksAPIFactory)

.name;

export default booksAPIModule;
