require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { requestHandlers } = require('./requestHandlers.js');
const { handleGetArtist, handlePostArtist, handleUpdateArtist, handleDeleteArtist } = requestHandlers;
const toobusy = require('toobusy-js');

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

server.listen(3001, () => console.log('Listening on port 1337!'));