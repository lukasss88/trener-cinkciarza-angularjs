fdescribe('TableOfExchangesController', function ()
{
    'use strict';

    var tableCtrl;
    var CurrenciesServiceMock;

    beforeEach(module('cinkciarzTraining'));

    beforeEach(inject(function ($controller, CurrenciesService)
    {
        CurrenciesServiceMock = CurrenciesService;

        spyOn(CurrenciesServiceMock, 'allCurrencies').and.callFake(function ()
        {
            return successfulPromise([{rates:'actual table of currency'}]);
        });

        tableCtrl = $controller('TableOfExchangesController', {CurrenciesService: CurrenciesServiceMock});
    }));

    describe('initialization', function()
    {
        it('should calls allCurrencies function one time', function ()
        {
            expect(CurrenciesServiceMock.allCurrencies.calls.count()).toBe(1);
        });
        it('should set table of currencies to arrayCurrency variable', function ()
        {
            expect(tableCtrl.arrayCurrency).toBe('actual table of currency');
        });
    });
});
