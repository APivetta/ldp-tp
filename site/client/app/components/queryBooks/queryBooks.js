import angular from 'angular';
import uiRouter from 'angular-ui-router';
import queryBooksComponent from './queryBooks.component';

let queryBooksModule = angular.module('queryBooks', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $stateProvider
    .state('app.queryBooks', {
      url: '/queryBooks',
      component: 'queryBooks'
    });
})

.component('queryBooks', queryBooksComponent)

.name;

export default queryBooksModule;
