(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('MainController', function ($localStorage, CurrenciesService, SharedData)
            {
                var ctrl = this;

                ctrl.wallet = SharedData.wallet;
                ctrl.currencies = SharedData.currencies;
                ctrl.currencyIcons = SharedData.currencyIcons;
                ctrl.moneyStart = 10000;

                ctrl.setStartingValues = function ()
                {
                    SharedData.wallet.PLN = $localStorage.PLN || 0;
                    angular.forEach(SharedData.currencies, function(value) {
                        SharedData.wallet[value] = $localStorage[value] || 0;
                    });
                };
                ctrl.setStartingValues();

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
            });
})();
