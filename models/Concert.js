var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConcertSchema   = new Schema({
  artiste: String,
  avec : String,
  salle : String,
  date : Date,
  note : Number
});

module.exports = mongoose.model('Concert', ConcertSchema);
