/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');
config = require('../../config');

//define Candidate schema and register in MongoDB
var CandidateSchema = mongoose.Schema({
  name: String,
  party: String,
  candidate_url: String,
  biography: String,
  phone: String,
  photo_url: String,
  filed_mailing_address: String, //TODO: how to acct for XMLComplexType
  email: String,
  sort_order: String
});
mongoose.model(config.mongoose.model.candidate, CandidateSchema);
//var Candidate = mongoose.model('Candidate');