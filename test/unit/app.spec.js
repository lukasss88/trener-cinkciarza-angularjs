fdescribe('app.js', function ()
{
    'use strict';

    var route;

    beforeEach(module('cinkciarzTraining'));

    beforeEach(inject(function ($route)
    {
        route = $route;

    }));

    describe('/', function ()
    {
        it('should has \'MainController\' controller ', function ()
        {
            expect(route.routes['/'].controller).toBe('MainController');
        });
        it('should has \'main.html\' template ', function ()
        {
            expect(route.routes['/'].templateUrl).toBe('templates/main.html');
        });
        it('should has \'mainCtrl\' as controller shortcut', function ()
        {
            expect(route.routes['/'].controllerAs).toBe('mainCtrl');
        });
    });

    describe('/tableOfExchanges', function ()
    {
        it('should has \'TableOfExchangesController\' controller ', function ()
        {
            expect(route.routes['/tableOfExchanges'].controller).toBe('TableOfExchangesController');
        });
        it('should has \'tableOfExchanges.html\' template ', function ()
        {
            expect(route.routes['/tableOfExchanges'].templateUrl).toBe('templates/tableOfExchanges.html');
        });
        it('should has \'tableCtrl\' as controller shortcut', function ()
        {
            expect(route.routes['/tableOfExchanges'].controllerAs).toBe('tableCtrl');
        });
    });

    describe('/exchangeBox/:action/:currency', function ()
    {
        it('should has \'ExchangeBoxController\' controller ', function ()
        {
            expect(route.routes['/exchangeBox/:action/:currency'].controller).toBe('ExchangeBoxController');
        });
        it('should has \'exchangeBox.html\' template ', function ()
        {
            expect(route.routes['/exchangeBox/:action/:currency'].templateUrl).toBe('templates/exchangeBox.html');
        });
        it('should has \'tableCtrl\' as controller shortcut', function ()
        {
            expect(route.routes['/exchangeBox/:action/:currency'].controllerAs).toBe('exchangeCtrl');
        });
    });
});
