const fs = require('fs');
const { dataGenHelpers } = require('./dataGenHelpers.js');
const { makeArtist, makeAlbum, makeSong } = dataGenHelpers;

let startID = 1;
for (let n = 1; n < 1001; n++) {
  let stream = fs.createWriteStream(`dataGen/data/data${n}.json`);
  let allArtists = [];
  for (let i = 1; i < startID + 10000; i++) {
    let artist = makeArtist(i);
    let albumNumber = Math.floor(Math.random() * 4) + 1;
    for (let j = 1; j < albumNumber + 1; j++) {
      let album = makeAlbum(i, j);
      let songNumber = Math.floor(Math.random() * 10) + 12;
      for (let k = 1; k < songNumber + 1; k++) {
        let song = makeSong(i, j, k);
        album.songs.push(song);
      }
      artist.albums.push(album);
    }
    // allArtists.push(artist);
    stream.write(JSON.stringify(artist), 'utf8', () => {
      console.log('done writing files ' + startID + ' through ' + (startID + 10000));
    });
  }
  stream.end();
  startID += 10000;
}

// fs.writeFile('data.json', JSON.stringify(allArtists), 'utf8', (err) => {

// });