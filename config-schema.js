var Joi = require('joi');

module.exports = Joi.object().keys({
  "debug": Joi.boolean(),
  "page": Joi.string(),
  "page-html": Joi.string(),
  "out": Joi.string().notes('Pass "-" for a stream'),
  "documentTitle": Joi.string(),
  "dpi": Joi.number().integer(),
  "imageDPI": Joi.number().integer(),
  "imageQuality": Joi.number().integer(),
  "colorMode": Joi.string().valid(['Color', 'Grayscale']),
  "margin.top": Joi.string(),
  "margin.right": Joi.string(),
  "margin.bottom": Joi.string(),
  "margin.left": Joi.string(),
  "size.height": Joi.string(),
  "size.width": Joi.string(),
  "size.pageSize": Joi.string(),
  "header.htmlUrl": Joi.string(),
  "header.spacing": Joi.string(),
  "footer.htmlUrl": Joi.string(),
  "footer.spacing": Joi.string(),
  "footer.center": Joi.string(),
  "footer.fontSize": Joi.string(),
  "orientation": Joi.string().valid(['Portrait', 'Landscape']),
  "useCompression": Joi.boolean(),
  "web.defaultEncoding": Joi.string(),
  "load.load-media-error-handling": Joi.string().valid(['abort', 'skip', 'ignore'])
})
.xor('page', 'page-html')
.rename('documentTitle', 'title')
.rename('imageDPI', 'image-dpi')
.rename('imageQuality', 'image-quality')
.rename('margin.top', 'margin-top')
.rename('margin.right', 'margin-right')
.rename('margin.bottom', 'margin-bottom')
.rename('margin.left', 'margin-left')
.rename('size.pageSize', 'page-size')
.rename('size.width', 'page-width')
.rename('size.height', 'page-height')
.rename('header.htmlUrl', 'header-html')
.rename('header.spacing', 'header-spacing')
.rename('footer.htmlUrl', 'footer-html')
.rename('footer.spacing', 'footer-spacing')
.rename('footer.center', 'footer-center')
.rename('footer.fontSize', 'footer-font-size')
.rename('load.load-media-error-handling', 'load-error-handling');
