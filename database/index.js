require('dotenv').config();
const ExpressCassandra = require('express-cassandra');

let host = process.env.DB_HOST || '127.0.0.1';
let user = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
let dbName = process.env.DB_NAME || 'sdc';

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: [host],
    protocolOptions: { port: 9042 },
    keyspace: dbName,
    queryOptions: {consistency: ExpressCassandra.consistencies.one},
    authProvider: new ExpressCassandra.driver.auth.PlainTextAuthProvider(user, password)
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