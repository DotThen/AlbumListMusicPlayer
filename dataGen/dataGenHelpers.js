const faker = require('faker');

const makeAlbum = (artistIndex, albumIndex) => {
  let randomImageIndex = Math.floor(Math.random() * 1000);
  return {
    albumID: artistIndex * 10 + albumIndex,
    albumName: faker.random.words(),
    albumImage: `https://s3-us-west-1.amazonaws.com/album-list/webpImages/${randomImageIndex}.webp`,
    publishedYear: Math.floor(Math.random() * 69) + 1950,
    songs: []
  };
};

const makeSong = (artIdx, albIdx, songIdx) => {
  return {
    songID: artIdx * 100 + albIdx * 10 + songIdx,
    songName: faker.random.words(),
    streams: Math.floor(Math.random() * 250000000),
    length: Math.floor(Math.random() * 221) + 30,
    popularity: Math.floor(Math.random() * 8) + 1,
    addedToLibrary: faker.random.boolean()
  };
};

const makeArtist = (id) => {
  let artist = {
    artistID: id,
    artistName: faker.name.findName(),
    albums: []
  };
  let albumNumber = Math.floor(Math.random() * 4) + 1;
  for (let j = 1; j < albumNumber + 1; j++) {
    let album = makeAlbum(id, j);
    let songNumber = Math.floor(Math.random() * 10) + 12;
    for (let k = 1; k < songNumber + 1; k++) {
      let song = makeSong(id, j, k);
      album.songs.push(song);
    }
    artist.albums.push(album);
  }
  return artist;
};

module.exports.makeArtist = makeArtist;