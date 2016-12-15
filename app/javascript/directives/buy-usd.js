(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .directive('buyUsd', function ()
            {
                return {

                    restrict: 'E', templateUrl: 'templates/usdToPln/index.html', controller: function ($scope, $localStorage)
                    {

                        $scope.buyUsd = false;
                        $scope.walletUsd = true;
                        $scope.usd = 'usd';

                        function updateCurrency(type, value)
                        {
                            $scope.wallet[type] = value;
                            $localStorage[type] = value;
                        }

                        $scope.moneyUsd = {value: null};
                        $scope.applyBuyUsd = function (currencyBuyUsd)
                        {
                            currencyBuyUsd = $scope.getUsd.rates[0].bid;
                            $scope.wallet.USD -= $scope.moneyUsd.value;
                            $scope.wallet.PLN += $scope.moneyUsd.value * currencyBuyUsd;
                            updateCurrency('USD', $scope.wallet.USD);
                            updateCurrency('PLN', $scope.wallet.PLN);
                        };

                        $scope.toggleBuyUsd = function ()
                        {
                            $scope.buyUsd = !$scope.buyUsd;
                        };
                    }
                };
            });
})();
