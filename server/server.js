const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path');
const {getArtist} = require('../database/index.js')

const server = express();

server.use(bodyParser.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static(path.join(__dirname, '../public')));

server.get('/artists/:artistID', (req, res) => {
  getArtist(req.params.artistID, (data) => {
    res.send(data);
  })
});

module.exports = server;
