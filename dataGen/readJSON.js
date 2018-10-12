require('dotenv').config();
const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);
const fs = require('fs');
const { ArtistsModel } = require('../database/models/Artist.js')

const saveArtist = async (artist, cb) => {
  await seedAsync(artist);
  cb();
}

const seedAsync = (artistObj) => new Promise((resolve, reject) => {
  artistObj.saveAsync()
  .then(resolve);
})

const readAsync = (index) => new Promise((resolve, reject) => {
  // FIX
  let readStream = fs.createReadStream(`dataGen/data/data${index}.json`);
  eachLine(readStream, (line) => {
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
  for (let i = 2; i < 5; i++) {
    // FIX 
    await readAsync(i);
    // FIX
    // break;
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