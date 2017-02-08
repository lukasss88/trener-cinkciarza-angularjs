(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('ExchangeBoxController', function (SharedData, $routeParams, CurrenciesService)
            {
                var ctrl = this;
                ctrl.currencyId = $routeParams.currency;
                ctrl.wallet = SharedData.wallet;
                ctrl.action = $routeParams.action;

                ctrl.currencyData = CurrenciesService.selectedCurrencies();

                if ('buy' === $routeParams.action) {

                    ctrl.message = 'Wymiana PLN na ' + ctrl.currencyId;
                    ctrl.btnBuy = true;
                    ctrl.currencyReceive = SharedData.currencyIcons[ctrl.currencyId];
                    ctrl.currencyType = 'zł';

                }
                if ('sell' === $routeParams.action) {

                    ctrl.message = 'Wymiana ' + ctrl.currencyId + ' na PLN';
                    ctrl.btnBuy = false;
                    ctrl.currencyReceive = 'zł';
                    ctrl.currencyType = SharedData.currencyIcons[ctrl.currencyId];

                }

                ctrl.applyCurrency = function ()
                {
                    if ('buy' === $routeParams.action) {
                        SharedData.wallet[ctrl.currencyId] += parseFloat((ctrl.money / ctrl.currencyData[ctrl.currencyId].rates[0].ask).toFixed(2));
                        SharedData.wallet.PLN -= parseFloat((ctrl.money).toFixed(2));
                        SharedData.updateCurrency(ctrl.currencyId, SharedData.wallet[ctrl.currencyId]);
                        SharedData.updateCurrency('PLN', SharedData.wallet.PLN);
                    }

                    else if ('sell' === $routeParams.action) {
                        SharedData.wallet[ctrl.currencyId] -= parseFloat((ctrl.money).toFixed(2));
                        SharedData.wallet.PLN += parseFloat((ctrl.money * ctrl.currencyData[ctrl.currencyId].rates[0].bid).toFixed(2));
                        SharedData.updateCurrency(ctrl.currencyId, SharedData.wallet[ctrl.currencyId]);
                        SharedData.updateCurrency('PLN', SharedData.wallet.PLN);
                    }
                };
            });
})();
