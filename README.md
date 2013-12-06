VIP Validation
==============

## Validation for Voter Information Project 
Project Overview: https://votinginfoproject.org/

This project is a basic proof of concept for the processing of VIP Feeds compliant to the VIP v3.0 specification. More comments, docs to come soon.  Application frontend, with full UI management of feeds data also in development in a parallel effort.  Merge will occur in upcoming weeks to a single repository structure, hosted by the project sponsor.

Please post any comments, questions or concerns. Enjoy!

-nobo

 -----------
### Prerequisites

The feed processor utlizes Node.js and MongoDB. Ensure that you have [Node](nodejs.org), its [Node Package Manager (NPM)](npmjs.org) installed and configured. MongoDB is a document-based storage solution that will function as our application's backend.  Configuration looks like the following in MacOSX:

- [MongoDB](http://www.mongodb.org/)


            >  brew install mongo 
  

- [Node](http://nodejs.org)

            >  brew install node
            >  brew install npm
            >  npm update**

  * **NPM update will install all package dependencies for vip_valiation, which includes: 
     * [mongoose](mongoosejs.org), a savvy ORM for MongoDB
     * [libxmljs](https://github.com/polotek/libxmljs), my xml parser of the month  

---

### Running The Processor
1. Start MongoDB
  - Ensure the process is running (i.e. - mongodb on MacOSX )

            >  mongod                   

  - Optionally, monitor or debug mongo in separate shells, respectively
  
            >  mongo              
            >  tail -f mongodb_log_dir 

2. Start Feed Processor
  - Initialize service by passing the [relative] path of the file you wish to parse (e.g.- ./xml/<file_to_parse>) as an argument to the application at initialization
   
            > node app.js feed_doc_path

        * feed_doc_path is a location reachable via the the host server
        
  - Example

            > node app.js ./test_data/vipFeed-51-2013-06-11.xml 
            ..
            ..
            ..
            feed to parse: ./test_data/vipFeed-51-2013-06-11.xml
            ..
            ..
            feed parsed successfully and is compliant with VIP feed spec v3.0
            ..
            ..
            saving feed vipFeed-51-2013-06-11 to Mongo
            ..
            ..
            successful save
            EOP
            > _

 
-----------

 
