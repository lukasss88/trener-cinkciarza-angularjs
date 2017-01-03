(function ()
{
    'use strict';
    angular.module('cinkciarzTraining')
            .directive('exchangeBox', function ()
            {
                return {
                    restrict: 'E', templateUrl: 'templates/transactions.html', controller: function ($scope, $localStorage)
                    {

                        $scope.toggleBox = function ()
                        {
                            $scope.currencyBox = !$scope.currencyBox;
                            $scope.addOpacity = !$scope.addOpacity;
                        };

                        function updateCurrency(type, value)
                        {
                            $scope.wallet[type] = value;
                            $localStorage[type] = value;
                        }

                        $scope.money = {value: null};

                        $scope.selectCurrency = $scope.currencies[0];

                        $scope.buyCurrency = function(type, selectCurrency) {

                            selectCurrency = $scope.currency;
                            $scope.wallet[type] = $scope.wallet[selectCurrency];
                            $scope.currencyBox = !$scope.currencyBox;
                            $scope.message = 'Wymiana ' + selectCurrency + ' na PLN';
                            $scope.exchangeRate = $scope[selectCurrency].rates[0].bid;
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = false;
                            $scope.currencyReceive = 'zł';
                            $scope.currencyType = $scope.currencyIcons[$scope.currency];

                            $scope.applyCurrency = function (exchangeRate)
                            {
                                exchangeRate = $scope[selectCurrency].rates[0].bid;
                                $scope.wallet[selectCurrency]-= parseFloat(($scope.money.value).toFixed(2));
                                $scope.wallet.PLN += parseFloat(($scope.money.value * exchangeRate).toFixed(2));
                                updateCurrency($scope.currency, $scope.wallet[selectCurrency]);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };
                        };

                        $scope.sellCurrency = function (type, selectCurrency)
                        {
                            selectCurrency = $scope.currency;
                            $scope.wallet[type] = $scope.wallet.PLN;
                            $scope.currencyBox = !$scope.currencyBox;
                            $scope.message = 'Wymiana PLN na ' + selectCurrency;
                            $scope.exchangeRate = $scope[selectCurrency].rates[0].ask;
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = true;
                            $scope.currencyType = 'zł';
                            $scope.currencyReceive = $scope.currencyIcons[$scope.currency];

                            $scope.applyCurrency = function (exchangeRate)
                            {
                                exchangeRate = $scope[selectCurrency].rates[0].ask;
                                $scope.wallet[selectCurrency] += parseFloat(($scope.money.value / exchangeRate).toFixed(2));
                                $scope.wallet.PLN -= parseFloat(($scope.money.value).toFixed(2));
                                updateCurrency($scope.currency, $scope.wallet[selectCurrency]);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                        };
                    }
                };
            });
})();
