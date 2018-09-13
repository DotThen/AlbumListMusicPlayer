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
      library: []
    }
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

  componentWillReceiveProps(newProps) {
    var songsInLibrary = [];
    for (var i = 0; i < newProps.album.songs.length; i++) {
      songsInLibrary.push(newProps.album.songs[i].addedToLibrary);
    }
    this.setState({
      library: songsInLibrary
    })
  }

  handleLiraryClick(id, status) {
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
      if (!this.state.saveClicked && !this.state.unsaveAll) {
        songs.push(
          <Song id={i + 1} 
                song={this.props.album.songs[i]} 
                updateID={this.updateSongPlayingID.bind(this)}
                songPlaying={this.state.songPlayingID}
                originalAlbum={this.state.idElement}
                albumPlaying={this.props.albumPlaying}
                addedToLibrary={this.state.library[i]}
                handleLiraryClick={this.handleLiraryClick.bind(this)}/>
        )
      } else { 
        var inLibraryFlag = false;
        if (this.state.saveClicked && !this.state.unsaveAll) {
          inLibraryFlag = true;
        }
        songs.push(
          <Song id={i + 1} 
                song={this.props.album.songs[i]} 
                updateID={this.updateSongPlayingID.bind(this)}
                songPlaying={this.state.songPlayingID}
                originalAlbum={this.state.idElement}
                albumPlaying={this.props.albumPlaying}
                addedToLibrary={inLibraryFlag}
                handleLiraryClick={this.handleLiraryClick.bind(this)}/>
        )
      }
    }
    return songs;
  }

  // buildSongs() {
  //   var songs = [];
  //   if (this.props.album.albumImage === '') {
  //     return songs;
  //   }
  //   for (var i = 0; i < this.props.album.songs.length; i++) {
  //     songs.push(
  //       <Song id={i + 1} 
  //             song={this.props.album.songs[i]} 
  //             updateID={this.updateSongPlayingID.bind(this)}
  //             songPlaying={this.state.songPlayingID}
  //             originalAlbum={this.state.idElement}
  //             albumPlaying={this.props.albumPlaying}
  //             addedToLibrary={this.state.library[i]}
  //             handleLiraryClick={this.handleLiraryClick.bind(this)}/>
  //     )
  //   }
  //   return songs;
  // }

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
    if (!this.state.saveClicked && !this.state.unsaveAll) {
      this.setState({
        saveClicked: true
      })
    } else {
      this.setState({
        saveClicked: !this.state.saveClicked,
        unsaveAll: !this.state.unsaveAll
      })
    }
  }

  // handleSaveClick() {
  //   if (!this.state.saveClicked) {
  //     var newLibrary = [];
  //     for (var i = 0; i < this.state.library.length; i++) {
  //       newLibrary.push(true);
  //     }
  //     this.setState({
  //       saveClicked: true,
  //       library: newLibrary
  //     })
  //   } else {
  //     var newLibrary = [];
  //     for (var i = 0; i < this.state.library.length; i++) {
  //       newLibrary.push(false);
  //     }
  //     this.setState({
  //       saveClicked: false,
  //       library: newLibrary
  //     })
  //   }
  // }

  render() {
    return (
      <div>
        <div>
          <p style={{float: "left"}}><img src={this.props.album.albumImage} width="140" height="140"  border="1px"/></p>
          <p id="published-year">
            <br/>
            <div>{this.props.album.publishedYear}</div>
            <div id="album-title">{this.props.album.albumName}</div>
            <button type="button" id="spfy-btn" onClick={this.handleSaveClick.bind(this)}>SAVE</button>
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