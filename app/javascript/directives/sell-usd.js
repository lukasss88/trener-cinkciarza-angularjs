(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .directive('sellUsd', function ()
            {
                return {
                    restrict: 'E', templateUrl: 'templates/plnToUsd/index.html', controller: function ($scope, $localStorage)
                    {

                        $scope.sellUsd = false;
                        $scope.walletUsd = true;
                        $scope.usd = 'usd';

                        function updateCurrency(type, value)
                        {
                            $scope.wallet[type] = value;
                            $localStorage[type] = value;
                        }

                        $scope.moneyUsd = {value: null};
                        $scope.applySellUsd = function (currencySellUsd)
                        {
                            currencySellUsd = $scope.getUsd.rates[0].ask;
                            $scope.wallet.USD += $scope.moneyUsd.value / currencySellUsd;
                            $scope.wallet.PLN -= $scope.moneyUsd.value;
                            updateCurrency('USD', $scope.wallet.USD);
                            updateCurrency('PLN', $scope.wallet.PLN);
                        };

                        $scope.toggleSellUsd = function ()
                        {
                            $scope.sellUsd = !$scope.sellUsd;
                        };
                    }
                };
            });
})();
