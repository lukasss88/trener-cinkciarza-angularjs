(function ()
{
    'use strict';

    function WalletDAO($resource)
    {
        var api = $resource('/api/wallet/:a',null,{
            update: { method:'PUT', isArray: false }
        });

        return {
            query: function ()
            {
                return api.get().$promise;
            }, save: function (data)
            {
                return api.save(data).$promise;
            },
            update: function (data)
            {
                return api.update({a:'buy'},data).$promise;

            }, delete: function(){
                return api.delete().$promise;
            }
        };
    }

    angular.module('cinkciarzTraining').factory('WalletDAO', ['$resource', WalletDAO]);
})();
