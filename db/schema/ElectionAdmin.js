/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');
config = require('../../config');

//define ElectionAdmin schema and register in MongoDB
var ElectionAdminSchema = mongoose.Schema({
  id: String,     //required
  name: String,
  eo_id: String,
  ovc_id: String,
  physical_address: String,
  mailing_address: String,
  elections_url: String,
  registration_url: String,
  am_i_registered_url: String,
  absentee_url: String,
  where_do_i_vote_url: String,
  what_is_on_my_ballot_url: String,
  rules_url: String,
  voter_services: String,
  hours: String
});
mongoose.model(config.mongoose.model.electionAdministration, ElectionAdminSchema);
//var ElectionAdmin = mongoose.model('ElectionAdmin');
