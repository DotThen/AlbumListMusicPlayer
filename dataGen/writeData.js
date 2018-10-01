const fs = require('fs');
const { makeArtist } = require('./dataGenHelpers.js');

const writeChunk = (fileNumber, startID) => new Promise((resolve, reject) => {
  let stream = fs.createWriteStream(`dataGen/data/data${fileNumber}.json`);
  for (let i = startID; i < startID + 10000; i++) {
    stream.write(JSON.stringify(makeArtist(i)) + '\n', 'utf8');
  }
  stream.end(() => {
    console.log(`Wrote files ${startID} to ${startID + 10000}`);
  });
  stream.on('finish', resolve);
});

const loop = async () => {
  let startID = 1;
  for (let n = 1; n < 1001; n++) {
    await writeChunk(n, startID);
    startID += 10000;
  }
};

loop();
