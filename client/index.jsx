import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Album from './components/Album.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: {},
      artistName: '',
      albums: [{albumImage: ""}]
    }
  }

  componentDidMount() {
    this.getAllArtists();
  }

  getAllArtists() {
    $.ajax({
      method: "GET",
      url: "/albums",
      success: (data) => {
        this.setState({
          artist: data[0],
          artistName: data[0].artistName,
          albums: data[0].albums
        })
      }
    })
  }

  buildAlbums() {
    var albums = [];
    for (var i = 0; i < this.state.albums.length; i++) {
      albums.push(
        <div>
          <Album album={this.state.albums[i]}/>
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

ReactDOM.render(<App />, document.getElementById('app'));