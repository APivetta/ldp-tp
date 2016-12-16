import angular from 'angular';
import uiRouter from 'angular-ui-router';
import inscriptionsComponent from './inscriptions.component';

let inscriptionsModule = angular.module('inscriptions', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('app.inscription', {
      url: '/inscription/{championshipId}',
      component: 'inscriptions'
    });
})

.component('inscriptions', inscriptionsComponent)

.name;

export default inscriptionsModule;
