import React from 'react';
import Song from './Song.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songPlayingID: 0,
      idElement: this.props.id,
      saveClicked: false,
      unsaveAll: false,
      library: [],
      dropdownOpen: false,
      saveButton: "SAVE"
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentDidMount() {
    var songsInLibrary = [];
    for (var i = 0; i < this.props.album.songs.length; i++) {
      songsInLibrary.push(this.props.album.songs[i].addedToLibrary);
    }
    this.setState({
      library: songsInLibrary
    })
  }

  componentDidUpdate() {
    if (this.state.library.length === 0 && this.props.album.songs.length !== 0) {
      var songsInLibrary = [];
      for (var i = 0; i < this.props.album.songs.length; i++) {
        songsInLibrary.push(this.props.album.songs[i].addedToLibrary);
      }
      this.setState({
        library: songsInLibrary
      })
    }
  }

  handleLibraryClick(id, status) {
    var newLibrary = this.state.library;
    newLibrary[id-1] = status;
    this.setState({
      library: newLibrary
    })
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
              songPlaying={this.state.songPlayingID}
              originalAlbum={this.state.idElement}
              albumPlaying={this.props.albumPlaying}
              addedToLibrary={this.state.library[i]}
              handleLibraryClick={this.handleLibraryClick.bind(this)}/>
      )
    }
    return songs;
  }

  updateSongPlayingID(id) {
    if (id === 0) {
      this.setState({
        songPlayingID: id,
        playing: false
      }, () => {this.props.update(0, 0)})
    } else {
      this.setState({
        songPlayingID: id,
        playing: true
      }, () => {this.props.update(this.props.id, id)})
    }
  }

  handleSaveClick() {
    var newLib = [];
    if (!this.state.saveClicked && !this.state.unsaveAll) {
      for (var i = 0; i < this.state.library.length; i++) {
        newLib.push(true);
      }
      this.setState({
        saveClicked: true,
        saveButton: "SAVED",
        library: newLib
      })
    } else if (!this.state.saveClicked && this.state.unsaveAll){
      for (var i = 0; i < this.state.library.length; i++) {
        newLib.push(true);
      }
      this.setState({
        saveClicked: true,
        unsaveAll: false,
        saveButton: "SAVED",
        library: newLib
      })
    } else {
      for (var i = 0; i < this.state.library.length; i++) {
        newLib.push(false);
      }
      this.setState({
        saveClicked: false,
        unsaveAll: true,
        saveButton: "SAVE",
        library: newLib
      })
    }
  }

  render() {
    return (
      <div>
        <div className="album-header">
          <p style={{float: "left"}}><img src={this.props.album.albumImage} width="140" height="140"  border="1px"/></p>
          <p id="published-year">
            <br/>
            <div>{this.props.album.publishedYear}</div>
            <div id="album-title">{this.props.album.albumName}</div>
            {this.state.saveButton === "SAVED" ?
              <button type="button" id="spfy-btn" onClick={this.handleSaveClick.bind(this)} style={{color: 'rgb(29,185,84)'}}>SAVED</button>
              :
              <button type="button" id="spfy-btn" onClick={this.handleSaveClick.bind(this)}>SAVE</button>
            }
            <button type="button" id="spfy-btn-round">...</button>
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