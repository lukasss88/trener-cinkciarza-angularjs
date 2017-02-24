(function ()
{
    'use strict';
    function ExchangeBoxController (SharedData, $routeParams, CurrenciesService, WalletDAO)
            {
                var ctrl = this;
                ctrl.currencyId = $routeParams.currency;
                ctrl.wallet = SharedData.wallet;
                var test;

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
                    if ('buy' === $routeParams.action) {
                        SharedData.wallet[ctrl.currencyId] += parseFloat((ctrl.money / ctrl.currencyData[ctrl.currencyId].rates[0].ask).toFixed(2));
                        SharedData.wallet.PLN -= parseFloat((ctrl.money).toFixed(2));
                        SharedData.updateCurrency(ctrl.currencyId, SharedData.wallet[ctrl.currencyId]);
                        SharedData.updateCurrency('PLN', SharedData.wallet.PLN);

                        test = {PLN: ctrl.money};
                        test[ctrl.currencyId] = SharedData.wallet[ctrl.currencyId];
                        WalletDAO.update(test,'buy').then(function (data)
                        {
                            // ctrl.wallet = data.result;
                            console.log('witam pana');
                        });
                    }

                    else if ('sell' === $routeParams.action) {
                        SharedData.wallet[ctrl.currencyId] -= parseFloat((ctrl.money).toFixed(2));
                        SharedData.wallet.PLN += parseFloat((ctrl.money * ctrl.currencyData[ctrl.currencyId].rates[0].bid).toFixed(2));
                        SharedData.updateCurrency(ctrl.currencyId, SharedData.wallet[ctrl.currencyId]);
                        SharedData.updateCurrency('PLN', SharedData.wallet.PLN);
                        test = {PLN: ctrl.money};
                        test[ctrl.currencyId] = SharedData.wallet[ctrl.currencyId];
                        WalletDAO.update(test,'sell').then(function (data)
                        {
                            // ctrl.wallet = data.result;
                            console.log('witam pana');
                        });
                    }
                };
            }

    angular.module('cinkciarzTraining').controller('ExchangeBoxController', ['SharedData', '$routeParams', 'CurrenciesService', 'WalletDAO', ExchangeBoxController]);
})();
