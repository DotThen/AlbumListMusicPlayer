const fs = require('fs');
const { generateData } = require('./dataGenHelpers.js');

const writeChunk = (fileNumber, startID) => new Promise((resolve, reject) => {
  let stream = fs.createWriteStream(`dataGen/data/data${fileNumber}.json`);
  for (let i = startID; i < startID + 2000; i++) {
    stream.write(JSON.stringify(generateData(i)) + '\n', 'utf8');
  }
  stream.end(() => {
    console.log(`Wrote files ${startID} to ${startID + 2000}`);
  });
  stream.on('finish', resolve);
});

const loop = async () => {
  let startID = 1;
  for (let n = 1; n < 5001; n++) {
    await writeChunk(n, startID);
    startID += 2000;
  }
};

loop();
