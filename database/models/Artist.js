const { models } = require('../index.js');

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

module.exports.ArtistsModel = ArtistsModel;

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