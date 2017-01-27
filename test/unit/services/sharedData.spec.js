describe('SharedData', function ()
{
    'use strict';

    var sharedData;

    beforeEach(module('cinkciarzTraining'));

    beforeEach(inject(function (SharedData)
    {
        sharedData = SharedData;
    }));

    describe('initialization', function()
    {
        it('should return wallet', function ()
        {
            expect(sharedData.wallet).toEqual({});
        });
        it('should return table of currencies', function ()
        {
            expect(sharedData.currencies).toEqual(['USD', 'EUR', 'GBP', 'CHF']);
        });
        it('should return currency icons', function ()
        {
            expect(sharedData.currencyIcons).toEqual({USD:'$', EUR:'€', GBP:'£', CHF: 'CHF'});
        });
    });
});
