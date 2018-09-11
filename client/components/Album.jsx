import React from 'react';
import Song from './Song.jsx'

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  buildSongs() {
    var songs = [];
    if (this.props.album.albumImage === '') {
      return songs;
    }
    for (var i = 0; i < this.props.album.songs.length; i++) {
      songs.push(
        <Song id={i + 1} song={this.props.album.songs[i]}/>
      )
    }
    return songs;
  }

  render() {
    return (
      <div>
        <div>
          <img src={this.props.album.albumImage} width="130" height="130"/>
        </div>
        <table>
          <tbody>
            <tr>
              <th width="30">#</th>
              <th width="50"></th>
              <th id="song-name-title">TITLE</th>
              <th width="30">time</th>
              <th width="30">like</th>
            </tr>
            {this.buildSongs()}
          </tbody>
        </table>
        <br/>
      </div>
    )
  }
}

export default Album;