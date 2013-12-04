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
  //TODO: define useful schema methods..esp for debug
