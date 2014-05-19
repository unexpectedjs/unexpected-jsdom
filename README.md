unexpected-jsdom
================

Add jsdom support to unexpected. It adds a custom type that recognizes JSDOM elements and documents and syntax highlights it in the terminal using [prism](http://prismjs.com/). Equivalence is determined by comparing `outerHTML`.

To use it:

```javascript
var jsdom = require('jsdom'),
    expect = require('unexpected').clone().installPlugin(require('unexpected-jsdom'));

expect(jsdom.jsdom('<div>foo</div>'), 'to equal', jsdom.jsdom('<div>bar</div>'));
```
