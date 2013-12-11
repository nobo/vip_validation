/**
 * Created by Akelaus on 12/2/13.
 */
mongoose = require('mongoose');

// Create a schema for our data
var ElectionSchema = new mongoose.Schema({
  id: String,  //required
  date: Date,
  type: String,
  state_id: String,
  statewide: Boolean,
  registration_info: String,
  results_url: String,
  polling_hours: String,
  election_day_registration: Boolean,
  registration_deadline: Date,
  absentee_request_deadline: Date
});

// Use the schema to register a model with MongoDb
mongoose.model('Election', ElectionSchema);
var Election = mongoose.model('Election');
