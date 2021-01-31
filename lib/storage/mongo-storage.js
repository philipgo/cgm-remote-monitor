'use strict';

const {MongoClient} = require('mongodb');

async function init(env, cb, forceNewConnection) {
try{
       const mongo = new MongoClient(env.storageURI, {useUnifiedTopology: true});
       await mongo.connect();
       const dbName = mongo.s.options.dbName;
       mongo.db = mongo.db(dbName);
       const result = await mongo.db.command({ connectionStatus: 1 });
       mongo.collection = function get_collection(name) {
		return mongo.db.collection(name);
	   }
	   return mongo;
}
catch(e){console.error(e);}
}

module.exports = init;
