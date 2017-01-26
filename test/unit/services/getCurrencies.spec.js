describe('CurrenciesService', function ()
{
    'use strict';

    var currenciesService;
    var currency;
    var  authRequestHandler;

    beforeEach(module('cinkciarzTraining'));

    beforeEach(inject(function (CurrenciesService, $httpBackend)
    {
        currenciesService = CurrenciesService;

        currency = 'USD';

        authRequestHandler = $httpBackend.when('GET', 'service.json')
                .respond(true);

        spyOn(currenciesService, 'getCurrency').and.callFake(function ()
        {
            return successfulPromise({data: 'actual currency variables'});
        });


    }));

    describe('initialization', function()
    {
        beforeEach(function ()
        {
            currenciesService.getCurrency(currency);
        });

        it('should calls getCurrency function one time', function ()
        {
            expect(currenciesService.getCurrency.calls.count()).toBe(1);
        });
        it('should calls getCurrency function with currency as parameter', function ()
        {
            expect(currenciesService.getCurrency).toHaveBeenCalledWith(currency);
        });
        it('should set table of currencies to arrayCurrency variable', function ()
        {
            expect(currenciesService.data).toBe('actual currency variables');
        });
    });
});

