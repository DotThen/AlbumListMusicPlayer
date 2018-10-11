const ExpressCassandra = require('express-cassandra');

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['18.222.194.221'],
    protocolOptions: { port: 9042 },
    socketOptions: { 
      connectTimeout: 1000,
      readTimeout: 2500
    },
    keyspace: 'sdc',
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

const ArtistsModel = models.loadSchema('artists', {
  fields: {
    artistID: 'int',
    artistName: 'text',
    albums: {
      type: 'list',
      typeDef: '<frozen<album>>'
    }
  },
  key: ['artistID']
});

ArtistsModel.syncDB(function(err, result) {
  if (err) throw err;
  console.log(result);
});