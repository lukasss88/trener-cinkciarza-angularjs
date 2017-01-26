describe('ExchangeBoxController', function ()
{
    'use strict';

    var exCtrl;
    var SharedDataMock;
    var routeParams;

    beforeEach(module('cinkciarzTraining'));

    beforeEach(inject(function ($controller, SharedData, $routeParams)
    {
        SharedDataMock = SharedData;
        routeParams = $routeParams;

        exCtrl = $controller('ExchangeBoxController', {SharedData: SharedDataMock, $routeParams: routeParams});
    }));

    describe('initialization', function ()
    {
        it('should set currencyId to routeparams variable', function ()
        {
            expect(exCtrl.currencyId).toEqual(routeParams.currency);
        });
        it('should take wallet from sharedData factory', function ()
        {
            expect(exCtrl.wallet).toEqual(SharedDataMock.wallet);
        });
        it('should take wallet.PLN from sharedData factory', function ()
        {
            expect(exCtrl.wallet.PLN).toEqual(SharedDataMock.wallet.PLN);
        });
        it('should take money object from sharedData factory', function ()
        {
            expect(exCtrl.money).toEqual(SharedDataMock.money);
        });
        it('should take exchangeRate value from sharedData factory', function ()
        {
            expect(exCtrl.exchangeRate).toEqual(SharedDataMock.exchangeRate);
        });

        // describe('if routeParams.action is equal to buy', function ()
        // {
        //     beforeEach(function() {
        //         routeParams.action = 'buy';
        //     });
        //
        //     it('should set message variable', function ()
        //     {
        //         routeParams.action = 'buy';
        //         expect(exCtrl.message).toEqual('Wymiana PLN na USD');
        //     });
        //     it('should btnBuy to true', function ()
        //     {
        //         routeParams.action = 'buy';
        //         expect(exCtrl.btnBuy).toBe(true);
        //
        //     });
        // });
    });
});
