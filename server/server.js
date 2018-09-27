const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { requestHandlers } = require('./requestHandlers.js');
const cors = require('cors');
const server = express();
const { handleGetArtist, handlePostArtist, handleUpdateArtist, handleDeleteArtist } = requestHandlers;

server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));

server.get('/artists/albums/:artistID', handleGetArtist);

server.post('/artists/albums', handlePostArtist);

server.put('/artists/albums/:artistID', handleUpdateArtist);

server.delete('/artists/albums/:artistID', handleDeleteArtist);

module.exports = server;
