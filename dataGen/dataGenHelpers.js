const faker = require('faker');

const makeArtist = (id) => {
  return {
    artistID: id,
    artistName: faker.name.findName(),
    albums: []
  };
};

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
    songID: i * 100 + j * 10 + k,
    songName: faker.random.words(),
    streams: Math.floor(Math.random() * 250000000),
    length: Math.floor(Math.random() * 221) + 30,
    popularity: Math.floor(Math.random() * 8) + 1,
    addedToLibrary: faker.random.boolean()
  };
};

module.exports.dataGenHelpers = {
  makeArtist,
  makeAlbum,
  makeSong
};