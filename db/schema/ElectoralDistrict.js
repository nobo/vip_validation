/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');
config = require('../../config');

//define ElectoralDistrict schema and register in MongoDB
var ElectoralDistrictSchema = mongoose.Schema({
  id: String, //required
  name: String,
  type: String,
  number: String
});
mongoose.model(config.mongoose.model.electoralDistrict, ElectoralDistrictSchema);
//var ElectoralDistrict = mongoose.model('ElectoralDistrict');