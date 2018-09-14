import React from 'react';
import $ from 'jquery';
import Album from './Album.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: {},
      artistID: 0,
      artistName: '',
      albums: [{albumImage: "", songs: []}],
      albumPlayingID: 0,
      songPlayingID: 0
    }
    var artistId = Math.floor(Math.random() * 100) + 1;
    this.getAllArtists(artistId);
  }

  componentDidMount() {
    var artistId = Math.floor(Math.random() * 100) + 1;
    this.getAllArtists(artistId);
  }

  getAllArtists(artistId) {
    $.ajax({
      method: "GET",
      url: "/artists/" + artistId,
      success: (data) => {
        this.setState({
          artist: data[0],
          artistID: artistId,
          artistName: data[0].artistName,
          albums: data[0].albums
        })
      }
    })
  }

  updateAlbumSongPlaying(albumID, songID) {
    this.setState({
      albumPlayingID: albumID,
      songPlayingID: songID
    });
  }

  buildAlbums() {
    var albums = [];
    for (var i = 0; i < this.state.albums.length; i++) {
      albums.push(
        <div>
          <Album album={this.state.albums[i]} id={i+1} update={this.updateAlbumSongPlaying.bind(this)} albumPlaying={this.state.albumPlayingID}/>
        </div>
      )
    }
    return albums;
  }

  render() {
    return(
      <div>
        <h3>Albums</h3>
        <hr/>
        <div>
          {this.buildAlbums()}
        </div>
      </div>
    )
  }
}

export default App;