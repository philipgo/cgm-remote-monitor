'use strict';

const {MongoClient} = require('mongodb');

function init(env, cb, forceNewConnection) {
       const mongo.client = new MongoClient(env.storageURI, useNewUrlParser: true, useUnifiedTopology: true);
       await mongo.client.connect();
       const dbName = mongo.client.s.options.dbName;
       mongo.db = mongo.client.db(dbName);
       const result = await mongo.db.command({ connectionStatus: 1 });
       const roles = result.authInfo.authenticatedUserRoles
      };

      return connect_with_retry(1);

    }
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
