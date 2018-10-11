const faker = require('faker');

const makeAlbum = (artistIndex, albumIndex) => {
  let randomImageIndex = faker.random.number(999);
  return {
    albumID: artistIndex * 10 + albumIndex,
    albumName: faker.random.words(),
    albumImage: `https://s3-us-west-1.amazonaws.com/album-list/webpImages/${randomImageIndex}.webp`,
    publishedYear: faker.random.number({min: 1950, max: 2018}),
    songs: []
  };
};

const makeSong = (artIdx, albIdx, songIdx) => {
  return {
    songID: artIdx * 100 + albIdx * 10 + songIdx,
    songName: faker.random.words(),
    streams: faker.random.number(250000000),
    length: faker.random.number({min: 30, max: 250}),
    popularity: faker.random.number({min: 1, max: 9}),
    addedToLibrary: faker.random.boolean()
  };
};

const makeArtist = (id) => {
  return {
    artistID: id,
    artistName: faker.name.findName(),
    albums: []
  };
};

const generateData = (id) => {
  let artist = makeArtist(id);
  let albumNumber = Math.floor(Math.random() * 4) + 1;
  for (let j = 1; j <= albumNumber; j++) {
    let album = makeAlbum(id, j);
    let songNumber = Math.floor(Math.random() * 10) + 12;
    for (let k = 1; k <= songNumber; k++) {
      album.songs.push(makeSong(id, j, k));
    }
    artist.albums.push(album);
  }
  return artist;
};
module.exports.generateData = generateData;
module.exports.makeArtist = makeArtist;
module.exports.makeAlbum = makeAlbum;
module.exports.makeSong = makeSong;
