var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BdSchema   = new Schema({
  titre: String,
  scenariste : String,
  dessinateur : String,
  date : Date,
  note : Number
});

module.exports = mongoose.model('Bd', BdSchema);
