import angular from 'angular';
import uiRouter from 'angular-ui-router';
import modifyBooksComponent from './modifyBooks.component';

let modifyBooksModule = angular.module('modifyBooks', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $stateProvider
    .state('app.modifyBooks', {
      url: '/modifyBooks',
      component: 'modifyBooks'
    });
})

.component('modifyBooks', modifyBooksComponent)

.name;

export default modifyBooksModule;
