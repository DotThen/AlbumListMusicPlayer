const faker = require('faker');
const Json2csvParser = require('json2csv').Parser;
const fields = ['artistID', 'artistName',
                'albums.albumID', 'albums.albumName', 'albums.albumImage', 'albums.publishedYear',
                'albums.songs.songID', 'albums.songs.songName', 'albums.songs.streams', 'albums.songs.length', 'albums.songs.popularity', 'albums.songs.addedToLibrary'];

var allArtists = [];

for (let i = 1; i < 101; i++) {
  let artist = {
    artistID: i,
    artistName: faker.name.findName(),
    albums: []
  }
  var albumNumber = Math.floor(Math.random() * 4) + 1;
  for (let j = 1; j < albumNumber + 1; j++) {
    let album = {
      albumID: i * 10 + j,
      albumName: faker.random.words(),
      albumImage: faker.random.image(),
      publishedYear: Math.floor(Math.random() * 69) + 1950,
      songs: []
    }
    var songNumber = Math.floor(Math.random() * 10) + 12;
    for (let k = 1; k < songNumber + 1; k++) {
      let song = {
        songID: i * 100 + j * 10 + k,
        songName: faker.random.words(),
        streams: Math.floor(Math.random() * 250000000),
        length: Math.floor(Math.random() * 221) + 30,
        popularity: Math.floor(Math.random() * 8) + 1,
        addedToLibrary: faker.random.boolean()
      }
      album.songs.push(song);
    }
    artist.albums.push(album);
  }
  allArtists.push(artist);
}

const json2csvParser = new Json2csvParser({ fields, unwind: ['albums', 'albums.songs'] });
const csv = json2csvParser.parse(allArtists);

