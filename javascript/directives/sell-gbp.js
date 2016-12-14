(function() {
    'use strict';
    angular.module('treningCinkciarza')
            .directive('sellGbp', function() {
                return {
                    restrict: 'E',
                    templateUrl: 'templates/plnToGbp/index.html',
                    controller: function($scope, $localStorage) {

                        $scope.sellGbp = false;
                        $scope.walletGbp = true;
                        $scope.gbp = 'gbp';

                        function updateCurrency(type, value)
                        {
                            $scope.wallet[type] = value;
                            $localStorage[type] = value;
                        }

                        $scope.moneyGbp = {value: null};
                        $scope.applySellGbp = function (currencySellGbp)
                        {
                            currencySellGbp = $scope.getGbp.rates[0].ask;
                            $scope.wallet.GBP += $scope.moneyGbp.value / currencySellGbp;
                            $scope.wallet.PLN -= $scope.moneyGbp.value;
                            updateCurrency('GBP', $scope.wallet.GBP);
                            updateCurrency('PLN', $scope.wallet.PLN);
                        };

                        $scope.toggleSellGbp = function() {
                            $scope.sellGbp = !$scope.sellGbp;
                        };
                    }
                };
            });
})();
