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
                    },
                    getEur: function ()
                    {
                        return $http.get('http://api.nbp.pl/api/exchangerates/rates/c/eur/today/?format=json')
                                .then(function (respone)
                                {
                                    var eurCurrency = respone.data;
                                    return eurCurrency;
                                });
                    },
                    getGbp: function ()
                    {
                        return $http.get('http://api.nbp.pl/api/exchangerates/rates/c/gbp/today/?format=json')
                                .then(function (respone)
                                {
                                    var gbpCurrency = respone.data;
                                    return gbpCurrency;
                                });
                    }
                };
            });

})();
