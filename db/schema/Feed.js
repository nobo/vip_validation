/**
 * Created by Akelaus on 12/2/13.
 */
var mongoose = require('mongoose');
var config = require('../../config');

//define Feed schema and register with MongoDB
var FeedSchema = mongoose.Schema({
  payload: Buffer,
  election_date: Date,
  loaded_on: Date,
  validation_status: Boolean,
  feed_status: String,
  feed_type: String,
  name: String,
  state: String,
  date: Date,
  election_id: String,
  source_id: String,
  vip_id: String,
  feed_path: String
});
mongoose.model(config.mongoose.model.feed, FeedSchema);
