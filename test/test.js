var wkhtmltopdf = require('../');
var fs = require('fs');

var start = new Date();
var stream = wkhtmltopdf.render({
  'debug': true,
  // 'dpi': 100,
  // 'imageDPI': 300,
  'footer.center': 'Copyright 2004-2014 Weather Decision Technologies, Inc. - All rights reserved.',
  'footer.fontSize': '9',
  // 'page-html': template,
  'size.pageSize': 'Letter',
  'out': '-',
  'page-html': '<html><body><h1>Test</h1><p>Hello world</p></body></html>',
}, function (err, data) {
  if (err) {
    throw new Error(err);
  }

  console.log(data);
});
