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
      playing: false
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.albumPlaying !== 0) {
      this.setState({
        album: newProps.albumPlaying - 1,
        song: newProps.songPlaying - 1,
        playing: true
      })
    } else {
      this.setState({
        playing: false
      })
    }
  }

  handlePlayClick() {
    console.log("Hey Out")
    if (!this.state.playing) {
      console.log("Hey In 1")
      var alb = this.state.album+1;
      var sng = this.state.song+1;
      this.props.updateAlbumSongPlaying(alb, sng);
      this.setState({
        playing: true
      })
    } else {
      console.log("Hey In 2")
      this.props.updateAlbumSongPlaying(0, 0);
      this.setState({
        playing: false
      })
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
              <div id="player-middle-button"><FontAwesomeIcon icon={faStepBackward} size="sm"/></div>

              { (this.state.playing && this.props.albumPlaying !== 0) ?
                <div id="player-middle-button-play" onClick={this.handlePlayClick.bind(this)}>
                  <FontAwesomeIcon icon={faPauseCircle} size="lg"/>
                </div>
                :
                <div id="player-middle-button-play" onClick={this.handlePlayClick.bind(this)}>
                  <FontAwesomeIcon icon={faPlayCircle} size="lg"/>
                </div>
              }

              <div id="player-middle-button"><FontAwesomeIcon icon={faStepForward} size="sm"/></div>
              <div id="player-middle-button"><FontAwesomeIcon icon={faRedo} size="sm"/></div>
            </div>
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