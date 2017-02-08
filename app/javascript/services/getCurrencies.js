(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .factory('CurrenciesService', function ($http, SharedData)
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
                    angular.forEach(SharedData.currencies, function(value){
                        getCurrency(value).then(function (data)
                        {
                            selectedCurr[value] = data;
                        });
                    });

                    return selectedCurr;
                }

                return {
                    getCurrency: getCurrency,
                    allCurrencies: allCurrencies,
                    selectedCurrencies: selectedCurrencies
                };
            });
})();
