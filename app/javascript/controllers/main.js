angular.module('treningCinkciarza')
.controller('MainController', function($scope, $localStorage) {
    $scope.usd = 'usd';
    $scope.$storage = $localStorage.$default({
        wallet: {
            PLN: 0
        }
    });
    $scope.moneyStart = {value:null};
    $scope.sellUsd = false;


    $scope.apply = function(value) {
        $scope.$storage.wallet.PLN = value;
    };



});