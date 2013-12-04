

var config = {}

/**
 * vipSchema contains metadata regarding the VIP XSD
 * @type {{version: number, path: string}}
 */
config.vipSchema = {
  version: 3.0,
  path: "./xml/vip_spec_v3.0.xsd"
};

/**
 * vipModel contains data regarding db schema model values
 * @type {{feed: string, election: string, source: string}}
 */
config.mongoose = {
  model: {
    feed: "Feed",
    election: "Election",
    source: "Source"
  },
  connectionString: "mongodb://localhost/vipfeed"
}

/**
 * general web app environment settings
 * @type {{version: number, path: string}}
 */
config.web = {
  port: process.env.PORT || 9612
};


module.exports = config;