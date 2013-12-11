/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');

//define Locality schema and register in MongoDB
var LocalitySchema = mongoose.Schema({
  date: Date,
  name: String,
  state_id: String,
  type: String,
  election_admin_id: String,
  early_vote_site_id: String
});
mongoose.model('Locality', LocalitySchema);
//var Locality = mongoose.model('Locality');