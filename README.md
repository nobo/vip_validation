Vip Validation
==============

Validation for voter information project

this project is a basic proof of concept for the processing of VIP Feeds compliant to the VIP v3.0 specification

Getting Started

---> Backend Environment

Ensure that you have MongoDB installed and running (http://www.mongodb.org/)
1) npm install mongo
2) ensure the process is running (i.e. - mongodb on MacOSX )
3) optionally, start a shell for debug (i.e. - mongo) or monitoring (i.e. - tail -f <mongodb_logs> 

---> Feed Processing Engine

Initialize service by passing the [relative] path of the file you wish to commit to Mongo (e.g.- ./xml/<file_to_parse>)
For now, please load all files to be parsed in the 'xml' directory..this will change in later iterations.

Ensure that you have Node.js and its package manager (NPM) installed and configured (nodejs.org)
1) node app.js <file_path>  : where "file_path" is a location reachable via the the hosting server

Please send any comments, questions, etc my way.

Thanks!
-nobo
 
