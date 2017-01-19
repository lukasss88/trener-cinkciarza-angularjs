(function ()
{
    'use strict';
    angular.module('cinkciarzTraining', ['ngStorage', 'ngRoute'])
            .config(function ($routeProvider)
            {
                $routeProvider.when('/', {
                    templateUrl: 'templates/main.html', controller: 'MainController',
                    controllerAs: 'mainCtrl'
                })
                        .when('/tableOfExchanges', {
                            templateUrl: 'templates/tableOfExchanges.html', controller: 'TableOfExchangesController as tableCtrl'
                        })
                        .when('/exchangeBox/:action/:currency', {
                            templateUrl: 'templates/exchangeBox.html', controller: 'ExchangeBoxController',
                            controllerAs: 'exchangeCtrl'
                        })
                        .when('/exchangeBox/:action/:currency', {
                            templateUrl: 'templates/exchangeBox.html', controller: 'ExchangeBoxController',
                            controllerAs: 'exchangeCtrl'
                        })
                        .otherwise({redirectTo: '/'});
            });
})();
