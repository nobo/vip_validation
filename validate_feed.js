/**
 * Created by Akelaus on 11/25/13.
 */


var fs = require('fs');
var xmlParser = require('libxmljs');
var mongoose = require('mongoose');
var config = require('./config');
var mongo = require('./db/mongo');

/**
 * main process routine for path passed into
 * @param vipFeedPath
 */
function process_feed(vipFeedPath){
  if (valid_source_path(vipFeedPath)) {
    parse_feed(vipFeedPath);
  }
  else {
    console.error("File Path invalid");
    process.exit();
  }
}

/**
 * confirms the presence of the path passed in as argument
 * @param file_path
 * @returns {boolean}
 */
function valid_source_path(file_path){
  console.log('verify source path');
  exists = fs.existsSync(file_path);
  console.log('Does path and file exist? ' + exists);
  return exists;
}

/**
 * parses text representation of VIP feed into XML format
 * @param vipFeedTxt
 */
function parse_feed(vipFeedTxt){
  console.log('feed to parse: ' + vipFeedTxt);
  var vipFeedDoc = xmlParser.parseXmlString(fs.readFileSync(vipFeedTxt.toString()));
  validFeed = is_valid_feed(vipFeedDoc);

  metisData = require("./xml/feedParser")(vipFeedTxt).parse_metis_feed();

  //recursively save each model parsed into Mongo
  metisData.forEach(function(model){
      mongo(model).save_metis_model();
  });
}

/**
 * validates VIP Feed doc (currently against 3.0 schema)
 * @param vipFeedDoc - text representation of the XML document
 */
function is_valid_feed(vipFeedDoc) {
  //validate VIP feed against schema v3.0
  console.log('attempting to validate against VIP schema v3.0');

  vipXSDPath = config.vipSchema.path;   //TODO: consider
  var vipXSDDoc = xmlParser.parseXmlString(fs.readFileSync(vipXSDPath.toString()));

  isValid = vipFeedDoc.validate(vipXSDDoc);
  console.log("Parsed feed value: " + isValid); //TODO: add schema for valid_status
  return isValid;
}

module.exports = function(feed_path) {
  return {
    process_path: function(){
      return process_feed(feed_path);
    }
  };
}

/*
DONE: 1 Instantiate handler for file path
Done: 2 Error handling for filepath, name, format, etc
TODO: 3 Eliminate mongoose memory leaks
TODO: 4 Unit tests for mongoose, init and server functions
TODO: 5 Wrap processing method as Endpoint??
 */

