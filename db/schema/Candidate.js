/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');

//define Candidate schema and register in MongoDB
var CandidateSchema = mongoose.Schema({
  party: String,
  candidate_url: String,
  biography: String,
  phone: String,
  photo_url: String,
  filed_mailing_address: String, //TODO: how to acct for XMLComplexType
  email: String,
  sort_order: String
});
mongoose.model('Candidate', CandidateSchema);
//var Candidate = mongoose.model('Candidate');