fdescribe('MainController', function ()
{
    'use strict';

    var mainCtrl;
    var CurrenciesServiceMock;
    var SharedDataMock;
    var storage;
    var reset;

    beforeEach(module('cinkciarzTraining'));

    beforeEach(inject(function ($controller, SharedData, CurrenciesService, $localStorage)
    {

        CurrenciesServiceMock = CurrenciesService;
        SharedDataMock = SharedData;
        storage = $localStorage;
        mainCtrl = $controller('MainController', {CurrenciesService: CurrenciesServiceMock, SharedData: SharedDataMock, $localStorage: storage});


        spyOn(mainCtrl, 'setStartingValues').and.callThrough();
        spyOn(mainCtrl, 'reset');
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
        // it('should call setStartingValues', function ()
        // {
        //     expect(mainCtrl.setStartingValues).toHaveBeenCalled();
        // });
        // it('Should take currencies propertises from service', function(done) {
        //     CurrenciesServiceMock.getCurrency('USD').then(function(result) {
        //         expect(result).toEqual(mainCtrl.USD);
        //         done();
        //     });
        // });
    });

    describe('apply', function ()
    {
        beforeEach(function ()
        {
            mainCtrl.apply();
            // SharedDataMock.updateCurrency('PLN', 200);
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

            beforeEach(function ()
            {
                storage.PLN = 20;
                mainCtrl.setStartingValues();
            });

            it('should set value of wallet.PLN to 20', function ()
            {
                expect(SharedDataMock.wallet.PLN).toEqual(20);
            });
        });

        describe('if $localStorage is undefined', function ()
        {
            beforeEach(function ()
            {
                storage.PLN = undefined;
                mainCtrl.setStartingValues();
            });

            it('should set value of wallet.PLN to 0', function ()
            {
                expect(SharedDataMock.wallet.PLN).toEqual(0);
            });
        });
    });

    describe('updateCurrency', function ()
    {
        beforeEach(function ()
        {
            SharedDataMock.updateCurrency('USD', 500);
            // SharedDataMock.updateCurrency('PLN', 200);
        });
        it('should set wallet.USD value to 500', function ()
        {
            expect(mainCtrl.wallet.USD).toBe(500);

        });
        it('should send wallet.USD value to $localStorage', function ()
        {
            storage.USD = 500;
        });
    });

    // describe('reset', function ()
    // {
    //     beforeEach(function ()
    //     {
    //         mainCtrl.reset();
    //     });
    //     it('should call $localStorage.$reset', function ()
    //     {
    //         expect(storage.reset).toHaveBeenCalled();
    //     });
    //     it('should call setStartingValues function', function ()
    //     {
    //         expect(mainCtrl.setStartingValues).toHaveBeenCalled();
    //     });
    // });

    // describe('getCurrency', function ()
    // {
    //     beforeEach(function ()
    //     {
    //         CurrenciesServiceMock.getCurrency('USD').then(function(data){
    //             mainCtrl.USD = data;
    //         });
    //     });
    //     it('should set data from CurrenciesService to USD variable', function ()
    //     {
    //         expect(SharedDataMock.wallet[mainCtrl.currency]).toEqual(SharedDataMock.wallet.USD);
    //     });
    //     it('should call exchangeRate to selected currency bid value', function ()
    //     {
    //         expect(SharedDataMock.exchangeRate).toEqual(mainCtrl[mainCtrl.currency].rates[0].bid);
    //     });
    // });

});
