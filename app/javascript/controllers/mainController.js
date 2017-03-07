(function ()
{
    'use strict';
    function MainController(CurrenciesService, SharedData, WalletDAO)
    {
        var ctrl = this;

        ctrl.currencies = SharedData.currencies;
        ctrl.currencyIcons = SharedData.currencyIcons;
        ctrl.moneyStart = 10000;

        WalletDAO.query().then(function(data){

            ctrl.wallet = data;

            console.log(data);
        });

        ctrl.reset = function ()
        {
            WalletDAO.delete();
            WalletDAO.query();
        };

        ctrl.apply = function ()
        {
            ctrl.reset();

            WalletDAO.save({PLN: ctrl.moneyStart}).then(function ()
            {
                WalletDAO.query().then(function(data){
                    console.log();
                    ctrl.wallet.PLN = data.PLN;
                });
            });

            ctrl.moneyStart = null;
        };

        CurrenciesService.selectedCurrencies().then(function (result)
        {
            ctrl.currencyData = result;
        });
    }

    angular.module('cinkciarzTraining').controller('MainController', ['CurrenciesService', 'SharedData', 'WalletDAO', MainController]);
})();
