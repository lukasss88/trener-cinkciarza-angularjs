(function ()
{
    'use strict';
    function ExchangeBoxController(SharedData, $routeParams, CurrenciesService, WalletDAO)
    {
        var ctrl = this;
        ctrl.currencyId = $routeParams.currency;

        WalletDAO.query().then(function(data){
            ctrl.wallet = data;
            console.log(data);
        });


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
            var wallet;

            if ('buy' === $routeParams.action) {
                wallet.PLN =ctrl.money;
                wallet[ctrl.currencyId] = parseFloat((ctrl.money / ctrl.currencyData[ctrl.currencyId].rates[0].ask).toFixed(2));
                WalletDAO.update(wallet, 'buy');
            }

            else if ('sell' === $routeParams.action) {

                wallet = {PLN: parseFloat((ctrl.money * ctrl.currencyData[ctrl.currencyId].rates[0].bid).toFixed(2))};
                wallet[ctrl.currencyId] = ctrl.money;
                WalletDAO.update(wallet, 'sell');
            }
        };
    }

    angular.module('cinkciarzTraining').controller('ExchangeBoxController',
            ['SharedData', '$routeParams', 'CurrenciesService', 'WalletDAO', ExchangeBoxController]);
})();
