/**
 * Created by Akelaus on 12/2/13.
 */

  mongoose = require('mongoose');

//define Source schema and register in MongoDB
var SourceSchema = mongoose.Schema({
  date: Date
});
mongoose.model('Source', SourceSchema);
//var Source = mongoose.model('Source');