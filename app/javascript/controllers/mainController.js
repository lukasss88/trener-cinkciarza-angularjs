(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('MainController', function ($localStorage, CurrenciesService, SharedData)
            {
                var ctrl = this;

                ctrl.wallet = SharedData.wallet;
                ctrl.moneyStart = 10000;

                SharedData.setStartingValues = ctrl.setStartingValues;
                SharedData.setStartingValues = function(){
                    SharedData.wallet.PLN = $localStorage.PLN || 0;
                    SharedData.wallet.GBP = $localStorage.GBP || 0;
                    SharedData.wallet.USD = $localStorage.USD || 0;
                    SharedData.wallet.EUR = $localStorage.EUR || 0;
                    // SharedData.wallet = {
                    //     PLN : $localStorage.PLN || 0,
                    //     GBP : $localStorage.GBP || 0,
                    //     USD : $localStorage.USD || 0,
                    //     EUR : $localStorage.EUR || 0
                    // };
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


                ctrl.buyCurrency = function(type)
                {
                    ctrl.wallet[type] = SharedData.wallet[ctrl.currency];
                    SharedData.message = 'Wymiana ' + ctrl.currency + ' na PLN';
                    SharedData.exchangeRate = ctrl[ctrl.currency].rates[0].bid;
                    SharedData.btnBuy = false;
                    SharedData.currencyReceive = 'zł';
                    SharedData.currencyType = ctrl.currencyIcons[ctrl.currency];
                    SharedData.applyCurrency = function (exchangeRate)
                    {
                        exchangeRate = ctrl[ctrl.currency].rates[0].bid;
                        SharedData.wallet[ctrl.currency]-= parseFloat((ctrl.money.value).toFixed(2));
                        SharedData.wallet.PLN += parseFloat((ctrl.money.value * exchangeRate).toFixed(2));
                        SharedData.updateCurrency(ctrl.currency, SharedData.wallet[ctrl.currency]);
                        SharedData.updateCurrency('PLN', SharedData.wallet.PLN);
                    };
                };

                ctrl.sellCurrency = function (type)
                {
                    ctrl.wallet[type] = SharedData.wallet.PLN;
                    SharedData.message = 'Wymiana PLN na ' + ctrl.currency;
                    SharedData.exchangeRate = ctrl[ctrl.currency].rates[0].ask;
                    SharedData.btnBuy = true;
                    SharedData.currencyType = 'zł';
                    SharedData.currencyReceive = ctrl.currencyIcons[ctrl.currency];
                    SharedData.applyCurrency = function (exchangeRate)
                    {
                        exchangeRate = ctrl[ctrl.currency].rates[0].ask;
                        SharedData.wallet[ctrl.currency] += parseFloat((SharedData.money.value / exchangeRate).toFixed(2));
                        SharedData.wallet.PLN -= parseFloat((SharedData.money.value).toFixed(2));
                        SharedData.updateCurrency(ctrl.currency, SharedData.wallet[ctrl.currency]);
                        SharedData.updateCurrency('PLN', SharedData.wallet.PLN);
                    };
                };
            });
})();
