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

                function setStartingValues() {
                    SharedData.wallet.PLN = $localStorage.PLN || 0;
                    angular.forEach(SharedData.currencies, function(value) {
                        SharedData.wallet[value] = $localStorage[value] || 0;
                    });
                }
                setStartingValues();

                ctrl.reset = function ()
                {
                    $localStorage.$reset();
                    setStartingValues();
                };

                ctrl.apply = function ()
                {
                    ctrl.reset();
                    SharedData.updateCurrency('PLN', ctrl.moneyStart);
                    ctrl.moneyStart = null;
                };

                CurrenciesService.selectedCurrencies().then(function(result){
                    ctrl.currencyData = result;
                });
            });
})();
