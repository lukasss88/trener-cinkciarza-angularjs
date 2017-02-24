(function ()
{
    'use strict';
    function MainController($localStorage, CurrenciesService, SharedData, WalletDAO)
    {
        var ctrl = this;

        ctrl.wallet = SharedData.wallet;
        ctrl.currencies = SharedData.currencies;
        ctrl.currencyIcons = SharedData.currencyIcons;
        ctrl.moneyStart = 10000;

        function setStartingValues()
        {
            SharedData.wallet.PLN = $localStorage.PLN || 0;
            angular.forEach(SharedData.currencies, function (value)
            {
                ctrl.wallet[value] = $localStorage[value] || 0;
            });


        }

        setStartingValues();


        // WalletDAO.query().then(function(data){
        //     ctrl.wallet = data.result;
        // });

        ctrl.reset = function ()
        {
            $localStorage.$reset();
            setStartingValues();
            // WalletDAO.delete();
            // WalletDAO.query();
        };

        ctrl.apply = function ()
        {
            ctrl.reset();
            SharedData.updateCurrency('PLN', ctrl.moneyStart);
            WalletDAO.save({PLN: ctrl.moneyStart}).then(function (data)
            {
                ctrl.wallet = data.result;
            });

            ctrl.moneyStart = null;
        };

        //TODO MOVE THIS FUNCTION TO SERVICE
        // ctrl.getWallet = function ()
        // {
        //     WalletDAO.query().then(function (data)
        //     {
        //         ctrl.wallet = data.result;
        //     });
        // };

        CurrenciesService.selectedCurrencies().then(function (result)
        {
            ctrl.currencyData = result;
        });
    }

    angular.module('cinkciarzTraining').controller('MainController', ['$localStorage', 'CurrenciesService', 'SharedData', 'WalletDAO', MainController]);
})();
