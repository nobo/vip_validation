/**
 * Created by Akelaus on 12/2/13.
 */

  mongoose = require('mongoose');
  config = require('../../config');

//define Source schema and register in MongoDB
var SourceSchema = mongoose.Schema({
  id: String,
  vip_id: String,  //required
  datetime: Date,
  description: String,
  name: String,
  organization_url: String,
  feed_contact_id: String, //TODO: investigate possibly replacing with feed_contact_id
  tou_url: String
});
mongoose.model(config.mongoose.model.source, SourceSchema);

// instantiate a registered model using the following: var Source = mongoose.model('source');