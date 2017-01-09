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
                        .otherwise({redirectTo: '/'});
            });

})();
