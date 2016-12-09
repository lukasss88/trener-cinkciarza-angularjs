(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .factory('CurrenciesService', function ($http)
            {
                return {
                    getUsd: function ()
                    {
                        return $http.get('http://api.nbp.pl/api/exchangerates/rates/c/usd/today/?format=json')
                                .then(function (response)
                                {
                                    var usdCurrency = response.data;

                                    return usdCurrency;
                                });
                    }
                };
            });

})();
