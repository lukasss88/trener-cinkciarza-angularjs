(function ()
{
    'use strict';

    function WalletDAO($resource)
    {
        var api = $resource('/api/wallet/:a',null,{
            update: { method:'PUT', isArray: false },
            get: {method:'GET', isArray: false, transformResponse: function(data){
                var dataJson = JSON.parse(data);
                var wallet = {};

                dataJson.map(function(value){
                    wallet.PLN = value.PLN;
                    wallet.USD = value.USD;
                    wallet.EUR = value.EUR;
                    wallet.GBP = value.GBP;
                    wallet.CHF = value.CHF;
                });

                data = wallet;
                return data;
            }}
        });

        return {
            query: function ()
            {
                return api.get().$promise;
            }, save: function (data)
            {
                return api.save(data).$promise;
            },
            update: function (data,param)
            {
                return api.update({a: param},data).$promise;

            }, delete: function(){
                return api.delete().$promise;
            }
        };
    }

    angular.module('cinkciarzTraining').factory('WalletDAO', ['$resource', WalletDAO]);
})();
