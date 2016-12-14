(function() {
    'use strict';
    angular.module('treningCinkciarza')
            .directive('buyGbp', function() {
                return {
                    restrict: 'E',
                    templateUrl: 'templates/gbpToPln/index.html',
                    controller: function($scope, $localStorage) {

                        $scope.buyGbp = false;
                        $scope.walletGbp = true;
                        $scope.gbp = 'gbp';

                        function updateCurrency(type, value)
                        {
                            $scope.wallet[type] = value;
                            $localStorage[type] = value;
                        }

                        $scope.moneyGbp = {value: null};
                        $scope.applyBuyGbp = function (currencyBuyGbp)
                        {
                            currencyBuyGbp = $scope.getGbp.rates[0].bid;
                            $scope.wallet.GBP -= $scope.moneyGbp.value;
                            $scope.wallet.PLN += $scope.moneyGbp.value * currencyBuyGbp;
                            updateCurrency('GBP', $scope.wallet.GBP);
                            updateCurrency('PLN', $scope.wallet.PLN);
                        };

                        $scope.toggleBuyGbp = function() {
                            $scope.buyGbp = !$scope.buyGbp;
                        };
                    }
                };
        });

})();
