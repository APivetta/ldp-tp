import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import QueryBooks from './queryBooks/queryBooks';
import QueryAuthors from './queryAuthors/queryAuthors';
import ModifyBooks from './modifyBooks/modifyBooks';

let componentModule = angular.module('app.components', [
  Home,
  About,
  QueryBooks,
  QueryAuthors,
  ModifyBooks
])

.name;

export default componentModule;
