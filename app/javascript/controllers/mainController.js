(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('MainController', function ($localStorage, CurrenciesService, SharedData)
            {
                var ctrl = this;

                ctrl.wallet = SharedData.wallet;
                ctrl.moneyStart = SharedData.moneyStart;

                SharedData.setStartingValues = ctrl.setStartingValues;
                SharedData.setStartingValues = function(){
                    SharedData.wallet.PLN = $localStorage.PLN || 0;
                    SharedData.wallet.GBP = $localStorage.GBP || 0;
                    SharedData.wallet.USD = $localStorage.USD || 0;
                    SharedData.wallet.EUR = $localStorage.EUR || 0;
                };

                SharedData.updateCurrency = ctrl.updateCurrency;
                SharedData.updateCurrency = function(type,value) {
                    ctrl.wallet[type] = value;
                    $localStorage[type] = value;
                };

                SharedData.setStartingValues();

                SharedData.reset = ctrl.reset;
                ctrl.reset = function ()
                {
                    $localStorage.$reset();
                    SharedData.setStartingValues();
                };

                ctrl.apply = function ()
                {
                    ctrl.reset();
                    // SharedData.reset();
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
                });

                ctrl.currencies = SharedData.currencies;
                ctrl.currencyIcons = SharedData.currencyIcons;
                ctrl.money = SharedData.money;
                ctrl.message = SharedData.message;
                ctrl.exchangeRate = SharedData.exchangeRate;
                ctrl.btnBuy = SharedData.btnBuy;
                ctrl.currencyType = SharedData.currencyType;
                ctrl.currencyReceive = SharedData.currencyReceive;
                ctrl.currency = SharedData.currency;
                ctrl.applyCurrency = SharedData.applyCurrency;


                ctrl.buyCurrency = function(type, selectCurrency)
                {
                    selectCurrency = ctrl.currency;
                    ctrl.wallet[type] = SharedData.wallet[selectCurrency];
                    SharedData.message = 'Wymiana ' + selectCurrency + ' na PLN';
                    SharedData.exchangeRate = ctrl[selectCurrency].rates[0].bid;
                    SharedData.btnBuy = false;
                    SharedData.currencyReceive = 'zł';
                    SharedData.currencyType = ctrl.currencyIcons[ctrl.currency];
                    SharedData.applyCurrency = function (exchangeRate)
                    {
                        exchangeRate = ctrl[selectCurrency].rates[0].bid;
                        SharedData.wallet[selectCurrency]-= parseFloat((ctrl.money.value).toFixed(2));
                        SharedData.wallet.PLN += parseFloat((ctrl.money.value * exchangeRate).toFixed(2));
                        SharedData.updateCurrency(ctrl.currency, SharedData.wallet[selectCurrency]);
                        SharedData.updateCurrency('PLN', SharedData.wallet.PLN);
                    };
                };

                ctrl.sellCurrency = function (type, selectCurrency)
                {
                    selectCurrency = ctrl.currency;
                    ctrl.wallet[type] = SharedData.wallet.PLN;
                    SharedData.message = 'Wymiana PLN na ' + selectCurrency;
                    SharedData.exchangeRate = ctrl[selectCurrency].rates[0].ask;
                    SharedData.btnBuy = true;
                    SharedData.currencyType = 'zł';
                    SharedData.currencyReceive = ctrl.currencyIcons[ctrl.currency];
                    SharedData.applyCurrency = function (exchangeRate)
                    {
                        exchangeRate = ctrl[selectCurrency].rates[0].ask;
                        SharedData.wallet[selectCurrency] += parseFloat((SharedData.money.value / exchangeRate).toFixed(2));
                        SharedData.wallet.PLN -= parseFloat((SharedData.money.value).toFixed(2));
                        SharedData.updateCurrency(ctrl.currency, SharedData.wallet[selectCurrency]);
                        SharedData.updateCurrency('PLN', SharedData.wallet.PLN);
                    };
                };
            });
})();
