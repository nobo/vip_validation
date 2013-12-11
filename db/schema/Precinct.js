/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');

//define Precinct schema and register in MongoDB
var PrecinctSchema = mongoose.Schema({
  id: String,       //required
  name: String,
  number: String,
  locality_id: String,
  electoral_district_id: String,
  ward: String,
  mail_only: String,
  polling_location_id: String,
  early_vote_site_id: String,
  ballot_style_image_url: String
});
mongoose.model('Precinct', PrecinctSchema);
//var Precinct = mongoose.model('Precinct');