import React from 'react';
import Song from './Song.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

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
          <p style={{float: "left"}}><img src={this.props.album.albumImage} width="140" height="140"  border="1px"/></p>
          <p id="published-year">
            <br/>
            <div>{this.props.album.publishedYear}</div>
            <br/>
            <div id="album-title">{this.props.album.albumName}</div>
          </p>
        </div>
        <br/>
        <table>
          <tbody>
            <tr>
              <th width="30">#</th>
              <th width="50"></th>
              <th id="song-name-title">TITLE</th>
              <th width="30"><FontAwesomeIcon icon={faClock} size="lg"/></th>
              <th width="50"><FontAwesomeIcon icon={faThumbsUp} size="lg"/></th>
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