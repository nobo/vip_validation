/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');
config = require('../../config');

//define ElectionOfficial schema and register in MongoDB
var ElectionOfficialSchema = mongoose.Schema({
  id: String,   //required
  name: String,
  title: String,
  phone: String,
  fax: String,
  email: String
});
mongoose.model(config.mongoose.model.electionOfficial, ElectionOfficialSchema);
//var ElectionOfficial = mongoose.model('ElectionOfficial');