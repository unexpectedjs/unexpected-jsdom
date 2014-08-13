var unexpected = require('unexpected'),
    unexpectedJsdom = require('../lib/unexpectedJsdom'),
    jsdom = require('jsdom'),
    chalk = require('chalk');

describe('unexpected-jsdom', function () {
    var expect = unexpected.clone().installPlugin(unexpectedJsdom);
    expect.output.installPlugin(require('magicpen-prism'));

    it('should consider two DOM elements equal when they have the same outerHTML', function () {
        expect(jsdom.jsdom('<div>foobar</div>'), 'to equal', jsdom.jsdom('<div>foobar</div>'));
    });

    it('should consider two DOM elements different when their outerHTML values differ', function () {
        var actualHtml = '<!DOCTYPE html><div>foobarbaz</div>',
            expectedHtml = '<div class="hey">foobarquux</div><!--blahblah-->';
        expect(function () {
            expect(jsdom.jsdom(actualHtml), 'to equal', jsdom.jsdom(expectedHtml));
        }, 'to throw exception', function (err) {
            expect(err.output.toString(), 'to equal', 'expected ' + actualHtml + ' to equal ' + expectedHtml);
        });
    });
});
