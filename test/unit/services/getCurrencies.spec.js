describe('CurrenciesService', function ()
{
    'use strict';

    var currenciesService;
    var http;
    var currency;
    var result1;
    var rootScope;


    beforeEach(module('cinkciarzTraining', function ($provide)
    {
        http = jasmine.createSpyObj('http', ['get']);
        http.get.and.returnValue(successfulPromise({a:'hej'}));
        $provide.value('$http', http);

    }));

    beforeEach(inject(function (CurrenciesService, $rootScope)
    {
        rootScope = $rootScope;
        currenciesService = CurrenciesService;
        currency = 'USD';

    }));

    describe('getCurrency', function ()
    {
        beforeEach(function ()
        {
            currenciesService.getCurrency(currency);
        });
        it('function getCurrency should return $http get request with url of selected currency', function ()
        {
            expect(http.get).toHaveBeenCalledWith('https://api.nbp.pl/api/exchangerates/rates/c/USD/today/?format=json');
        });
    });
    describe('allCurrencies', function ()
    {
        beforeEach(function ()
        {
            currenciesService.allCurrencies();
        });
        it('function allCurrencies should return $http get request with url of selected currency', function ()
        {
            expect(http.get).toHaveBeenCalledWith('https://api.nbp.pl/api/exchangerates/tables/c/?format=json');
        });
    });
    describe('selectedCurrencies', function ()
    {
        beforeEach(function ()
        {
            currenciesService.selectedCurrencies().then(function(result){
                console.log(result);
                result1 = result;
            });
            rootScope.$digest();
        });
        it('should set data of currencies to proper variables', function ()
        {
            expect(result1).toEqual({ USD: { a: 'hej' }, EUR: { a: 'hej' }, GBP: { a: 'hej' }, CHF: { a: 'hej' } } );
        });
    });
});
