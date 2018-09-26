const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { requestHandlers } = require('./requestHandlers.js');
const cors = require('cors');
const server = express();
const { handleGet, handlePost, handleUpdate, handleDelete } = requestHandlers;

server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));

server.get('/artists/albums/:artistID', handleGet(req, res));

server.post('/artists/albums/:artistID', handlePost(req, res));

server.put('/artists/albums/:artistID', handleUpdate(req, res));

server.delete('/artists/albums/:artistID', handleDelete(req, res));

module.exports = server;
