describe('MainController', function ()
{
    'use strict';

    var mainCtrl;
    var CurrenciesServiceMock;
    var SharedDataMock;
    var storage;

    beforeEach(module('cinkciarzTraining'));

    beforeEach(inject(function ($controller, SharedData, CurrenciesService, $localStorage)
    {
        CurrenciesServiceMock = CurrenciesService;
        SharedDataMock = SharedData;
        storage = $localStorage;

        spyOn(CurrenciesServiceMock, 'selectedCurrencies').and.callFake(function ()
        {
            return successfulPromise('actual currency');
        });

        mainCtrl = $controller('MainController', {CurrenciesService: CurrenciesServiceMock, SharedData: SharedDataMock, $localStorage: storage});

        spyOn(mainCtrl, 'reset').and.callThrough();
        spyOn(storage, '$reset');
        spyOn(SharedDataMock, 'updateCurrency').and.callThrough();
    }));

    describe('initialization', function ()
    {
        it('should set wallet', function ()
        {
            expect(mainCtrl.wallet).toEqual(SharedDataMock.wallet);
        });
        it('should set currencies table', function ()
        {
            expect(mainCtrl.currencies).toEqual(SharedDataMock.currencies);
        });
        it('should set currencies icons', function ()
        {
            expect(mainCtrl.currencyIcons).toEqual(SharedDataMock.currencyIcons);
        });
        it('should set value of moneyStart', function ()
        {
            expect(mainCtrl.moneyStart).toBe(10000);
        });
        it('should set currency propertises to selected currency', function ()
        {
            expect(mainCtrl.currencyData).toBe('actual currency');
        });
    });

    describe('apply', function ()
    {
        beforeEach(function ()
        {
            mainCtrl.apply();
        });
        it('should call reset', function ()
        {
            expect(mainCtrl.reset).toHaveBeenCalled();
        });
        it('should call updateCurrency', function ()
        {
            expect(SharedDataMock.updateCurrency).toHaveBeenCalled();
        });
        it('should call updateCurrency with PLN property and moneyStart value', function ()
        {
            expect(SharedDataMock.updateCurrency).toHaveBeenCalledWith('PLN', 10000);
        });
        it('should clear moneyStart value', function ()
        {
            expect(mainCtrl.moneyStart).toEqual(null);
        });
    });

    describe('setStartingValues', function ()
    {
        describe('if $localStorage is not undefined', function ()
        {

            beforeEach(inject(function ($controller)
            {
                storage.PLN = 20;
                mainCtrl = $controller('MainController', {CurrenciesService: CurrenciesServiceMock, SharedData: SharedDataMock, $localStorage: storage});

            }));

            it('should set value of wallet.PLN to 20', function ()
            {
                expect(SharedDataMock.wallet.PLN).toEqual(20);
            });
        });

        describe('if $localStorage is undefined', function ()
        {
            beforeEach(inject(function ($controller)
            {
                storage.PLN = undefined;
                mainCtrl = $controller('MainController', {CurrenciesService: CurrenciesServiceMock, SharedData: SharedDataMock, $localStorage: storage});

            }));

            it('should set value of wallet.PLN to 0', function ()
            {
                expect(SharedDataMock.wallet.PLN).toEqual(0);
            });
        });
    });

    describe('reset', function ()
    {
        beforeEach(function ()
        {
            mainCtrl.reset();
        });
        it('should call $localStorage.$reset', function ()
        {
            expect(storage.$reset).toHaveBeenCalled();
        });
    });
});
