/**
 * Created by Akelaus on 12/11/13.
 */

mongoose = require("mongoose");

var config = require('../config');

//dynamically load all schema objects
require("fs").readdirSync("../db/schema/").forEach(function(file) {
  require("../db/schema/" + file);
});

function mapXmlValues(feedXmlDoc){
  //map fields from XML document by Element..

  mapElements(feedXmlDoc);
}

mapElements();

function mapElements() {
  //console.log(config.mongoose.model);
  for(var somenum = 1; somenum < config.mongoose.model.length; somenum = somenum + 1 ) {

    console.log(config.mongoose.model[somenum]);
  }

  for(var modelEntry in config.mongoose.model){
    console.log(modelEntry);
    metisSchema = mongoose.model(modelEntry);
    if(config.mongoose.model.hasOwnProperty(modelEntry)) {
      for(path in metisSchema.paths) {
        if(!metisSchema.hasOwnProperty(path))
          console.log("---> ", path);
      }
      console.log("..");
      console.log("..");
    }

  }
}
