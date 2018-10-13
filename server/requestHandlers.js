const { dbHelpers } = require('../database/dbHelpers.js');
const { findArtist, createArtist, updateArtist, deleteArtist } = dbHelpers;


const handleGetArtist = (req, res) => {
  findArtist(parseInt(req.params.artistID, 10), res);
};

const handlePostArtist = (req, res) => {
  createArtist(req.body, res);
};

const handleUpdateArtist = (req, res) => {
  updateArtist(
    parseInt(req.params.artistID, 10),
    { 
      artistName: req.body.artistName,
      albums: req.body.albums
    },
    res
  );
};

const handleDeleteArtist = (req, res) => {
  deleteArtist(parseInt(req.params.artistID, 10), res);
};

module.exports.requestHandlers = {
  handleGetArtist,
  handlePostArtist,
  handleUpdateArtist,
  handleDeleteArtist
};