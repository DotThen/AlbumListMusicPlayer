const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path');
const {getArtist} = require('../database/index.js')

const server = express();

server.use(bodyParser.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static(path.join(__dirname, '../public')));

server.get('/albums', (req, res) => {
  var artistId = Math.floor(Math.random() * 100) + 1;
  getArtist(artistId, (data) => {
    res.send(data);
  })
});

module.exports = server;
