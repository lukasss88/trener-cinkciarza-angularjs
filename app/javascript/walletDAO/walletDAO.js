(function ()
{
    'use strict';

    function WalletDAO($resource)
    {
        var api = $resource('/api/wallet/:a',null,{
            update: { method:'PUT', isArray: false },
            get: {method:'GET', isArray: true},
            delete: {method: 'DELETE', isArray: true}
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
