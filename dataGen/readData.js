require('dotenv').config();
const fs = require('fs');
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

const loopRead = async (artists) => {
  for (let i = 0; i < artists.length; i++) {
    let artist = new ArtistsModel({
      artistID: artists[i].artistID,
      artistName: artists[i].artistName,
      albums: artists[i].albums
    });
    await seedAsync(artist);
    if (i % 1000 === 0) {
      console.log('saved artist ' + i);
    }
  }
}


const seedAsync = (artistObj) => new Promise((resolve, reject) => {
  artistObj.saveAsync()
    .then(resolve);
})

ArtistsModel.syncDB((err, results) => {
  if (err) {
    console.error('BIG OLE ERROR: ', err);
  } else {
    console.log(results);
    fs.readFile('../data/data1.json', (err, data) => {
      let artists = JSON.parse(data);
      loopRead(artists);
    });
    // fs.readFile('../data/data1.json', (err, data) => {
    //   let artists = JSON.parse(data);
    //   for (let i = 0; i < artists.length / 1000; i++) {
    //     let artist = new ArtistsModel({
    //       artistID: artists[i].artistID,
    //       artistName: artists[i].artistName,
    //       albums: artists[i].albums
    //     });
    //     let saveEvent = artist.save({return_query: true});
    //     artistQueries.push(saveEvent);
    //   }
    //   models.doBatch(artistQueries, (err) => {
    //     if (err) {
    //       console.error('ERROR: ', err);
    //     } else {
    //       console.log('OH YEAH');
    //     }
    //   });
    // });
  }
});

/*
 udts: {
      song: {
        "songID": 'int',
        "songName": 'text',
        streams: 'int',
        length: 'int',
        popularity: 'int',
        "addedToLibrary": 'Boolean'
      },
      album: {
        "albumID": 'int',
        "albumName": 'text',
        "albumImage": 'text',
        "publishedYear": 'int',
        songs: {
          type: 'list',
          typeDef: '<frozen<song>>'
        }
      }
    }
*/