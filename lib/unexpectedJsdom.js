var jsdom = require('jsdom'),
    domToHtml = require('jsdom/lib/jsdom/browser/domtohtml').domToHtml;

function stringifyElement(element) {
    return domToHtml(element, true);
}

module.exports = {
    name: 'unexpected-jsdom',
    installInto: function (expect) {
        expect.addType({
            name: 'jsdom',
            identify: function (obj) {
                return obj instanceof jsdom.defaultLevel.HTMLDocument || obj instanceof jsdom.defaultLevel.HTMLElement;
            },
            equal: function (a, b) {
                return stringifyElement(a) === stringifyElement(b);
            },
            inspect: function (element, depth, output) {
                return output.code(stringifyElement(element), 'html');
            },
            diff: function (actual, expected, output, diff, inspect) {
                return diff(stringifyElement(actual), stringifyElement(expected));
            }
        });
    }
};
