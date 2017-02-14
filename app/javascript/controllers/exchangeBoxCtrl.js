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

                CurrenciesService.selectedCurrencies().then(function (result)
                {
                    ctrl.currencyData = result;

                    if ('buy' === $routeParams.action) {

                        ctrl.availableFunds = ctrl.wallet.PLN;
                        ctrl.exchangeRate = ctrl.currencyData[ctrl.currencyId].rates[0].ask;
                        ctrl.message = 'Wymiana PLN na ' + ctrl.currencyId;
                        ctrl.btnBuy = true;
                        ctrl.currencyReceive = SharedData.currencyIcons[ctrl.currencyId];
                        ctrl.currencyType = 'zł';
                    } else if ('sell' === $routeParams.action) {

                        ctrl.availableFunds = ctrl.wallet[ctrl.currencyId];
                        ctrl.exchangeRate = ctrl.currencyData[ctrl.currencyId].rates[0].bid;
                        ctrl.message = 'Wymiana ' + ctrl.currencyId + ' na PLN';
                        ctrl.btnBuy = false;
                        ctrl.currencyReceive = 'zł';
                        ctrl.currencyType = SharedData.currencyIcons[ctrl.currencyId];
                    }
                });

                ctrl.predictVal = function ()
                {
                    if ('buy' === $routeParams.action) {
                        ctrl.predictedValue = parseFloat((ctrl.money / ctrl.currencyData[ctrl.currencyId].rates[0].ask).toFixed(2));
                    }

                    else if ('sell' === $routeParams.action) {
                        ctrl.predictedValue = parseFloat((ctrl.money * ctrl.currencyData[ctrl.currencyId].rates[0].bid).toFixed(2));
                    }
                };

                ctrl.applyCurrency = function ()
                {
                    if ('buy' === ctrl.action) {
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
