/**
 * Created by Akelaus on 12/3/13.
 */

//var validate_node = require("./server");
//var config = require("./config");


if (process.argv.length > 2 && process.argv[2] != null){
  validate_feed = require("./validate_feed");
  validate_feed(process.argv[2]).process_path();
}
else {
  console.error("ERROR: insufficient arguments provided \n");
  /*
  process.argv.forEach(function(val, index, array){
    console.error(index + ": " + val);
  })
  console.error("");
  */
  console.log("Usage: node  <javascript_file_name>  <relative_xml_file_path>");
  console.log("");
  process.exit();
}
