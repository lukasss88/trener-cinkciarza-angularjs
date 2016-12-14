(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .directive('buyEur', function ()
            {
                return {
                    restrict: 'E', templateUrl: 'templates/eurToPln/index.html', controller: function ($scope, $localStorage)
                    {

                        $scope.buyEur = false;
                        $scope.walletEur = true;
                        $scope.eur = 'eur';

                        function updateCurrency(type, value)
                        {
                            $scope.wallet[type] = value;
                            $localStorage[type] = value;
                        }

                        $scope.moneyEur = {value: null};
                        $scope.applyBuyEur = function (currencyBuyEur)
                        {
                            currencyBuyEur = $scope.getEur.rates[0].bid;
                            $scope.wallet.EUR -= $scope.moneyEur.value;
                            $scope.wallet.PLN += $scope.moneyEur.value * currencyBuyEur;
                            updateCurrency('EUR', $scope.wallet.EUR);
                            updateCurrency('PLN', $scope.wallet.PLN);
                        };

                        $scope.toggleBuyEur = function ()
                        {
                            $scope.buyEur = !$scope.buyEur;
                        };
                    }
                };
            });
})();


