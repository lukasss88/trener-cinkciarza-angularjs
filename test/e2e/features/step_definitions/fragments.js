/*global element,by*/
var byString = function (object, fragmentName)
{
    'use strict';
    if (!fragmentName || !fragmentName.replace) {
        return null;
    }
    fragmentName = fragmentName.replace(/\[(\w+)\]/g, '($1)');
    fragmentName = fragmentName.replace(/^\./, '');
    var a = fragmentName.split('.');
    while (a.length) {
        var n = a.shift();
        var arrayExpr = n.match(/(\w+)\(([^)]*)\)/);
        if (arrayExpr) {
            object = object[arrayExpr[1]](arrayExpr[2]);
        } else if (n in object) {
            object = object[n];
        } else {
            throw new Error('Undefined fragment "' + n + '" in "' + fragmentName + '"');
        }
    }
    return object;
};

var fragments = function (text)
{
    'use strict';

    var mapping = {
        currency: {
            applyButton: element.bind(null, by.css('#apply-btn')),
            walletPLN: element.bind(null, by.css('#wallet-PLN')),
            selectButton: element.bind(null, by.css('#selection-currency')),
            selectedUSD: element.bind(null, by.css('select option:nth-child(2)')),
            currencyBox: element.bind(null, by.css('#currency-box')),
            buyBtn: element.bind(null, by.css('#buyBtn')),
            inputValue: element.bind(null, by.css('#plnToUsd')),
            acceptValue: element.bind(null, by.css('#accept-value')),
            walletUSD: element.bind(null, by.css('#wallets p:nth-child(1)')),
            infoBtn: element.bind(null, by.css('#info-btn')),
            tableCurrency: element.bind(null, by.css('#table-currency')),
            backBtn: element.bind(null, by.css('#back-btn')),
            sellBtn: element.bind(null, by.css('#sellBtn'))
        }
    };



    return byString(mapping, text);
};

module.exports = fragments;
