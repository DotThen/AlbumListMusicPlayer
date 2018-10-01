const faker = require('faker');
const fs = require('fs');

const makeAlbumCSV = (albumID) => {
  let randomImageIndex = faker.random.number(999);
  let artistID = faker.random.number({min: 1, max: 10000000});
  let albumName = faker.random.words();
  let albumImage = `https://s3-us-west-1.amazonaws.com/album-list/webpImages/${randomImageIndex}.webp`;
  let publishedYear = faker.random.number({min: 1950, max: 2018});
  return `${albumID}|${artistID}|${albumName}|${albumImage}|${publishedYear}\n`;
};

const makeSongCSV = (songID) => {
  let artistID = faker.random.number({min: 1, max: 10000000});
  let albumID = faker.random.number({min: 1, max: 30000000});
  let songName = faker.random.words();
  let streams = faker.random.number(250000000);
  let length = faker.random.number({min: 30, max: 250});
  let popularity = faker.random.number({min: 1, max: 9});
  let addedToLibrary = faker.random.boolean();
  return `${songID}|${albumID}|${artistID}|${songName}|${streams}|${length}|${popularity}|${addedToLibrary}\n`;
};

const makeArtistCSV = (id) => {
  let artistID = id;
  let artistName = faker.name.findName();
  return `${artistID}|${artistName}\n`;
};

const writeArtistCSV = (index, artistID) => new Promise((resolve, reject) => {
  let artistStream = fs.createWriteStream(`dataGen/CSVdata/artists/artists${index}.csv`);
  for (let i = artistID; i < artistID + 10000; i++) {
    artistStream.write(makeArtistCSV(i), 'utf8');
  }
  artistStream.end(() => {
    console.log(`Wrote artists ${artistID} to ${artistID + 10000}`);
  });
  artistStream.on('finish', resolve);
});

const writeAlbumCSV = (index, albumID) => new Promise((resolve, reject) => {
  let albumStream = fs.createWriteStream(`dataGen/CSVdata/albums/albums${index}.csv`);
  for (let i = albumID; i < albumID + 10000; i++) {
    albumStream.write(makeAlbumCSV(i), 'utf8');
  }
  albumStream.end(() => {
    console.log(`Wrote albums ${albumID} to ${albumID + 10000}`);
  });
  albumStream.on('finish', resolve);
});

const writeSongCSV = (index, songID) => new Promise((resolve, reject) => {
  let songStream = fs.createWriteStream(`dataGen/CSVdata/songs/songs${index}.csv`);
  for (let i = songID; i < songID + 10000; i++) {
    songStream.write(makeSongCSV(i), 'utf8');
  }
  songStream.end(() => {
    console.log(`Wrote songs ${songID} to ${songID + 10000}`);
  });
  songStream.on('finish', resolve);
});

const generateDataCSV = async () => {
  let artistID = 1;
  for (let i = 1; i <= 1000; i++) {
    await writeArtistCSV(i, artistID);
    artistID += 10000;
  }
  
  let albumID = 1;
  for (let j = 1; j <= 3000; j++) {
    await writeAlbumCSV(j, albumID);
    albumID += 10000;
  }
  
  let songID = 1;
  for (let k = 1; k <= 13000; k++) {
    await writeSongCSV(k, songID);
    songID += 10000;
  }
};

generateDataCSV();

module.exports.generateDataCSV = generateDataCSV;
module.exports.makeArtistCSV = makeArtistCSV;
module.exports.makeAlbumCSV = makeAlbumCSV;
module.exports.makeSongCSV = makeSongCSV;
