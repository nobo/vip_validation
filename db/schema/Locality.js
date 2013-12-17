/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');
config = require('../../config');

//define Locality schema and register in MongoDB
var LocalitySchema = mongoose.Schema({
  id: String,
  name: String,
  state_id: String,
  type: String,
  election_admin_id: String,
  early_vote_site_id: String
});
mongoose.model(config.mongoose.model.locality, LocalitySchema);
//var Locality = mongoose.model('Locality');