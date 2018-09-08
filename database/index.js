const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/artists');

const db = mongoose.connection;


const ArtistSchema = new mongoose.Schema({
  artistID: Number,
  artistName: String,
  albums: [{
    albumID: Number,
    albumName: String,
    albumImage: String,
    publishedYear: Number,
    songs: [{
      songID: Number,
      songName: String,
      streams: Number,
      length: Number,
      popularity: Number,
      addedToLibrary: Boolean
    }]
  }]
});

var Artist = mongoose.model('Artist', ArtistSchema);

module.exports.Artist = Artist;
module.exports.db = db;