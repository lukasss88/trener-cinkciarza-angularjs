angular.module('treningCinkciarza')
    .controller('ServiceController', function($http, $scope) {
        $http.get("http://api.nbp.pl/api/exchangerates/rates/c/usd/today/?format=json")
            .then(function(response) {
                $scope.usdValue = response.data;
                console.log(response);
            });
    });
