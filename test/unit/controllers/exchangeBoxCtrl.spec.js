fdescribe('ExchangeBoxController', function ()
{
    'use strict';

    var exCtrl;
    var SharedDataMock;
    var CurrenciesServiceMock;
    var routeParams;

    beforeEach(module('cinkciarzTraining'));

    beforeEach(inject(function ($controller, SharedData, $routeParams, CurrenciesService)
    {
        SharedDataMock = SharedData;
        CurrenciesServiceMock = CurrenciesService;
        routeParams = $routeParams;
        routeParams.action = 'buy';
        $controller('MainController');
        // SharedDataMock.money.value = 100;

        spyOn(CurrenciesServiceMock, 'getCurrency').and.callFake(function ()
        {
            return successfulPromise('actual currency');
        });

        spyOn(SharedDataMock, 'updateCurrency').and.callThrough();

        exCtrl = $controller('ExchangeBoxController', {SharedData: SharedDataMock, CurrenciesService: CurrenciesServiceMock, $routeParams: routeParams});

    }));

    describe('initialization', function ()
    {
        describe('always', function ()
        {
            it('should set currencyId to routeparams variable', function ()
            {
                expect(exCtrl.currencyId).toEqual(routeParams.currency);
            });
            it('should take wallet from sharedData factory', function ()
            {
                expect(exCtrl.wallet).toEqual(SharedDataMock.wallet);
            });
            it('should set action variable to routeparams variable', function ()
            {
                expect(exCtrl.action).toEqual(routeParams.action);
            });
            it('should calls getCurrency function 4 times', function ()
            {
                expect(CurrenciesServiceMock.getCurrency.calls.count()).toBe(4);
            });
            it('should set currency propertises to selected currency', function ()
            {
                expect(exCtrl.EUR).toBe('actual currency');
            });
        });


        describe('when routeParams.action is equal to buy', function ()
        {
            it('should set message variable', function ()
            {
                expect(exCtrl.message).toEqual('Wymiana PLN na ' + exCtrl.currencyId);
            });
            it('should btnBuy to true', function ()
            {
                expect(exCtrl.btnBuy).toBe(true);
            });
            it('should set currencyType to icon of currency which we want to sell', function ()
            {
                expect(exCtrl.currencyReceive).toEqual(SharedDataMock.currencyIcons[exCtrl.currencyId]);
            });
            it('should set currencyType to icon of currency which we want to buy', function ()
            {
                expect(exCtrl.currencyType).toBe('zł');
            });

            // describe('applyCurrency function', function ()
            // {
            //     beforeEach(function ()
            //     {
            //         exCtrl.applyCurrency();
            //     });
            //     it('should add the result of the division to wallet of selected currency', function ()
            //     {
            //
            //         SharedDataMock.wallet[exCtrl.currencyId] = 10000;
            //         exCtrl[exCtrl.currencyId].rates[0].ask = 4;
            //         expect(SharedDataMock.wallet[exCtrl.currencyId] + (SharedDataMock.money.value / exCtrl[exCtrl.currencyId].rates[0].ask)).toEqual(10025);
            //     });
            //     it('should substract value of input from wallet PLN', function ()
            //     {
            //         SharedDataMock.wallet.PLN = 20000;
            //         expect(SharedDataMock.wallet.PLN - SharedDataMock.money.value).toEqual(19900);
            //     });
            //
            //     it('should call updateCurrency function two times', function ()
            //     {
            //         expect(SharedDataMock.updateCurrency.calls.count()).toBe(2);
            //     });
            //     it('should call updateCurrency function with two arguments: foreign currency and wallet of foreign currency', function ()
            //     {
            //         expect(SharedDataMock.updateCurrency).toHaveBeenCalledWith(exCtrl.currencyId, SharedDataMock.wallet[exCtrl.currencyId]);
            //     });
            //     it('should call updateCurrency function with two arguments: PLN currency and wallet of PLN', function ()
            //     {
            //         expect(SharedDataMock.updateCurrency).toHaveBeenCalledWith('PLN', SharedDataMock.wallet.PLN);
            //     });
            // });
        });
        describe('when routeParams.action is equal to sell', function ()
        {
            beforeEach(inject(function ($controller)
            {
                routeParams.action = 'sell';
                exCtrl = $controller('ExchangeBoxController', {SharedData: SharedDataMock, $routeParams: routeParams});
            }));
            it('should set message variable', function ()
            {
                expect(exCtrl.message).toEqual('Wymiana ' + exCtrl.currencyId + ' na PLN');
            });
            it('should set btnBuy to false', function ()
            {
                expect(exCtrl.btnBuy).toBe(false);
            });
            it('should set currencyType to icon of currency which we want to buy', function ()
            {
                expect(exCtrl.currencyReceive).toEqual('zł');
            });
            it('should set currencyType to icon of currency which we want to sell', function ()
            {
                expect(exCtrl.currencyType).toBe(SharedDataMock.currencyIcons[exCtrl.currencyId]);
            });

            // describe('applyCurrency function', function ()
            // {
            //     beforeEach(function ()
            //     {
            //         exCtrl.applyCurrency();
            //     });
            //     it('should substract value of input from wallet of selected currency', function ()
            //     {
            //         SharedDataMock.wallet[exCtrl.currencyId] = 10000;
            //         expect(SharedDataMock.wallet[exCtrl.currencyId] - SharedDataMock.money.value).toEqual(9900);
            //     });
            //     it('should add the result of the multiplication to wallet of PLN', function ()
            //     {
            //         SharedDataMock.wallet.PLN = 20000;
            //         exCtrl[exCtrl.currencyId].rates[0].bid = 4;
            //         expect(SharedDataMock.wallet.PLN + (SharedDataMock.money.value * exCtrl[exCtrl.currencyId].rates[0].bid)).toEqual(20400);
            //     });
            //     it('should call updateCurrency function two times', function ()
            //     {
            //         expect(SharedDataMock.updateCurrency.calls.count()).toBe(2);
            //     });
            //     it('should call updateCurrency function with two arguments: foreign currency and wallet of foreign currency', function ()
            //     {
            //         expect(SharedDataMock.updateCurrency).toHaveBeenCalledWith(exCtrl.currencyId, SharedDataMock.wallet[exCtrl.currencyId]);
            //     });
            //     it('should call updateCurrency function with two arguments: PLN currency and wallet of PLN', function ()
            //     {
            //         expect(SharedDataMock.updateCurrency).toHaveBeenCalledWith('PLN', SharedDataMock.wallet.PLN);
            //     });
            // });
        });
    });

});
