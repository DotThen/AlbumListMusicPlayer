require('newrelic');
const cluster = require('cluster');
const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { requestHandlers } = require('./requestHandlers.js');
const { handleGetArtist, handlePostArtist, handleUpdateArtist, handleDeleteArtist } = requestHandlers;
const toobusy = require('toobusy-js');

// if (cluster.isMaster) {
//   const cpuCount = os.cpus().length;
//   for (let i = 0; i < cpuCount; i++) {
//     cluster.fork();
//   }
// } else { 
//   const server = express();
//   server.use(bodyParser.json());
//   server.use(cors());
//   server.use(express.urlencoded({ extended: true }));
//   server.use(express.static(path.join(__dirname, '../public')));

//   server.get('/artists/albums/:artistID', handleGetArtist);

//   server.post('/artists/albums', handlePostArtist);

//   server.put('/artists/albums/:artistID', handleUpdateArtist);

//   server.delete('/artists/albums/:artistID', handleDeleteArtist);
//   server.listen(3001, () => console.log('Listening on port 3001!'));
// }

// cluster.on('exit', (worker) => {
//   console.log('Hey my guy worker ' + worker.id + ' just clocked out');
//   cluster.fork();
// });

const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use((req, res, next) => {
  if (toobusy()) {
    res.status(503).send('I\'m busy right now sorry.');
  } else {
    next();
  }
});

server.use(express.static(path.join(__dirname, '../public')));

server.get('/artists/albums/:artistID', handleGetArtist);

server.post('/artists/albums', handlePostArtist);

server.put('/artists/albums/:artistID', handleUpdateArtist);

server.delete('/artists/albums/:artistID', handleDeleteArtist);
server.listen(3001, () => console.log('Listening on port 3001!'));