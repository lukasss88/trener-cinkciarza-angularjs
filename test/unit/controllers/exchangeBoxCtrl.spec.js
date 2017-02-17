describe('ExchangeBoxController', function ()
{
    'use strict';

    var exCtrl;
    var SharedDataMock;
    var CurrenciesServiceMock;
    var routeParams;
    var rootScope;
    beforeEach(module('cinkciarzTraining'));

    beforeEach(inject(function ($controller, SharedData, $routeParams, CurrenciesService, $rootScope)
    {
        SharedDataMock = SharedData;
        CurrenciesServiceMock = CurrenciesService;
        routeParams = $routeParams;

        routeParams.currency = 'USD';

        $controller('MainController');
        spyOn(CurrenciesServiceMock, 'selectedCurrencies').and.callFake(function ()
        {
            return successfulPromise({USD: {rates: [{ask: 4.5, bid: 4.0}]}});
        });

        rootScope = $rootScope;
        spyOn(SharedDataMock, 'updateCurrency').and.callThrough();

        SharedData.wallet = {USD: 20000};
        SharedData.wallet.PLN = 20000;
        exCtrl = $controller('ExchangeBoxController', {SharedData: SharedDataMock, CurrenciesService: CurrenciesServiceMock, $routeParams: routeParams});

        spyOn(exCtrl, 'predictVal').and.callThrough();
        exCtrl.money = 100;

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
        });

        describe('when routeParams.action is equal to buy', function ()
        {
            beforeEach(inject(function ($controller)
            {
                routeParams.action = 'buy';
                exCtrl = $controller('ExchangeBoxController', {SharedData: SharedDataMock, $routeParams: routeParams});
            }));

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
        });
    });

    describe('predictVal function', function ()
    {
        describe('when routeParams.action is equal to buy', function ()
        {
            beforeEach(function ()
            {
                routeParams.action = 'buy';
                exCtrl.predictVal();
            });
            it('should set result of the division to the predictvalue variable ', function ()
            {
                expect(exCtrl.predictedValue).toEqual(22.22);
            });
        });
        describe('when routeParams.action is equal to sell', function ()
        {
            beforeEach(function ()
            {
                routeParams.action = 'sell';
                exCtrl.predictVal();
            });
            it('should set result of the division to the predictvalue variable ', function ()
            {
                expect(exCtrl.predictedValue).toEqual(400);
            });
        });
    });

    describe('applyCurrency function', function ()
    {
        describe('when routeParams.action is equal to buy', function ()
        {
            beforeEach(function ()
            {
                routeParams.action = 'buy';
                exCtrl.applyCurrency();
            });
            it('should add the result of the division to wallet of selected currency', function ()
            {

                expect(SharedDataMock.wallet[exCtrl.currencyId]).toEqual(20022.22);
            });
            it('should substract value of input from wallet PLN', function ()
            {
                expect(SharedDataMock.wallet.PLN).toEqual(19900);
            });
            it('should call updateCurrency function two times', function ()
            {
                expect(SharedDataMock.updateCurrency.calls.count()).toBe(2);
            });
            it('should call updateCurrency function with two arguments: foreign currency and wallet of foreign currency', function ()
            {
                expect(SharedDataMock.updateCurrency).toHaveBeenCalledWith(exCtrl.currencyId, SharedDataMock.wallet[exCtrl.currencyId]);
            });
            it('should call updateCurrency function with two arguments: PLN currency and wallet of PLN', function ()
            {
                expect(SharedDataMock.updateCurrency).toHaveBeenCalledWith('PLN', SharedDataMock.wallet.PLN);
            });
        });
        describe('when routeParams.action is equal to sell', function ()
        {
            beforeEach(function ()
            {
                routeParams.action = 'sell';
                exCtrl.applyCurrency();
            });
            it('should substract value of input from wallet of selected currency', function ()
            {
                expect(SharedDataMock.wallet[exCtrl.currencyId]).toEqual(19900);
            });
            it('should add the result of the multiplication to wallet of PLN', function ()
            {
                expect(SharedDataMock.wallet.PLN).toEqual(20400);
            });
            it('should call updateCurrency function two times', function ()
            {
                expect(SharedDataMock.updateCurrency.calls.count()).toBe(2);
            });
            it('should call updateCurrency function with two arguments: foreign currency and wallet of foreign currency', function ()
            {
                expect(SharedDataMock.updateCurrency).toHaveBeenCalledWith(exCtrl.currencyId, SharedDataMock.wallet[exCtrl.currencyId]);
            });
            it('should call updateCurrency function with two arguments: PLN currency and wallet of PLN', function ()
            {
                expect(SharedDataMock.updateCurrency).toHaveBeenCalledWith('PLN', SharedDataMock.wallet.PLN);
            });
        });
    });
});
