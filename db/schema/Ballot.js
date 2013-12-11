/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');

//define Ballot schema and register in MongoDB
var BallotSchema = mongoose.Schema({
  id: String, //required
  referendum_id: String,
  candidate_id: String, //many..with sort order
  //TODO: capture sort_order here?? for XMLComplexType
  custom_ballot_id: String,
  write_in: Boolean,
  image_url: String
});
mongoose.model('ballot', BallotSchema);
//var Ballot = mongoose.model('Ballot');