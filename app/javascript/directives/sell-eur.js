(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .directive('sellEur', function ()
            {
                return {
                    restrict: 'E', templateUrl: 'templates/plnToEur/index.html', controller: function ($scope, $localStorage)
                    {

                        $scope.sellEur = false;
                        $scope.walletEur = true;
                        $scope.eur = 'eur';

                        function updateCurrency(type, value)
                        {
                            $scope.wallet[type] = value;
                            $localStorage[type] = value;
                        }

                        $scope.moneyEur = {value: null};
                        $scope.applySellEur = function (currencySellEur)
                        {
                            currencySellEur = $scope.getEur.rates[0].ask;
                            $scope.wallet.EUR += $scope.moneyEur.value / currencySellEur;
                            $scope.wallet.PLN -= $scope.moneyEur.value;
                            updateCurrency('EUR', $scope.wallet.EUR);
                            updateCurrency('PLN', $scope.wallet.PLN);
                        };

                        $scope.toggleSellEur = function ()
                        {
                            $scope.sellEur = !$scope.sellEur;
                        };
                    }
                };
            });
})();
