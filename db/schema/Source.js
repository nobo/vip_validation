/**
 * Created by Akelaus on 12/2/13.
 */

  mongoose = require('mongoose');

//define Source schema and register in MongoDB
var SourceSchema = mongoose.Schema({
  vip_id: String,  //required
  date: Date,
  description: String,
  name: String,
  organization_url: String,
  feed_contact_url: String, //TODO: investigate possibly replacing with feed_contact_id
  tou_url: String
});
mongoose.model('Source', SourceSchema);
//var Source = mongoose.model('Source');