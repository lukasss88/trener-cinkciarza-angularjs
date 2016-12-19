(function ()
{
    'use strict';
    angular.module('treningCinkciarza')
            .directive('exchangeBox', function ()
            {
                return {
                    restrict: 'E', templateUrl: 'templates/test.html', controller: function ($scope, $localStorage)
                    {

                        $scope.toggleBox = function ()
                        {
                            $scope.currencyBox = !$scope.currencyBox;
                        };

                        function updateCurrency(type, value)
                        {
                            $scope.wallet[type] = value;
                            $localStorage[type] = value;
                        }

                        $scope.money = {value: null};

                        $scope.sellUsd = function (type)
                        {

                            $scope.applyCurrency = function (exchangeRate)
                            {
                                exchangeRate = $scope.getUsd.rates[0].ask;
                                $scope.wallet.USD += parseFloat(($scope.money.value / exchangeRate).toFixed(2));
                                $scope.wallet.PLN -= parseFloat(($scope.money.value).toFixed(2));
                                updateCurrency('USD', $scope.wallet.USD);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.wallet[type] = $scope.wallet.PLN;
                            $scope.currencyBox = !$scope.currencyBox;
                            $scope.message = 'Wymiana PLN na USD';
                            $scope.exchangeRate = $scope.getUsd.rates[0].ask;
                            $scope.currencyType = 'zl';
                            $scope.currencyReceive = '$';
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = true;
                        };

                        $scope.buyUsd = function (type)
                        {

                            $scope.applyCurrency = function (exchangeRate)
                            {
                                $scope.exchangeRate = $scope.getUsd.rates[0].bid;
                                $scope.wallet.USD -= parseFloat(($scope.money.value).toFixed(2));
                                $scope.wallet.PLN += parseFloat(($scope.money.value * exchangeRate).toFixed(2));
                                updateCurrency('USD', $scope.wallet.USD);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.wallet[type] = $scope.wallet.USD;
                            $scope.currencyBox = !$scope.currencyBox;
                            $scope.message = 'Wymiana USD na PLN';
                            $scope.exchangeRate = $scope.getUsd.rates[0].bid;
                            $scope.currencyType = '$';
                            $scope.currencyReceive = 'zl';
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = false;
                        };

                        $scope.buyEur = function (type)
                        {

                            $scope.applyCurrency = function (exchangeRate)
                            {
                                exchangeRate = $scope.getEur.rates[0].bid;
                                $scope.wallet.EUR -= parseFloat(($scope.money.value).toFixed(2));
                                $scope.wallet.PLN += parseFloat(($scope.money.value * exchangeRate).toFixed(2));
                                updateCurrency('EUR', $scope.wallet.EUR);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.wallet[type] = $scope.wallet.EUR;
                            $scope.currencyBox = !$scope.currencyBox;
                            $scope.message = 'Wymiana EURO na PLN';
                            $scope.exchangeRate = $scope.getEur.rates[0].bid;
                            $scope.currencyType = '€';
                            $scope.currencyReceive = 'zl';
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = false;
                        };

                        $scope.sellEur = function (type)
                        {

                            $scope.applyCurrency = function (exchangeRate)
                            {
                                exchangeRate = $scope.getEur.rates[0].ask;
                                $scope.wallet.EUR += parseFloat(($scope.money.value / exchangeRate).toFixed(2));
                                $scope.wallet.PLN -= parseFloat(($scope.money.value).toFixed(2));
                                updateCurrency('EUR', $scope.wallet.EUR);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.wallet[type] = $scope.wallet.PLN;
                            $scope.currencyBox = !$scope.currencyBox;
                            $scope.message = 'Wymiana PLN na EURO';
                            $scope.exchangeRate = $scope.getEur.rates[0].ask;
                            $scope.currencyType = 'zl';
                            $scope.currencyReceive = '€';
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = true;
                        };

                        $scope.sellGbp = function (type)
                        {

                            $scope.applyCurrency = function (exchangeRate)
                            {
                                exchangeRate = $scope.getGbp.rates[0].ask;
                                $scope.wallet.GBP += parseFloat(($scope.money.value / exchangeRate).toFixed(2));
                                $scope.wallet.PLN -= parseFloat(($scope.money.value).toFixed(2));
                                updateCurrency('GBP', $scope.wallet.GBP);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.wallet[type] = $scope.wallet.PLN;
                            $scope.currencyBox = !$scope.currencyBox;
                            $scope.message = 'Wymiana PLN na GBP';
                            $scope.exchangeRate = $scope.getGbp.rates[0].ask;
                            $scope.currencyType = 'zl';
                            $scope.currencyReceive = '£';
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = true;
                        };

                        $scope.buyGbp = function (type)
                        {

                            $scope.applyCurrency = function (exchangeRate)
                            {
                                exchangeRate = $scope.getGbp.rates[0].bid;
                                $scope.wallet.GBP -= parseFloat(($scope.money.value).toFixed(2));
                                $scope.wallet.PLN += parseFloat(($scope.money.value * exchangeRate).toFixed(2));
                                updateCurrency('GBP', $scope.wallet.GBP);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.wallet[type] = $scope.wallet.GBP;
                            $scope.currencyBox = !$scope.currencyBox;
                            $scope.message = 'Wymiana GBP na PLN';
                            $scope.exchangeRate = $scope.getGbp.rates[0].bid;
                            $scope.currencyType = '£';
                            $scope.currencyReceive = 'zl';
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = false;
                        };



                    }
                };
            });
})();
