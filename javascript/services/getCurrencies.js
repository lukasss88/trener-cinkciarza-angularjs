(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .factory('CurrenciesService', function ($http)
            {
                return {
                    USD: function ()
                    {
                        return $http.get('http://api.nbp.pl/api/exchangerates/rates/c/usd/today/?format=json')
                                .then(function (response)
                                {
                                    return response.data;
                                });
                    },
                    EUR: function ()
                    {
                        return $http.get('http://api.nbp.pl/api/exchangerates/rates/c/eur/today/?format=json')
                                .then(function (respone)
                                {
                                    return respone.data;
                                });
                    },
                    GBP: function ()
                    {
                        return $http.get('http://api.nbp.pl/api/exchangerates/rates/c/gbp/today/?format=json')
                                .then(function (respone)
                                {
                                    return respone.data;
                                });
                    }
                };
            });

})();
