var jsdom = require('jsdom'),
    domToHtml = require('jsdom/lib/jsdom/browser/domtohtml').domToHtml,
    chalk = require('chalk'),
    prism = require('../3rdparty/prism'),
    styleByTokenType = {
        tag: '#ddd',
        'attr-name': 'green',
        'attr-value': 'cyan',
        comment: 'gray',
        doctype: 'blue'
    };

module.exports = function unexpectedJsdom(expect) {
    expect.addType({
        identify: function (obj) {
            return obj instanceof jsdom.defaultLevel.HTMLDocument || obj instanceof jsdom.defaultLevel.HTMLElement;
        },
        equal: function (a, b) {
            return domToHtml(a) === domToHtml(b);
        },
        inspect: function (output, element) {
            var html = ((element.doctype || '') + domToHtml(element)).replace(/</g, '&lt;');

            function printTokens(token, parentStyle) {
                if (Array.isArray(token)) {
                    token.forEach(function (subToken) {
                        printTokens(subToken, parentStyle);
                    });
                } else if (typeof token === 'string') {
                    token = token.replace(/&lt;/g, '<').replace(/\n/g, '');
                    output.text(token, parentStyle);
                } else {
                    printTokens(token.content, styleByTokenType[token.type]);
                }
            }
            printTokens(prism.tokenize(html, prism.languages.markup));
            return output;
        },
        toJSON: function (element) {
            return {
                $Jsdom: element.outerHTML
            };
        }
    });
};
