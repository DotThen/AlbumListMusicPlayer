require('dotenv').config();
const lineReader = require('line-reader');
const fs = require('fs');
const { ArtistsModel } = require('../database/models/Artist.js')

const saveArtist = async (artist, cb) => {
  await seedAsync(artist);
  cb();
}

const seedAsync = (artistObj) => new Promise((resolve, reject) => {
  artistObj.saveAsync({if_not_exist: true})
  .then(resolve);
})

const readAsync = (index) => new Promise((resolve, reject) => {
  let readStream = fs.createReadStream(`../data/data${index}.json`);
  lineReader.eachLine(readStream, (line) => {
    let rawArtist = JSON.parse(line);
    let artist = new ArtistsModel({
      artistID: rawArtist.artistID,
      artistName: rawArtist.artistName,
      albums: rawArtist.albums
    });
    if (rawArtist.artistID % 10000 === 0) {
      console.log('saving artist ' + rawArtist.artistID);
    }
    saveArtist(artist, resolve);
  }).then((err) => {
    if (err) throw err;
    console.log('DONE');
  })
})

const loopRead = async () => {
  for (let i = 1; i < 1001; i++) {
    await readAsync(1);
    break;
  }
}

ArtistsModel.syncDB((err, results) => {
  if (err) {
    console.error('BIG OLE ERROR: ', err);
  } else {
    console.log(results);
    loopRead();
  }
});