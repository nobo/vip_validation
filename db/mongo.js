/**
 * Created by Akelaus on 12/3/13.
 */

  var mongoose = require("mongoose");
  var config = require("../config");

  mongoose.connect(config.mongoose.connectionString);
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error: '));
  db.once('open', function callback(){
    console.log("initialized VIP database via Mongoose");
  });

function save_model(vipModel){

  var saved = false;

  vipModel.save(function(err, vipModel) {
    if(err) {
      console.error("failed to save " + vipModel);
    }
    else {
      console.log("successful save");
      saved = true;
      process.exit();
    }
    //vipModel = vipModel;
  });
  return vipModel;
  //in case we want to do something clever with this one day, consider:  return [vipModel, saved];
}

module.exports = function(metisModel) {
  return {
     save_metis_model: function(){
      return save_model(metisModel);
    }
  };
}




