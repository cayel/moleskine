var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookSchema   = new Schema({
  titre: String,
  auteur : String,
  date : Date,
  note : Number
});

module.exports = mongoose.model('Book', BookSchema);
