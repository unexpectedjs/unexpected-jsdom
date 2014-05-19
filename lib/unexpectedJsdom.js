var jsdom = require('jsdom'),
    chalk = require('chalk'),
    prism = require('../3rdparty/prism'),
    styleByTokenType = {
        tag: 'magenta',
        punctuation: 'blue',
        'attr-name': 'green',
        'attr-value': 'cyan',
        comment: 'gray',
        doctype: 'blue'
    };

function ansiHighlightHtml(html) {
    html = html.replace(/</g, '&lt;')

    return function flatten(token, parentStyle) {
        if (Array.isArray(token)) {
            return token.map(function (subToken) {
                return flatten(subToken, parentStyle);
            }).join('');
        } else if (typeof token === 'string') {
            token = token.replace(/&lt;/g, '<');
            if (parentStyle) {
                return parentStyle(token);
            } else {
                return token;
            }
        } else {
            return flatten(token.content, chalk[styleByTokenType[token.type]]);
        }
    }(prism.tokenize(html, prism.languages.markup));
}

module.exports = function unxpectedJsdom(expect) {
    expect.addType({
        identify: function (obj) {
            return obj instanceof jsdom.defaultLevel.HTMLDocument || obj instanceof jsdom.defaultLevel.HTMLElement;
        },
        equal: function (a, b) {
            return a.outerHTML === b.outerHTML;
        },
        inspect: function (element) {
            return ansiHighlightHtml((element.doctype || '') + element.outerHTML);
        },
        toJSON: function (element) {
            return {
                $Jsdom: element.outerHTML
            };
        }
    });
};
