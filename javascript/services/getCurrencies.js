(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .factory('CurrenciesService', function ($http)
            {
                return {
                    getCurrency: function (currency)
                    {
                        return $http.get('https://api.nbp.pl/api/exchangerates/rates/c/'+currency+'/today/?format=json')
                                .then(function (respone)
                                {
                                    return respone.data;
                                });
                    },
                    allCurrencies: function ()
                    {
                        return $http.get('https://api.nbp.pl/api/exchangerates/tables/c/?format=json')
                                .then(function (response)
                                {
                                    return response.data;
                                });
                    }
                };
            });
})();
