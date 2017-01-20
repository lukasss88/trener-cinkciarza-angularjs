(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('MainController', function ($localStorage, CurrenciesService, SharedData)
            {
                var ctrl = this;

                ctrl.wallet = SharedData.wallet;
                ctrl.moneyStart = 10000;
                ctrl.currencies = SharedData.currencies;
                ctrl.currencyIcons = SharedData.currencyIcons;

                ctrl.setStartingValues = function ()
                {
                    SharedData.wallet.PLN = $localStorage.PLN || 0;
                    SharedData.wallet.GBP = $localStorage.GBP || 0;
                    SharedData.wallet.USD = $localStorage.USD || 0;
                    SharedData.wallet.EUR = $localStorage.EUR || 0;
                };
                ctrl.setStartingValues();

                SharedData.updateCurrency = ctrl.updateCurrency;
                SharedData.updateCurrency = function (type, value)
                {
                    ctrl.wallet[type] = value;
                    $localStorage[type] = value;
                };

                ctrl.reset = function ()
                {
                    $localStorage.$reset();
                    ctrl.setStartingValues();
                };

                ctrl.apply = function ()
                {
                    ctrl.reset();
                    SharedData.updateCurrency('PLN', ctrl.moneyStart);
                    ctrl.moneyStart = null;
                };

                angular.forEach(SharedData.currencies, function(value){

                    CurrenciesService.getCurrency(value).then(function (data)
                        {
                            ctrl[value] = data;
                        });
                });

                ctrl.buyCurrency = function (type)
                {
                    SharedData.wallet[type] = SharedData.wallet[ctrl.currency];
                    SharedData.exchangeRate = ctrl[ctrl.currency].rates[0].bid;
                };

                ctrl.sellCurrency = function (type)
                {
                    SharedData.wallet[type] = SharedData.wallet.PLN;
                    SharedData.exchangeRate = ctrl[ctrl.currency].rates[0].ask;
                };
            });
})();
