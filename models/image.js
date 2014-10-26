
'use strict';

var Schema = db.Schema;

var ImageSchema = Schema({
  path:      { type: String, unique: true, required: true },
  mime_type: { type: String, enum: [ 'image/jpeg', 'image/png' ] },
  size:      { type: Number, max: 125000 }
}, {
  collection: 'images'
});

module.exports = db.model('Image', ImageSchema);

