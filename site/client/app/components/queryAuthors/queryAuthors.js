import angular from 'angular';
import uiRouter from 'angular-ui-router';
import queryAuthorsComponent from './queryAuthors.component';

let queryAuthorsModule = angular.module('queryAuthors', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $stateProvider
    .state('app.queryAuthors', {
      url: '/queryAuthors',
      component: 'queryAuthors'
    });
})

.component('queryAuthors', queryAuthorsComponent)

.name;

export default queryAuthorsModule;
