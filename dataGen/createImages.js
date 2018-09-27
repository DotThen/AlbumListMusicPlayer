const axios = require('axios');
const fs = require ('fs');

const writeImageFile = (imageIndex) => {
  const keywords = ['music', 'singer', 'album', 'guitar', 'piano', 'instrument'];
  let randomIndex = Math.floor(Math.random() * keywords.length);
  let url = `https://loremflickr.com/400/400/${keywords[randomIndex]}?random=${imageIndex}`;
  let path = `dataGen/images/${imageIndex}.jpg`;
  axios.get(url, {responseType: 'stream'})
    .then((response) => {
      response.data.pipe(fs.createWriteStream(path));
    })
    .catch(err => console.error(err));
};

const countImageFiles = () => {
  setTimeout(() => {
    fs.readdir('dataGen/images', (err, files) => {
      if (err) {
        console.error(err);
      } else {
        console.log(files.length);
      }
    });
  }, 300000);
};

const writeAllImageFiles = () => {
  for (let i = 0; i < 1000; i++) {
    setTimeout(writeImageFile.bind(null, i), i * 300);
  }
};

writeAllImageFiles();
countImageFiles();
