const { Artist } = require('./index.js')

const getArtist = (id, cb) => {
  Artist.find({'artistID': id}, (err, data) => {
    if (err) {
      console.error('ERROR: ', err);
    } else {
      cb(data);
    }
  });
};

const postArtist = (artistObject, cb) => {
  let newArtist = new Artist(artistObject);
  newArtist.save((err) => {
    if (err) {
      console.error('ERROR: ', err);
    } else {
      cb();
    }
  })
};

const updateArtist = (id, updatedParams, cb) => {
  Artist.where({artistID: id}).update(updatedParams, (err) => {
    if (err) {
      console.error('ERROR: ', err);
    } else {
      cb();
    }
  });
};

const deleteArtist = (id, cb) => {
  Artist.deleteOne({artistID: id}, (err) => {
    if (err) {
      console.error('ERROR: ', err);
    } else {
      cb();
    }
  });
}
module.exports.dbHelpers = {
  getArtist,
  postArtist,
  updateArtist,
  deleteArtist
};