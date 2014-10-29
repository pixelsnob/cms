
'use strict';

var db     = require('mongoose'),
    Schema = db.Schema;

var SoundSchema = Schema({
  path:      { type: String, unique: true, required: true },
  mime_type: { type: String, enum: [ 'audio/mpeg', 'audio/mp3' ] },
  size:      { type: Number }
}, {
  collection: 'sounds'
});

module.exports = db.model('Sound', SoundSchema);

