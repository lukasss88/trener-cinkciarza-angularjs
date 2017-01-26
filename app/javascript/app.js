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
                            templateUrl: 'templates/tableOfExchanges.html', controller: 'TableOfExchangesController',
                            controllerAs: 'tableCtrl'
                        })
                        .when('/exchangeBox/:action/:currency', {
                            templateUrl: 'templates/exchangeBox.html', controller: 'ExchangeBoxController',
                            controllerAs: 'exchangeCtrl'
                        })
                        .otherwise({redirectTo: '/'});
            });
})();
