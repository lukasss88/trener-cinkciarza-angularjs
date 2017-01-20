(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('ExchangeBoxController', function ($localStorage, CurrenciesService, SharedData, $routeParams)
            {
                var ctrl = this;
                ctrl.currencyId = $routeParams.currency;
                ctrl.wallet = SharedData.wallet;
                SharedData.wallet.PLN = ctrl.wallet.PLN;
                ctrl.money = SharedData.money;
                ctrl.exchangeRate = SharedData.exchangeRate;

                if ($routeParams.action === 'buy') {

                    ctrl.message = 'Wymiana PLN na ' + ctrl.currencyId;
                    ctrl.btnBuy = true;
                    ctrl.currencyReceive = SharedData.currencyIcons[ctrl.currencyId];
                    ctrl.currencyType = 'zł';

                    ctrl.applyCurrency = function ()
                    {
                        SharedData.wallet[ctrl.currencyId] += parseFloat((SharedData.money.value / SharedData.exchangeRate).toFixed(2));
                        SharedData.wallet.PLN -= parseFloat((SharedData.money.value).toFixed(2));
                        SharedData.updateCurrency(ctrl.currencyId, SharedData.wallet[ctrl.currencyId]);
                        SharedData.updateCurrency('PLN', SharedData.wallet.PLN);
                    };
                }
                if ($routeParams.action === 'sell') {

                    ctrl.message = 'Wymiana ' + ctrl.currencyId + ' na PLN';
                    ctrl.btnBuy = false;
                    ctrl.currencyReceive = 'zł';
                    ctrl.currencyType = SharedData.currencyIcons[ctrl.currencyId];

                    ctrl.applyCurrency = function ()
                    {
                        SharedData.wallet[ctrl.currencyId] -= parseFloat((SharedData.money.value).toFixed(2));
                        SharedData.wallet.PLN += parseFloat((SharedData.money.value * SharedData.exchangeRate).toFixed(2));
                        SharedData.updateCurrency(ctrl.currencyId, SharedData.wallet[ctrl.currencyId]);
                        SharedData.updateCurrency('PLN', SharedData.wallet.PLN);
                    };
                }
            });
})();
