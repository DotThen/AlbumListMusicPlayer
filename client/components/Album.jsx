import React from 'react';
import Song from './Song.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faThumbsUp, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';

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
      for (var i = 0; i < this.props.album.songs.length; i++) {
        newLib.push(true);
      }
      this.setState({
        saveClicked: true,
        saveButton: "SAVED",
        library: newLib
      })
    } else if (!this.state.saveClicked && this.state.unsaveAll){
      for (var i = 0; i < this.props.album.songs.length; i++) {
        newLib.push(true);
      }
      this.setState({
        saveClicked: true,
        unsaveAll: false,
        saveButton: "SAVED",
        library: newLib
      })
    } else {
      for (var i = 0; i < this.props.album.songs.length; i++) {
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

  playbuttonAlbumCover() {
    if (this.state.playing) {
      return <div className="middle-album-image-text" onClick={this.handleAlbumImagePlayClick.bind(this)}><FontAwesomeIcon icon={faPauseCircle} size="5x"/></div>
    } else {
      return <div className="middle-album-image-text" onClick={this.handleAlbumImagePlayClick.bind(this)}><FontAwesomeIcon icon={faPlayCircle} size="5x"/></div>
    }
  }

  handleAlbumImagePlayClick() {
    if (this.state.playing) {
      this.setState({
        songPlayingID: 0,
        playing: false
      }, () => this.props.update(0, 0))
    } else {
      this.setState({
        songPlayingID: 1,
        playing: true
      }, () => this.props.update(this.props.id, 1))
    }
  }

  render() {
    return (
      <div>
        <div className="album-header">
          <p style={{float: "left"}}>
            <div className="container-album-image-play">
              <img src={this.props.album.albumImage} width="140" height="140"  border="1px" className="album-image"/>
              <div className="middle-album-image">
                {this.playbuttonAlbumCover()}
              </div>
            </div>
          </p>
          <p id="published-year">
            <br/>
            <div>{this.props.album.publishedYear}</div>
            <div id="album-title">{this.props.album.albumName}</div>
            {this.state.saveButton === "SAVED" ?
              <button type="button" id="spfy-btn" onClick={this.handleSaveClick.bind(this)} style={{color: 'rgb(29,185,84)'}}>SAVED</button>
              :
              <button type="button" id="spfy-btn" onClick={this.handleSaveClick.bind(this)}>SAVE</button>
            }
            <Dropdown trigger={['click']} overlay={
              <Menu>
                <MenuItem key="1">Add to Queue</MenuItem>
                <MenuItem key="2">Go to Album Radio</MenuItem>
                <MenuItem disabled>Go to Artist</MenuItem>
                <Divider />
                <MenuItem key="3" onClick={this.handleSaveClick.bind(this)}>Save to Your Library</MenuItem>
                <MenuItem key="4">Add to Playlist</MenuItem>
                <Divider />
                <MenuItem key="5">Share</MenuItem>
              </Menu>
            } animation="slide-up">
              <button className="dropdown" type="button" id="spfy-btn-round">...</button>
            </Dropdown>
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