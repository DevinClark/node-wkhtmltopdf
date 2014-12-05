var spawn = require('child_process').spawn;
var concat = require('concat-stream');
var config_schema = require('./config-schema.js');
var joi = require('joi');
var os = require('os');
var tmp = require('temporary');

var wkhtmltopdf = {};
if (os.platform() === 'darwin') {
  wkhtmltopdf.command = 'wkhtmltopdf';
} else {
  wkhtmltopdf.command = './bin/bin/wkhtmltopdf-centos6-amd64';
}

function quote(val) {
  // escape and quote the value if it is a string
  if (typeof val === 'string') {
    val = '"' + val.replace(/(["\\$`])/g, '\\$1') + '"';
  }

  return val;
}

function render(options, callback) {
  callback = callback || Function.prototype;

  if (options.useCompression) {
    if (options.useCompression == true) {
      delete options.useCompression;
    } else {
      options['no-pdf-compression'] = null;
    }
  }

  if (options.colorMode) {
    if (options.colorMode == 'Color') {
      delete options.colorMode;
    } else {
      options['grayscale'] = null;
    }
  }

  var global_keys = [
    'title',
    'dpi',
    'image-dpi',
    'image-quality',
    'colorMode',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'page-height',
    'page-width',
    'page-size',
    'orientation',
    'no-pdf-compression'
  ];
  var object_keys = [
    'header-html',
    'header-spacing',
    'footer-html',
    'footer-spacing',
    'footer-center',
    'footer-font-size',
    'load-error-handling',
    'background'
  ];

  var results = joi.validate(options, config_schema, {
    allowUnknown: true
  });

  if (results.error) {
    callback(new Error(results.error));
  }

  var key;
  var page = results.value.page;
  delete results.value.page;
  var page_html = results.value['page-html'];
  delete results.value['page-html'];
  var out = results.value.out;
  delete results.value.out;
  var debug = results.value.debug;
  delete results.value.debug;
  var global_options = [];
  var object_options = [];
  var args = [];
  var tmp_file;


  for (key in results.value) {
    if (global_keys.indexOf(key) !== -1) {
      global_options.push('--' + key);
      if (results.value[key]) {
        global_options.push(results.value[key]);
      }
    }

    if (object_keys.indexOf(key) !== -1) {
      object_options.push('--' + key);
      if (results.value[key]) {
        object_options.push(results.value[key]);
      }
    }
  }

  args = global_options;

  args.push(page || '-');
  args = args.concat(object_options);
  if (out === '-') {
    tmp_file = new tmp.File();
    args.push(tmp_file.path);
  } else {
    args.push(out);
  }

  args.unshift('--quiet');
  args.unshift(wkhtmltopdf.command);
  if (debug) {
    console.log(args.join(' '));
  }

  var child = spawn(args[0], args.slice(1), { stdio: ['pipe', 'pipe', 'pipe'] });

  // write input to stdin
  if (page_html) {
    child.stdin.write(page_html);
    child.stdin.end();
  }

  child.on('error', function (error) {
    callback(error);
  });

  child.on('close', function () {
    if (out === '-') {
      tmp_file.readFile(function (err, data) {
        callback(err, data);
        tmp_file.unlink();
      });
    }
  });

  child.stderr.pipe(process.stderr);

  return child;
}

module.exports = {
  render: render
};
