var wkhtmltopdf = require('./');
var fs = require('fs');

var start = new Date();
var stream = wkhtmltopdf.render({
  "debug": true,
  "dpi": 100,
  "imageDPI": 300,
  // "useCompression": true,
  // "load.load-media-error-handling": "ignore",
  // "page": "./template/archive-lightning-body.html",
  "page-html": '<html><body><h1>Test</h1><p>Hello world</p></body></html>',
  // "page": 'http://google.com',
  "size.pageSize": "Letter",
  //"header.htmlUrl": "./template/archive-lightning-header.html",
  // "header.spacing": "5",
  // "footer.htmlUrl": "./template/archive-lightning-footer.html"
  // "out": "./google-test.pdf"
  "out": "-"
}, function (err, data) {
  if (err) {
    throw new Error(err);
  }

  console.log(data);
});
