import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandArrowsAlt, faVolumeUp, faDesktop, faSlidersH, faPauseCircle,
         faRandom, faStepBackward, faPlayCircle, faStepForward, faRedo } from '@fortawesome/free-solid-svg-icons';


class Player extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      album: 0,
      song: 0,
      playing: false,
      playValue: 0
    }
  }

  componentWillReceiveProps(newProps) {
    this.clearAllIntervals();
    if (newProps.albumPlaying !== 0) {
      this.setState({
        album: newProps.albumPlaying - 1,
        song: newProps.songPlaying - 1,
        playing: true,
        playValue: 0
      }, () => {
        this.timer = setInterval(() => {
          this.setState({
            playValue: this.state.playValue + 1
          })
        }, 1000)
      })
    } else {
      this.setState({
        playing: false
      }, () => this.clearAllIntervals())
    }
  }

  handlePlayClick() {
    if (!this.state.playing) {
      this.props.updateAlbumSongPlaying(this.state.album+1, this.state.song+1);
      this.setState({
        playing: true,
        playValue: 0
      }, () => {
        this.timer = setInterval(() => {
          this.setState({
            playValue: this.state.playValue + 1
          })
        }, 1000)
      })
    } else {
      this.props.updateAlbumSongPlaying(0, 0);
      this.setState({
        playing: false
      }, () => this.clearAllIntervals())
    }
  }

  handleNextClick() {
    this.props.updateAlbumSongPlaying(this.state.album+1, this.state.song+2);
  }

  handlePreviousClick() {
    this.props.updateAlbumSongPlaying(this.state.album+1, this.state.song);
  }

  clearAllIntervals() {
    for (var i = 0; i < 1000; i++) {
      window.clearInterval(i);
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={3} >
            <div className="player-left">
              <p style={{float: "left", margin: "15"}}>
                <div>
                  <img src={this.props.albums[this.state.album].albumImage} width="20px" height="20px"  border="1px" className="player-image"/>
                </div>
              </p>
              <p style={{margin: "0"}}>
                <br/>
                <div><span id="player-song-name">{this.props.albums[this.state.album].songs[this.state.song].songName}</span></div>
                <div><span id="player-artist-name">{this.props.artist}</span></div>
              </p>
            </div>
          </Col>
          <Col xs={6} >
            <div className="player-middle">
              <div id="player-middle-button"><FontAwesomeIcon icon={faRandom} size="sm"/></div>
              <div id="player-middle-button" onClick={this.handlePreviousClick.bind(this)}><FontAwesomeIcon icon={faStepBackward} size="sm"/></div>

              { (this.state.playing && this.props.albumPlaying !== 0) ?
                <div id="player-middle-button-play" onClick={this.handlePlayClick.bind(this)}>
                  <FontAwesomeIcon icon={faPauseCircle} size="lg"/>
                </div>
                :
                <div id="player-middle-button-play" onClick={this.handlePlayClick.bind(this)}>
                  <FontAwesomeIcon icon={faPlayCircle} size="lg"/>
                </div>
              }

              <div id="player-middle-button" onClick={this.handleNextClick.bind(this)}><FontAwesomeIcon icon={faStepForward} size="sm"/></div>
              <div id="player-middle-button"><FontAwesomeIcon icon={faRedo} size="sm"/></div>
            </div>
            <div id="player-middle-button"><input className="song-slider" type="range" min="1" max="100" value={this.state.playValue}/></div>
          </Col>
          <Col xs={3} >
            <div className="player-right">
              <div id="player-right-button"><FontAwesomeIcon icon={faExpandArrowsAlt} size="sm"/></div>
              <div id="player-right-button"><input className="volume-slider" type="range" min="1" max="100" /></div>
              <div id="player-right-button"><FontAwesomeIcon icon={faVolumeUp} size="sm"/></div>
              <div id="player-right-button"><FontAwesomeIcon icon={faDesktop} size="sm"/></div>
              <div id="player-right-button"><FontAwesomeIcon icon={faSlidersH} size="sm"/></div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Player;