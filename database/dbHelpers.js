const { ArtistsModel } = require('./models/Artist.js');

const findArtist = (id, cb) => {
  ArtistsModel.findOneAsync({artistID: id})
    .then((data) => {
      cb.send(data);
    })
    .catch((err) => {
      console.error('FIND ERROR: ', err);
      cb.status(503).send(err);
    });
};

const createArtist = (artistObject, cb) => {
  let newArtist = new ArtistsModel({
    artistID: artistObject.artistID,
    artistName: artistObject.artistName,
    albums: artistObject.albums
  });
  newArtist.saveAsync()
    .then(() => cb.status(201).send())
    .catch((err) => {
      console.error('SAVE ERROR: ', err);
      cb.status(503).send(err);
    });
};

// updates not working right not, not too important because this is not a critical operation for my use case
const updateArtist = (id, updatedArtist, cb) => {
  let queryObject = {artistID: id};
  let options = {if_exists: true};
  ArtistsModel.updateAsync(queryObject, updatedArtist, options)
    .then(() => cb.status(204).send())
    .catch((err) => {
      console.error('UPDATE ERROR: ', err);
      cb.status(503).send(err);
    });
};

const deleteArtist = (id, cb) => {
  ArtistsModel.deleteAsync({artistID: id})
    .then(() => cb.status(204).send())
    .catch((err) => {
      console.error('DELETE ERROR: ', err);
      cb.status(503).send(err);
    });
};

module.exports.dbHelpers = {
  findArtist,
  createArtist,
  updateArtist,
  deleteArtist
};