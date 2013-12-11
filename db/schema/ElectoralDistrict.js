/**
 * Created by Akelaus on 12/11/13.
 */
mongoose = require('mongoose');

//define ElectoralDistrict schema and register in MongoDB
var ElectoralDistrictSchema = mongoose.Schema({
  id: String, //required
  name: String,
  type: String,
  number: String
});
mongoose.model('ElectoralDistrict', ElectoralDistrictSchema);
//var ElectoralDistrict = mongoose.model('ElectoralDistrict');