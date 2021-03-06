
'use strict';

var db     = require('mongoose'),
    Schema = db.Schema;

var no_newlines = function(val) {
  return !/\r|\n/g.test(val);
};
var meta_validator = [ no_newlines, 'Newlines not allowed in field "{PATH}"' ];

var PageSchema = Schema({
  path: { type: String, unique: true, required: true },
  title: { type: String, required: true, default: '', validate: meta_validator },
  keywords: { type: String, required: false, default: '', validate: meta_validator },
  description: { type: String, required: false, default: '', validate: meta_validator },
  view: { type: String, required: true, default: 'cms/pages/default' },
  body_class: { type: String, default: '' },
  content_blocks: [{
    name: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, required: true, enum: [ 'markdown' ] },
    class_names: { type: String, required: false, default: '' }
  }]
});

module.exports = db.model('Page', PageSchema);

