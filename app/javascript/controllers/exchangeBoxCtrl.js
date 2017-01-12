(function(){
    'use strict';
    angular.module('cinkciarzTraining')
            .controller('ExchangeBoxController', function ($localStorage, CurrenciesService, SharedData)
            {
               var ctrl = this;
                ctrl.wallet = SharedData.wallet;
                ctrl.moneyStart = SharedData.moneyStart;
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
            });
})();
