const { dbHelpers } = require('../database/dbHelpers.js');
const { getArtist, postArtist, updateArtist, deleteArtist } = dbHelpers;


const handleGet = (req, res) => {
  getArtist(req.params.artistID, data => {
    res.send(data);
  });
};

const handlePost = (req, res) => {
  postArtist(req.body, () => {
    res.status(201).send();
  });
};

const handleUpdate = (req, res) => {
  updateArtist(req.params.artistID, req.body, () => {
    res.status(204).send();
  });
};

const handleDelete = (req, res) => {
  deleteArtist(req.params.artistID, () => {
    res.status(204).send();
  });
};

module.exports.requestHandlers = {
  handleGet,
  handlePost,
  handleUpdate,
  handleDelete
};