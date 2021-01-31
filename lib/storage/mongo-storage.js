''use strict';

const {MongoClient} = require('mongodb');

function init(env, cb, forceNewConnection) {
       const mongo = new MongoClient(env.storageURI, { useNewUrlParser: true }, { useUnifiedTopology: true } );
       await mongo.connect();
       const dbName = mongo.s.options.dbName;
       mongo.db = mongo.db(dbName);
       const result = await mongo.db.command({ connectionStatus: 1 });
       mongo.collection = function get_collection(name) {
		return mongo.db.collection(name);
	   };
}

module.exports = init;
