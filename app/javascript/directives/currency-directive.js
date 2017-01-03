/**
 * Created by student on 02.01.17.
 */
(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .directive('currencyDirective', function ()
            {
                return {
                    restrict: 'E', scope: {currencies: '@'}, templateUrl: 'templates/currency-directive.html'
                };
            });
}
)();


