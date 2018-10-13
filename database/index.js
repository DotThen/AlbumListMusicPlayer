require('dotenv').config();
const ExpressCassandra = require('express-cassandra');

let host = process.env.DB_HOST || '52.14.95.181';
let dbName = process.env.DB_NAME || 'sdc';

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: [host],
    protocolOptions: { port: 9042 },
    socketOptions: { 
      connectTimeout: 1000,
      readTimeout: 2500
    },
    keyspace: dbName,
    queryOptions: {consistency: ExpressCassandra.consistencies.one}
  }, 
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 3
    },
    migration: 'safe',
  }
});

module.exports.models = models;