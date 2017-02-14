(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .factory('CurrenciesService', function ($http, SharedData, $q)
            {
                function getCurrency(currency)
                {
                    return $http.get('https://api.nbp.pl/api/exchangerates/rates/c/' + currency + '/today/?format=json')
                            .then(function (respone)
                            {
                                return respone.data;
                            });
                }

                function allCurrencies()
                {
                    return $http.get('https://api.nbp.pl/api/exchangerates/tables/c/?format=json')
                            .then(function (response)
                            {
                                return response.data;
                            });
                }

                function selectedCurrencies()
                {
                    var selectedCurr = {};

                    var promises = SharedData.currencies.map(function (value)
                    {
                        return getCurrency(value).then(function (data)
                        {
                            selectedCurr[value] = data;
                        });
                    });

                    return $q.all(promises).then(function(){
                        return selectedCurr;
                    });
                }

                return {
                    getCurrency: getCurrency, allCurrencies: allCurrencies, selectedCurrencies: selectedCurrencies
                };
            });
})();
