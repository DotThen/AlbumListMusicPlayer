const fs = require('fs');
const { makeArtist } = require('./dataGenHelpers.js');

const writeChunk = (stream, artistsChunk, index) => new Promise((resolve, reject) => {
  stream.write(JSON.stringify(artistsChunk), 'utf8', () => {
    console.log('done writing files ' + index + ' through ' + (index + 10000));
    stream.end(resolve);
  });
});

const loop = async () => {
  let startID = 1;
  for (let n = 1; n < 1001; n++) {
    let stream = fs.createWriteStream(`dataGen/data/data${n}.json`);
    let artists = [];
    for (let i = startID; i < startID + 10000; i++) {
      let artist = makeArtist(i);
      artists.push(artist);
    }
    await writeChunk(stream, artists, startID);
    startID += 10000;
  }
};

loop();
