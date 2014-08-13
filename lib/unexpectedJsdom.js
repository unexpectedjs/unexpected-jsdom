var jsdom = require('jsdom'),
    domToHtml = require('jsdom/lib/jsdom/browser/domtohtml').domToHtml;

function stringifyElement(element) {
    return (element.doctype || '') + domToHtml(element, true);
}

module.exports = function unexpectedJsdom(expect) {
    expect.addType({
        identify: function (obj) {
            return obj instanceof jsdom.defaultLevel.HTMLDocument || obj instanceof jsdom.defaultLevel.HTMLElement;
        },
        equal: function (a, b) {
            return stringifyElement(a) === stringifyElement(b);
        },
        inspect: function (output, element) {
            return output.code(stringifyElement(element), 'html');
        },
        toJSON: function (element) {
            return {
                $Jsdom: stringifyElement(element)
            };
        }
    });
};
