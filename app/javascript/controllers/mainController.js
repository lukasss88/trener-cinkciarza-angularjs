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
                ctrl.money = SharedData.money;

                SharedData.setStartingValues = ctrl.setStartingValues;
                SharedData.setStartingValues = function(){
                    SharedData.wallet.PLN = $localStorage.PLN || 0;
                    SharedData.wallet.GBP = $localStorage.GBP || 0;
                    SharedData.wallet.USD = $localStorage.USD || 0;
                    SharedData.wallet.EUR = $localStorage.EUR || 0;
                };
                SharedData.setStartingValues();

                SharedData.updateCurrency = ctrl.updateCurrency;
                SharedData.updateCurrency = function(type,value) {
                    ctrl.wallet[type] = value;
                    $localStorage[type] = value;
                };

                SharedData.reset = ctrl.reset;
                ctrl.reset = function ()
                {
                    $localStorage.$reset();
                    SharedData.setStartingValues();
                };

                ctrl.apply = function ()
                {
                    ctrl.reset();
                    SharedData.updateCurrency('PLN', ctrl.moneyStart);
                    ctrl.moneyStart = null;
                };

                CurrenciesService.USD().then(function (data)
                {
                    ctrl.USD = data;
                });

                CurrenciesService.EUR().then(function (data)
                {
                    ctrl.EUR = data;
                });

                CurrenciesService.GBP().then(function (data)
                {
                    ctrl.GBP = data;
                    console.log(ctrl.GBP.rates[0].bid);
                });

                ctrl.buyCurrency = function(type)
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
