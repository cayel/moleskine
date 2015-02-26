var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FilmSchema   = new Schema({
  titre: String,
  realisateur : String,
  cine : Boolean,
  date : Date,
  note : Number
});

module.exports = mongoose.model('Film', FilmSchema);
