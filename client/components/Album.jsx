import React from 'react';
import Song from './Song.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songPlayingID: 0
    }
  }

  buildSongs() {
    var songs = [];
    if (this.props.album.albumImage === '') {
      return songs;
    }
    for (var i = 0; i < this.props.album.songs.length; i++) {
      songs.push(
        <Song id={i + 1} 
              song={this.props.album.songs[i]} 
              updateID={this.updateSongPlayingID.bind(this)}
              songPlaying={this.state.songPlayingID}/>
      )
    }
    return songs;
  }

  updateSongPlayingID(id) {
    this.setState({
      songPlayingID: id
    })
  }

  render() {
    return (
      <div>
        <div>
          <p style={{float: "left"}}><img src={this.props.album.albumImage} width="140" height="140"  border="1px"/></p>
          <p id="published-year">
            <br/>
            <div>{this.props.album.publishedYear}</div>
            <div id="album-title">{this.props.album.albumName}</div>
            <button type="button" id="spfy-btn">SAVE</button><button type="button" id="spfy-btn-round">...</button>
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