/**
 * Created by Akelaus on 12/13/13.
 */
/**
 * Created by Akelaus on 12/12/13.
 */

var fs = require('fs');
var path = require('path');
var xmlParser = require('libxmljs');
var mongoose = require('mongoose');
//var mongo = require('../db/mongo');
var config = require('../config');
var vipFeedDoc = null, metisData = [];  //to be used for object

//dynamically load all schema objects
require("fs").readdirSync("../db/schema/").forEach(function(file) {
  if(path.extname(file) == ".js") //ensure we're only loading valid javascript files
    require("../db/schema/" + file);
});

/**
 * parses a string path into an xml document, maps this to mongoose schema and returns the result
 * @param vipFeedTxt
 * @returns {Feed}
 */
function parse_feed(vipFeedTxt){

  console.log('feed to parse: ' + vipFeedTxt);
  vipDoc = fs.readFileSync(vipFeedTxt.toString());
  vipFeedDoc = xmlParser.parseXmlString(vipDoc);
  //validFeed = is_valid_feed(vipFeedDoc);

  //parse document objects
  /*
   parseBallot();
   parseCandidate();
   parseContest();
   parseElection();
   parseElectionAdmin();
   parseElectionOfficial();
   parseElectoralDistrict();
   parseFeed(vipFeedTxt);
   parseLocality();
   parsePollingLocation();
   parsePrecinct();
   parsePrecinctSplit();
   parseSource();
  */
  return parseContest(); //dataElements;
}


function parseBallot(){
  ballot_node = vipFeedDoc.get("//ballot");
}

function parseCandidate(){
  var Candidate = mongoose.model(config.mongoose.model.candidate);

  candidateModel = new Candidate(
    {
      party: parse_schema_element("candidate", "party"),
      candidate_url: parse_schema_element("candidate", "candidate_url"),
      biography: parse_schema_element("candidate", "biography"),
      phone: parse_schema_element("candidate","phone"),
      photo_url: parse_schema_element("candidate","photo_url"),
      filed_mailing_address: parse_schema_element("candidate","filed_mailing_address"),
      email: parse_schema_element("candidate","email"),
      sort_order: parse_schema_element("candidate","sort_order")
    }
  )
  return candidateModel;
}

function parseSource(){
  var Source = mongoose.model(config.mongoose.model.source);
  sourceCollection = [];
  sourceNodes = vipFeedDoc.root().find("//source");
  sourceNodes.forEach(function(sourceNode){
    sourceModel = new Source(
      {
        vip_id: parse_node_element(sourceNode, "vip_id"),
        date: parse_node_element(sourceNode, "date"),
        description: parse_node_element(sourceNode, "description"),
        name: parse_node_element(sourceNode, "name"),
        organization_url: parse_node_element(sourceNode, "organization_url"),
        feed_contact_url: parse_node_element(sourceNode, "feed_contact_url"),
        tou_url: parse_node_element(sourceNode, "tou_url")
      }
    );
    sourceCollection.push(sourceModel);
  });
  return sourceCollection;
}

function parseContest(){
  var Contest = mongoose.model(config.mongoose.model.contest);
  contestCollection = [];
  contestNodes = vipFeedDoc.root().find("//contest");
  contestNodes.forEach(function(contestNode){
    contestModel = new Contest(
      {
        id: parse_node_attribute(contestNode, "id"),
        election_id:  parse_node_element(contestNode, "election_id"),
        electoral_district_id: parse_node_element(contestNode, "electoral_district_id"),
        type: parse_node_element(contestNode, "type"),
        partisan: parse_node_element(contestNode, "partisan"),
        primary_party: parse_node_element(contestNode, "primary_party"),
        electorate_specifications: parse_node_element(contestNode, "electorate_specifications"),
        special: parse_node_element(contestNode, "special"),
        office: parse_node_element(contestNode, "office"),
        filing_closed_date: parse_node_element(contestNode, "filing_closed_date"),
        number_elected:  parse_node_element(contestNode, "number_elected"),
        number_voting_for: parse_node_element(contestNode, "number_voting_for"),
        ballot_id: parse_node_element(contestNode, "ballot_id"),
        ballot_placement: parse_node_element(contestNode, "ballot_placement")
      }
    );
    contestCollection.push(contestNode);
  });
  return contestCollection;
}

function parseElectionAdmin(){
  var ElectionAdmin = mongoose.model(config.mongoose.model.electionAdministration);
  electionModel = new ElectionAdmin(
    {
      id: parse_schema_attribute("election_administration", "id"),     //required
      name: parse_schema_element("election_administration", "name"),
      eo_id: parse_schema_element("election_administration", "eo_id"),
      ovc_id: parse_schema_element("election_administration", "ovc_id"),
      physical_address: parse_schema_element("election_administration", "physical_address"),
      mailing_address: parse_schema_element("election_administration", "mailing_address"),
      elections_url: parse_schema_element("election_administration", "elections_url"),
      registration_url: parse_schema_element("election_administration", "registration_url"),
      am_i_registered_url: parse_schema_element("election_administration", "am_i_registered_url"),
      absentee_url: parse_schema_element("election_administration", "absentee_url"),
      where_do_i_vote_url: parse_schema_element("election_administration", "where_do_i_vote_url"),
      what_is_on_my_ballot_url: parse_schema_element("election_administration", "what_is_on_my_ballot_url"),
      rules_url: parse_schema_element("election_administration", "rules_url"),
      voter_services: parse_schema_element("election_administration", "voter_services"),
      hours: parse_schema_element("election_administration", "hours")
    }
  );
  return electionModel;
}

function parseElectionOfficial(){
  var ElectionOfficial = mongoose.model(config.mongoose.model.electionOfficial);
  electionModel = new ElectionOfficial(
    {
      id: parse_schema_attribute("election_official", "id"),   //required
      title: parse_schema_element("election_official", "title"),
      phone: parse_schema_element("election_official", "phone"),
      fax: parse_schema_element("election_official", "fax"),
      email: parse_schema_element("election_official", "email")
    }
  );
  return electionModel;
}

function parseElectoralDistrict(){
  var ElectoralDistrict = mongoose.model(config.mongoose.model.electoralDistrict);
  electoralDistrict = new ElectoralDistrict(
    {
      id: parse_schema_attribute("electoral_district", "id"),
      name: parse_schema_element("electoral_district", "name"),
      type: parse_schema_element("electoral_district", "type"),
      number: parse_schema_element("electoral_district", "number")
    }
  );
  return electoralDistrict;
}

function parseLocality(){
  var Locality = mongoose.model(config.mongoose.model.locality);
  localityModel = new Locality(
    {
      date: parse_schema_element("locality", "date"),
      name: parse_schema_element("locality", "name"),
      state_id: parse_schema_element("locality", "state_id"),
      type: parse_schema_element("locality", "type"),
      election_admin_id: parse_schema_element("locality", "election_administration_id"),
      early_vote_site_id: parse_schema_element("locality", "early_vote_site_id")
    }
  )
  return localityModel;
}

function parsePollingLocation(){
  var PollingLocation = mongoose.model(config.mongoose.model.pollingLocation);
  pollingLocationModel = new PollingLocation(
    {
      id: parse_schema_attribute("polling_location", "id"),
      address: parse_schema_element("polling_location", "address"),    //TODO: figure out XMLComplexType mapping
      directions: parse_schema_element("polling_location", "directions"),
      polling_hours: parse_schema_element("polling_location", "polling_hours"),
      photo_url: parse_schema_element("polling_location", "photo_url")
    }
  )
  return pollingLocationModel;
}

function parsePrecinct(){
  var Precinct = mongoose.model(config.mongoose.model.precinct);
  precinctModel = new Precinct(
    {
      id: parse_schema_attribute("precinct", "id"),       //required
      name: parse_schema_element("precinct", "name"),
      number: parse_schema_element("precinct", "number"),
      locality_id: parse_schema_element("precinct", "locality_id"),
      electoral_district_id: parse_schema_element("precinct", "electoral_district_id"),
      ward: parse_schema_element("precinct", "ward"),
      mail_only: parse_schema_element("precinct", "mail_only"),
      polling_location_id: parse_schema_element("precinct", "polling_location_id"),
      early_vote_site_id: parse_schema_element("precinct", "early_vote_site_id"),
      ballot_style_image_url: parse_schema_element("precinct", "ballot_style_image_url")
    }
  );
  return precinctModel;
}

function parsePrecinctSplit(){
  var PrecinctSplit = mongoose.model(config.mongoose.model.precinctSplit);
  precinctSplitModel = new PrecinctSplit(
    {
      id: parse_schema_attribute("precinct", "id"),       //required
      name: parse_schema_element("precinct", "name"),
      precinct_id: parse_schema_element("precinct", "precinct_id"),
      electoral_district_id: parse_schema_element("precinct", "electoral_district_id"),
      polling_location_id: parse_schema_element("precinct", "polling_location_id"),
      ballot_style_image_url: parse_schema_element("precinct", "ballot_style_image_url")
    }
  )
  return precinctSplitModel;
}

function parseFeed(vipFeedTxt){
  var feed_name = vipFeedTxt.substring(vipFeedTxt.lastIndexOf("/")+1, vipFeedTxt.lastIndexOf('.'));
  var feed_path = vipFeedTxt.substring(0,vipFeedTxt.lastIndexOf("/")+1);
}

function parseElection(){
  /*
   *  parse feed election element data..if the feed data's determined to be valid
   *  TODO: refactor the following blocks
   */
  //if(validFeed){
  election_node = vipFeedDoc.get("//election");
  var election_date = election_node.get("//date").text();
  var election_type = election_node.get("//election_type").text();
  var state_id = election_node.get("//state_id").text();
  var state_name = vipFeedDoc.get("//state/name").text();
  var election_id = vipFeedDoc.get("election").attr("id").value();
  var vip_id = election_node.get("//vip_id").text();


  /*
   * TODO: add the following to schema in Sprint 2 -nab
   * var state_wide = election_node.get("statewide").text();
   * //var registration_info = election_node.get("//election_info");
   */
  //}

  //build Feed object and capture all relevant element data from the XML (using lixmljs)
  var vipFeed = null;
  var Feed = mongoose.model(config.mongoose.model.feed);

  //if(validFeed) {
  vipFeed = new Feed(
    {
      payload: "", //vipFeedTxt,
      election_date: new Date(election_date), //Date()
      loaded_on: Date(),
      validation_status: true,
      feed_status: "Undetermined",
      feed_type: election_type,
      name: "", //feed_name,
      state: state_name,  //will eventually be a VIP ID (TODO: consider for sprint 2)
      date: Date(), //TODO: keep this entry or "loaded_on"
      election_id: election_id,
      vip_id: vip_id,
      feed_path: "", //feed_path
    }
  );
  return vipFeed;
  //}
}

/**
 * securely grabs schema element for given node/element pair
 * @param node
 * @param element_name
 * @returns {string|*}
 */
function parse_schema_element(node_name, element_name){

  search_predicate = "//" + node_name;
  node = vipFeedDoc.get(search_predicate);

  result = "";
  try {
    search_predicate = "//" + element_name;
    result = node.get(search_predicate).text();
  }
  catch(err){
    console.error("Illegal schema element: ", element_name, "for", node_name);
  }
  return result;
}

/**
 * securely grabs schema element for given node/element pair
 * @param node
 * @param element_name
 * @returns {string|*}
 */
function parse_schema_attribute(node_name, attribute_name){
  result = "";
  search_predicate = "//" + attribute_name;
  try {

    result = vipFeedDoc.get(node_name).attr(search_predicate).value();
  }
  catch(err){
    console.error("Illegal schema attribute: ", attribute_name, "for", node_name);
  }
  return result;
}

/**
 * securely grabs node element for given node/element pair
 * @param node
 * @param element_name
 * @returns {string|*}
 */
function parse_node_element(node, element_name){
  result = "";
  try {
    search_predicate = "//" + element_name;
    result = node.get(search_predicate).text();
  }
  catch(err){
    console.error("Illegal schema element: ", element_name, "for", node.name());
  }
  return result;
}

/**
 * securely grabs node attribute for given node/element pair
 * @param node
 * @param element_name
 * @returns {string|*}
 */
function parse_node_attribute(node, attribute_name){
  result = "";
  search_predicate = "//" + attribute_name;
  try {
    result = node.attr(search_predicate).value();
  }
  catch(err){
    console.error("Illegal schema attribute: ", attribute_name, "for", node.name());
  }
  return result;
}

//model = parse_feed("sample_feed_for_v3.0.xml");
//model.forEach(function(entry){ console.log(entry.toString()) });
//mongo(model).save_metis_model();

//TODO 1: Thorough testing of Models Add
//TODO 2: Recursive saves
//TODO 3: Feed metrics
//TODO 4: Common Data collection returned by parseFeed (metisData);
