require('dotenv').config();
const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));
const { ArtistsModel } = require('../database/models/Artist.js')

const loopSave = async (artists, cb) => {
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
  cb();
}

const seedAsync = (artistObj) => new Promise((resolve, reject) => {
  artistObj.saveAsync()
  .then(resolve);
})

const readAsync = (index) => new Promise((resolve, reject) => {
  fs.readFile(`../data/data${index}.json`, (err, data) => {
    let artists = JSON.parse(data);
    loopSave(artists, resolve);
  });
})

const loopRead = async () => {
  for (let i = 1; i < 1001; i++) {
    await readAsync(i);
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
