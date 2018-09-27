const { dbHelpers } = require('../database/dbHelpers.js');
const { findArtist, createArtist, updateArtist, deleteArtist } = dbHelpers;


const handleGetArtist = (req, res) => {
  findArtist(req.params.artistID, data => {
    res.send(data);
  });
};

const handlePostArtist = (req, res) => {
  createArtist(req.body, () => {
    res.status(201).send();
  });
};

const handleUpdateArtist = (req, res) => {
  updateArtist(req.params.artistID, req.body, () => {
    res.status(204).send();
  });
};

const handleDeleteArtist = (req, res) => {
  deleteArtist(req.params.artistID, () => {
    res.status(204).send();
  });
};

module.exports.requestHandlers = {
  handleGetArtist,
  handlePostArtist,
  handleUpdateArtist,
  handleDeleteArtist
};