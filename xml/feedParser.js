/**
 * Created by Akelaus on 12/12/13.
 */

var fs = require('fs');
var path = require('path');
var xmlParser = require('libxmljs');
var mongoose = require('mongoose');
var mongo = require('../db/mongo');
var config = require('../config');
var vipFeedDoc = null;
var metisData = [];  //to be used for object

//dynamically load all schema objects
fs.readdirSync("./db/schema/").forEach(function(file) {
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
  vipFeedDoc = xmlParser.parseXml(vipDoc);

  //finally, let's get to parsing (by Object)..
  parseSource();
  parseElection();
  parseBallot();
  parseCandidate();
  parseContest();
  parseElectionAdmin();
  parseElectionOfficial();
  parseElectoralDistrict();
  parseLocality();
  parsePollingLocation();
  parsePrecinct();
  parsePrecinctSplit();
  parseFeed(vipFeedTxt);

  return metisData;
}

function parseBallot(){
  console.log('identifying ballot data to parse...');
  var Ballot = mongoose.model(config.mongoose.model.ballot);
  searchTerm = "//" + config.mongoose.model.ballot;
  ballotNodes = vipFeedDoc.root().find(searchTerm);
  ballotNodes.forEach(function(ballotNode){
    ballotModel = new Ballot(
      {
         id:  parse_node_attribute(ballotNode, "id"), //required
         referendum_id: parse_node_element(ballotNode, "referendum_id"),
         candidate_id: parse_node_element(ballotNode, "candidate_id"),
         sort_order:  parse_node_element(ballotNode, "sort_order"),
         custom_ballot_id: parse_node_element(ballotNode, "custom_ballot_id"),
         write_in:  parse_node_element(ballotNode, "write_in"),  //TODO: parse as boolean
         image_url: parse_node_element(ballotNode, "image_url")
      });
    metisData.push(ballotModel);
    console.log("..");
  });
  return metisData;
}

function parseCandidate(){
  console.log('identifying candidate data to parse...');
  var Candidate = mongoose.model(config.mongoose.model.candidate);
  searchTerm = "//" + config.mongoose.model.candidate;
  candidateNodes = vipFeedDoc.root().find(searchTerm);
  candidateNodes.forEach(function(candidateNode){
    candidateModel = new Candidate(
      {
        name: parse_node_element(candidateNode, "name"),
         party: parse_node_element(candidateNode, "party"),
        candidate_url: parse_node_element(candidateNode, "candidate_url"),
        biography: parse_node_element(candidateNode, "biography"),
        phone: parse_node_element(candidateNode,"phone"),
        photo_url: parse_node_element(candidateNode,"photo_url"),
        filed_mailing_address: parse_node_element(candidateNode,"filed_mailing_address"),
        email: parse_node_element(candidateNode,"email"),
        sort_order: parse_node_element(candidateNode,"sort_order")
      });
    metisData.push(candidateModel);
  });
  return metisData;
}

function parseSource(){
  console.log('scanning for source data to parse...');

  var Source = mongoose.model(config.mongoose.model.source);
  searchTerm = "//" + config.mongoose.model.source;
  sourceNodes = vipFeedDoc.root().find(config.mongoose.model.source);
  sourceNodes.forEach(function(sourceNode){
    sourceModel = new Source(
      {
        id: parse_node_attribute(sourceNode, "id"),
        vip_id: parse_node_element(sourceNode, "vip_id"),
        datetime: parse_node_element(sourceNode, "datetime"),
        description: parse_node_element(sourceNode, "description"),
        name: parse_node_element(sourceNode, "name"),
        organization_url: parse_node_element(sourceNode, "organization_url"),
        feed_contact_id: parse_node_element(sourceNode, "feed_contact_id"),
        tou_url: parse_node_element(sourceNode, "tou_url")
      });
  metisData.push(sourceModel);
  });
  return metisData;
}

function parseContest(){
  console.log('scanning for contest data to parse...');

  var Contest = mongoose.model(config.mongoose.model.contest);
  searchTerm = "//" + config.mongoose.model.contest;
  contestNodes = vipFeedDoc.root().find(searchTerm);
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
    metisData.push(contestModel);
  });
  return metisData;
}

function parseElectionAdmin(){
  console.log('detecting election administration data to parse...');

  var ElectionAdmin = mongoose.model(config.mongoose.model.electionAdministration);
  searchTerm = "//" + config.mongoose.model.electionAdministration;
  electionAdminNodes = vipFeedDoc.root().find(searchTerm);
  electionAdminNodes.forEach(function(electionAdminNode){
    electionModel = new ElectionAdmin(
      {
        id: parse_node_attribute(electionAdminNode, "id"),     //required
        name: parse_node_element(electionAdminNode, "name"),
        eo_id: parse_node_element(electionAdminNode, "eo_id"),
        ovc_id: parse_node_element(electionAdminNode, "ovc_id"),
        physical_address: parse_node_element(electionAdminNode, "physical_address"),
        mailing_address: parse_node_element(electionAdminNode, "mailing_address"),
        elections_url: parse_node_element(electionAdminNode, "elections_url"),
        registration_url: parse_node_element(electionAdminNode, "registration_url"),
        am_i_registered_url: parse_node_element(electionAdminNode, "am_i_registered_url"),
        absentee_url: parse_node_element(electionAdminNode, "absentee_url"),
        where_do_i_vote_url: parse_node_element(electionAdminNode, "where_do_i_vote_url"),
        what_is_on_my_ballot_url: parse_node_element(electionAdminNode, "what_is_on_my_ballot_url"),
        rules_url: parse_node_element(electionAdminNode, "rules_url"),
        voter_services: parse_node_element(electionAdminNode, "voter_services"),
        hours: parse_node_element(electionAdminNode, "hours")
    });
    metisData.push(electionModel);
  });
  return metisData;
}

function parseElectionOfficial(){
  console.log('scanning election official data to parse...');

  var ElectionOfficial = mongoose.model(config.mongoose.model.electionOfficial);
  searchTerm = "//" + config.mongoose.model.electionOfficial;
  electionOfficialNodes = vipFeedDoc.root().find(searchTerm);
  electionOfficialNodes.forEach(function(electionOfficialNode){
    electionOfficialModel = new ElectionOfficial(
      {
        id: parse_node_attribute(electionOfficialNode, "id"),   //required
        name: parse_node_element(electionOfficialNode, "name"),
        title: parse_node_element(electionOfficialNode, "title"),
        phone: parse_node_element(electionOfficialNode, "phone"),
        fax: parse_node_element(electionOfficialNode, "fax"),
        email: parse_node_element(electionOfficialNode, "email")
      }
    );
    metisData.push(electionOfficialModel);
  });
  return metisData;
}

function parseElectoralDistrict(){
  console.log('scanning electoral district data to parse...');

  var ElectoralDistrict = mongoose.model(config.mongoose.model.electoralDistrict);
  searchTerm = "//" + config.mongoose.model.electoralDistrict;
  electoralDistrictNodes = vipFeedDoc.root().find(searchTerm);
  electoralDistrictNodes.forEach(function(electoralDistrictNode){
    electoralDistrictModel = new ElectoralDistrict(
      {
        id: parse_node_attribute(electoralDistrictNode, "id"),
        name: parse_node_element(electoralDistrictNode, "name"),
        type: parse_node_element(electoralDistrictNode, "type"),
        number: parse_node_element(electoralDistrictNode, "number")
    });
    metisData.push(electoralDistrictModel);
  });
  return metisData;
}

function parseLocality(){
  console.log('scanning locality data to parse...');

  var Locality = mongoose.model(config.mongoose.model.locality);
  searchTerm = "//" + config.mongoose.model.locality;
  localityNodes = vipFeedDoc.root().find(searchTerm);
  localityNodes.forEach(function(localityNode){
    localityModel = new Locality(
    {
        name: parse_node_element(localityNode, "name"),
        state_id: parse_node_element(localityNode, "state_id"),
        type: parse_node_element(localityNode, "type"),
        election_administration_id: parse_node_element(localityNode, "election_administration_id"),
        early_vote_site_id: parse_node_element(localityNode, "early_vote_site_id")
    });
    metisData.push(localityModel);
  });
  return metisData;
}

function parsePollingLocation(){
  console.log('scannning polling location data to parse...');

  var PollingLocation = mongoose.model(config.mongoose.model.pollingLocation);
  searchTerm = "//" + config.mongoose.model.pollingLocation;
  pollingLocations = vipFeedDoc.root().find(searchTerm);
  pollingLocations.forEach(function(pollingLocation){
    pollingLocationModel = new PollingLocation(
      {
        id: parse_node_attribute(pollingLocation, "id"),
        address: parse_node_element(pollingLocation, "address"),    //TODO: figure out XMLComplexType mapping
        directions: parse_node_element(pollingLocation, "directions"),
        polling_hours: parse_node_element(pollingLocation, "polling_hours"),
        photo_url: parse_node_element(pollingLocation, "photo_url")
    });
    metisData.push(pollingLocationModel);
  });
  return metisData;
}

function parsePrecinct(){
  console.log('scanning precinct data to parse...');

  var Precinct = mongoose.model(config.mongoose.model.precinct);
  searchTerm = "//" + config.mongoose.model.precinct;
  precinctNodes = vipFeedDoc.root().find(searchTerm); //TODO: refactor these two lines into a single call
  precinctNodes.forEach(function(precinctNode){
    precinctModel = new Precinct(
      {
        id: parse_node_attribute(precinctNode, "id"),       //required
        name: parse_node_element(precinctNode, "name"),
        number: parse_node_element(precinctNode, "number"),
        locality_id: parse_node_element(precinctNode, "locality_id"),
        electoral_district_id: parse_node_element(precinctNode, "electoral_district_id"),
        ward: parse_node_element(precinctNode, "ward"),
        mail_only: parse_node_element(precinctNode, "mail_only"),
        polling_location_id: parse_node_element(precinctNode, "polling_location_id"),
        early_vote_site_id: parse_node_element(precinctNode, "early_vote_site_id"),
        ballot_style_image_url: parse_node_element(precinctNode, "ballot_style_image_url")
      });
      metisData.push(precinctModel);
  });
  return metisData;
}

function parsePrecinctSplit(){
  console.log('scanning precinct split data to parse...');

  var PrecinctSplit = mongoose.model(config.mongoose.model.precinctSplit);
  searchTerm = "//" + config.mongoose.model.precinctSplit;
  precinctSplitNodes = vipFeedDoc.root().find(searchTerm);
  precinctSplitNodes.forEach(function(precinctSplitNode){
    precinctSplitModel = new PrecinctSplit(
      {
        id: parse_node_attribute(precinctSplitNode, "id"),       //required
        name: parse_node_element(precinctSplitNode, "name"),
        precinct_id: parse_node_element(precinctSplitNode, "precinct_id"),
        electoral_district_id: parse_node_element(precinctSplitNode, "electoral_district_id"),
        polling_location_id: parse_node_element(precinctSplitNode, "polling_location_id"),
        ballot_style_image_url: parse_node_element(precinctSplitNode, "ballot_style_image_url")
      });
      metisData.push(precinctSplitModel);
  });
  return metisData;
}

function parseElection(){
  console.log('scanning election data to parse...');

  var Election = mongoose.model(config.mongoose.model.election);
  searchTerm = "//" + config.mongoose.model.election;
  electionNodes = vipFeedDoc.root().find(searchTerm);
  electionNodes.forEach(function(electionNode){
    electionModel = new Election(
    {
      id: parse_node_element(electionNode, "id"),  //required
      date: parse_node_element(electionNode, "date"),
      type: parse_node_element(electionNode, "election_type"),
      state_id: parse_node_element(electionNode, "state_id"),
      statewide: parse_node_element(electionNode, "state_wide"),
      registration_info: parse_node_element(electionNode, "registration_info"),
      results_url: parse_node_element(electionNode, "results_url"),
      polling_hours: parse_node_element(electionNode, "polling_hours"),
      election_day_registration: parse_node_element(electionNode, "election_day_registration"),
      registration_deadline: parse_node_element(electionNode, "registration_deadline"),
      absentee_request_deadline: parse_node_element(electionNode, "absentee_request_deadline")
    });
    metisData.push(electionModel);
  });
  return metisData;
}

function parseFeed(vipFeedTxt){
  var Feed = mongoose.model(config.mongoose.model.feed);
  var feed_name = vipFeedTxt.substring(vipFeedTxt.lastIndexOf("/")+1, vipFeedTxt.lastIndexOf('.'));
  var feed_path = path.dirname(vipFeedTxt);
  searchTerm = "//" + config.mongoose.model.election;
  electionNodes = vipFeedDoc.root().find(searchTerm);
  electionNodes.forEach(function(electionNode){
    feedModel = new Feed(
    {
      //payload: vipFeedDoc.toString(),
      election_date: parse_node_element(electionNode, "date"),
      loaded_on: Date(),
      validation_status: true,
      feed_status: "Undetermined",
      feed_type: parse_node_element(electionNode, "election_type"),
      name: feed_name,
      state: parse_node_element(electionNode, "state_id"),
      date: Date(), //TODO: keep this entry or "loaded_on"
      source_id: parse_node_attribute(vipFeedDoc.root().get("source"), "id"),
      election_id: parse_node_attribute(electionNode, "id"),
      vip_id: parse_node_element(vipFeedDoc.root().get("source"), "vip_id"),
      feed_path: feed_path
    });
    metisData.push(feedModel);
  });
  return metisData;
}

/**
 * seamlessly grabs node element for given node/element pair
 * @param node
 * @param element_name
 * @returns {string|*}
 */
function parse_node_element(node, element_name){
  result = "";
  try {
    search_predicate = element_name;
    res = node.get(search_predicate);
    if(res != null)
      result = res.text();
    //console.log("element:", element_name, "| value:", result); // <-- debug line
  }
  catch(err){
    console.error("Illegal schema element: ", element_name, "for", node.name());
  }
  return result;
}

/**
 * seamlessly grabs node attribute for given node/element pair
 * @param node
 * @param element_name
 * @returns {string|*}
 */
function parse_node_attribute(node, attribute_name){
  result = "";
  search_predicate = attribute_name;
  try {
    res = node.attr(search_predicate);
    if(res != null)
      result = res.value();
    //console.log("attribute:", attribute_name, " | value:", result); // <-- debug line
  }
  catch(err){
    console.error("Illegal schema attribute: ", attribute_name, "for", node.name());
  }
  return result;
}


module.exports = function (feed_path) {
  return {
    parse_metis_feed: function () {
      return parse_feed(feed_path);
    }
  };
}
/*
parse_feed(process.argv[2]);
process.exit();
*/

//DONE 1: Thorough testing of Models Add
//Done 2: Recursive saves
//TODO 3: Feed metrics
//Done 4: Common Data collection returned by parseFeed (metisData);
