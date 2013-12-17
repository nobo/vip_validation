/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');
config = require('../../config');

//define Contest schema and register in MongoDB
var ContestSchema = mongoose.Schema({
  id: String,     //required
  election_id:  String,
  electoral_district_id:  String,
  type: String,
  partisan: Boolean,
  primary_party: String,
  electorate_specifications: String,
  special: Boolean,
  office: String,
  filing_closed_date: Date,
  number_elected:  String,
  number_voting_for: String,
  ballot_id: String,
  ballot_placement: String
});
mongoose.model(config.mongoose.model.contest, ContestSchema);
//var Contest = mongoose.model('Contest');