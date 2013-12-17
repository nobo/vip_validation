/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');
config = require('../../config');

//define PrecinctSplit schema and register in MongoDB
var PrecinctSplitSchema = mongoose.Schema({
  id: String,       //required
  name: String,
  precinct_id: String,
  electoral_district_id: String,
  polling_location_id: String,
  ballot_style_image_url: String
});
mongoose.model(config.mongoose.model.precinctSplit, PrecinctSplitSchema);
//var PrecinctSplit = mongoose.model('PrecinctSplit');