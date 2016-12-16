import angular from 'angular';
import authorsAPIFactory from './authorsAPI.factory';

let authorsAPIModule = angular.module('authorsAPI', [])

.factory('authorsAPI', authorsAPIFactory)

.name;

export default authorsAPIModule;
