(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('MainController', function ($localStorage, CurrenciesService)
            {
                var ctrl = this;

                ctrl.wallet = {};
                ctrl.currencyBox = false;
                ctrl.moneyStart = null;

                function setStartingValues()
                {
                    ctrl.wallet.PLN = $localStorage.PLN || 0;
                    ctrl.wallet.GBP = $localStorage.GBP || 0;
                    ctrl.wallet.USD = $localStorage.USD || 0;
                    ctrl.wallet.EUR = $localStorage.EUR || 0;
                }

                function updateCurrency(type, value)
                {
                    ctrl.wallet[type] = value;
                    $localStorage[type] = value;
                }

                setStartingValues();

                ctrl.reset = function ()
                {
                    $localStorage.$reset();
                    ctrl.wallet = {};
                    setStartingValues();
                };

                ctrl.apply = function ()
                {
                    ctrl.reset();
                    updateCurrency('PLN', ctrl.moneyStart);
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

                ctrl.currencies = ['USD', 'EUR', 'GBP'];

                ctrl.currencyIcons = { USD:'$', EUR:'€', GBP:'£'};

                ctrl.toggleBox = function ()
                {
                    ctrl.currencyBox = !ctrl.currencyBox;
                    ctrl.addOpacity = !ctrl.addOpacity;
                };


                ctrl.money = {value: null};

                ctrl.selectCurrency = ctrl.currencies[0];

                ctrl.buyCurrency = function(type, selectCurrency)
                {
                    selectCurrency = ctrl.currency;
                    ctrl.wallet[type] = ctrl.wallet[selectCurrency];
                    ctrl.currencyBox = !ctrl.currencyBox;
                    ctrl.message = 'Wymiana ' + selectCurrency + ' na PLN';
                    ctrl.exchangeRate = ctrl[selectCurrency].rates[0].bid;
                    ctrl.addOpacity = !ctrl.addOpacity;
                    ctrl.btnBuy = false;
                    ctrl.currencyReceive = 'zł';
                    ctrl.currencyType = ctrl.currencyIcons[ctrl.currency];

                    ctrl.applyCurrency = function (exchangeRate)
                    {
                        exchangeRate = ctrl[selectCurrency].rates[0].bid;
                        ctrl.wallet[selectCurrency]-= parseFloat((ctrl.money.value).toFixed(2));
                        ctrl.wallet.PLN += parseFloat((ctrl.money.value * exchangeRate).toFixed(2));
                        updateCurrency(ctrl.currency, ctrl.wallet[selectCurrency]);
                        updateCurrency('PLN', ctrl.wallet.PLN);
                    };
                };

                ctrl.sellCurrency = function (type, selectCurrency)
                {
                    selectCurrency = ctrl.currency;
                    ctrl.wallet[type] = ctrl.wallet.PLN;
                    ctrl.currencyBox = !ctrl.currencyBox;
                    ctrl.message = 'Wymiana PLN na ' + selectCurrency;
                    ctrl.exchangeRate = ctrl[selectCurrency].rates[0].ask;
                    ctrl.addOpacity = !ctrl.addOpacity;
                    ctrl.btnBuy = true;
                    ctrl.currencyType = 'zł';
                    ctrl.currencyReceive = ctrl.currencyIcons[ctrl.currency];

                    ctrl.applyCurrency = function (exchangeRate)
                    {
                        exchangeRate = ctrl[selectCurrency].rates[0].ask;
                        ctrl.wallet[selectCurrency] += parseFloat((ctrl.money.value / exchangeRate).toFixed(2));
                        ctrl.wallet.PLN -= parseFloat((ctrl.money.value).toFixed(2));
                        updateCurrency(ctrl.currency, ctrl.wallet[selectCurrency]);
                        updateCurrency('PLN', ctrl.wallet.PLN);
                    };
                };

            });
})();
