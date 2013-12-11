/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');

//define PollingLocation schema and register in MongoDB
var PollingLocationSchema = mongoose.Schema({
  id: String,   //required
  address: String,    //TODO: figure out XMLComplexType mapping
  directions: String,
  polling_hours: String,
  photo_url: String
});
mongoose.model('PollingLocation', PollingLocationSchema);
//var PollingLocation = mongoose.model('PollingLocation');