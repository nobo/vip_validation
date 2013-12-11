/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');

//define ElectionOfficial schema and register in MongoDB
var ElectionOfficialSchema = mongoose.Schema({
  id: String,   //required
  title: String,
  phone: String,
  fax: String,
  email: String
});
mongoose.model('ElectionOfficial', ElectionOfficialSchema);
//var ElectionOfficial = mongoose.model('ElectionOfficial');