import angular from 'angular';
import uiRouter from 'angular-ui-router';
import adminBooksComponent from './adminBooks.component';

let adminBooksModule = angular.module('adminBooks', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $stateProvider
    .state('app.adminBooks', {
      url: '/adminBooks',
      component: 'adminBooks'
    });
})

.component('adminBooks', adminBooksComponent)

.name;

export default adminBooksModule;
