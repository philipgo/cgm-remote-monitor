'use strict';

const MongoClient = require('mongodb').MongoClient;

const mongo = {
  client: null,
  db: null,
};

function init(env, cb, forceNewConnection) {
  {
      console.log('Setting up new connection to MongoDB');
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

   
        mongo.client = new MongoClient(env.storageURI, options);
          await mongo.client.connect();
          console.log('Successfully established a connected to MongoDB');
          const dbName = mongo.client.s.options.dbName;
          mongo.db = mongo.client.db(dbName);
          const result = await mongo.db.command({ connectionStatus: 1 });
         

          // If there is a valid callback, then invoke the function to perform the callback
          if (cb && cb.call) {
            cb(null, mongo);
          }
       

  mongo.collection = function get_collection(name) {
    return mongo.db.collection(name);
  };

  mongo.ensureIndexes = function ensureIndexes(collection, fields) {
    fields.forEach(function (field) {
      console.info('ensuring index for: ' + field);
      collection.createIndex(field, { 'background': true }, function (err) {
        if (err) {
          console.error('unable to ensureIndex for: ' + field + ' - ' + err);
        }
      });
    });
  };

  return maybe_connect(cb);
}

module.exports = init;
