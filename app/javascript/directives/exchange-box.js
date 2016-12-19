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
                            $scope.wallet[type] = $scope.wallet.PLN;

                            $scope.currencyBox = !$scope.currencyBox;

                            $scope.applyCurrency = function (currencySellUsd)
                            {
                                currencySellUsd = $scope.getUsd.rates[0].ask;
                                $scope.wallet.USD += parseFloat(($scope.money.value / currencySellUsd).toFixed(2));
                                $scope.wallet.PLN -= parseFloat(($scope.money.value).toFixed(2));
                                updateCurrency('USD', $scope.wallet.USD);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.message = 'Wymiana PLN na USD';
                            $scope.currencyValue = $scope.getUsd.rates[0].ask;
                            $scope.currencyType = 'zl';
                            $scope.currencyReceive = '$';
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = true;
                        };

                        $scope.buyUsd = function (type)
                        {
                            $scope.wallet[type] = $scope.wallet.USD;

                            $scope.currencyBox = !$scope.currencyBox;

                            $scope.applyCurrency = function (currencyBuyUsd)
                            {
                                currencyBuyUsd = $scope.getUsd.rates[0].bid;
                                $scope.wallet.USD -= parseFloat(($scope.money.value).toFixed(2));
                                $scope.wallet.PLN += parseFloat(($scope.money.value * currencyBuyUsd).toFixed(2));
                                updateCurrency('USD', $scope.wallet.USD);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.message = 'Wymiana USD na PLN';
                            $scope.currencyValue = $scope.getUsd.rates[0].bid;
                            $scope.currencyType = '$';
                            $scope.currencyReceive = 'zl';
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = false;
                        };

                        $scope.buyEur = function (type)
                        {
                            $scope.wallet[type] = $scope.wallet.EUR;

                            $scope.currencyBox = !$scope.currencyBox;

                            $scope.applyCurrency = function (currencyBuyEur)
                            {
                                currencyBuyEur = $scope.getEur.rates[0].bid;
                                $scope.wallet.EUR -= parseFloat(($scope.money.value).toFixed(2));
                                $scope.wallet.PLN += parseFloat(($scope.money.value * currencyBuyEur).toFixed(2));
                                updateCurrency('EUR', $scope.wallet.EUR);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.message = 'Wymiana EURO na PLN';
                            $scope.currencyValue = $scope.getEur.rates[0].bid;
                            $scope.currencyType = '€';
                            $scope.currencyReceive = 'zl';
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = false;
                        };

                        $scope.sellEur = function (type)
                        {
                            $scope.wallet[type] = $scope.wallet.PLN;

                            $scope.currencyBox = !$scope.currencyBox;

                            $scope.applyCurrency = function (currencySellEur)
                            {
                                currencySellEur = $scope.getEur.rates[0].ask;
                                $scope.wallet.EUR += parseFloat(($scope.money.value / currencySellEur).toFixed(2));
                                $scope.wallet.PLN -= parseFloat(($scope.money.value).toFixed(2));
                                updateCurrency('EUR', $scope.wallet.EUR);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.message = 'Wymiana PLN na EURO';
                            $scope.currencyValue = $scope.getEur.rates[0].ask;
                            $scope.currencyType = 'zl';
                            $scope.currencyReceive = '€';
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = true;
                        };

                        $scope.sellGbp = function (type)
                        {
                            $scope.wallet[type] = $scope.wallet.PLN;

                            $scope.currencyBox = !$scope.currencyBox;

                            $scope.applyCurrency = function (currencySellGbp)
                            {
                                currencySellGbp = $scope.getGbp.rates[0].ask;
                                $scope.wallet.GBP += parseFloat(($scope.money.value / currencySellGbp).toFixed(2));
                                $scope.wallet.PLN -= parseFloat(($scope.money.value).toFixed(2));
                                updateCurrency('GBP', $scope.wallet.GBP);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.message = 'Wymiana PLN na GBP';
                            $scope.currencyValue = $scope.getGbp.rates[0].ask;
                            $scope.currencyType = 'zl';
                            $scope.currencyReceive = '£';
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = true;
                        };

                        $scope.buyGbp = function (type)
                        {
                            $scope.wallet[type] = $scope.wallet.GBP;

                            $scope.currencyBox = !$scope.currencyBox;

                            $scope.applyCurrency = function (currencyBuyGbp)
                            {
                                currencyBuyGbp = $scope.getGbp.rates[0].bid;
                                $scope.wallet.GBP -= parseFloat(($scope.money.value).toFixed(2));
                                $scope.wallet.PLN += parseFloat(($scope.money.value * currencyBuyGbp).toFixed(2));
                                updateCurrency('GBP', $scope.wallet.GBP);
                                updateCurrency('PLN', $scope.wallet.PLN);
                            };

                            $scope.message = 'Wymiana GBP na PLN';
                            $scope.currencyValue = $scope.getGbp.rates[0].bid;
                            $scope.currencyType = '£';
                            $scope.currencyReceive = 'zl';
                            $scope.addOpacity = !$scope.addOpacity;
                            $scope.btnBuy = false;
                        };


                    }
                };
            });
})();
