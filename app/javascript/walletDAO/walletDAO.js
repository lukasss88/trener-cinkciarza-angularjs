(function ()
{
    'use strict';

    function WalletDAO($resource)
    {
        var api = $resource('api/wallet');

        return {
            query: function ()
            {
                return api.get().$promise;
            }, save: function (data)
            {
                console.log(data);
                return api.save(data).$promise;
            }
        };
    }

    angular.module('cinkciarzTraining').factory('WalletDAO', ['$resource', WalletDAO]);
})();
