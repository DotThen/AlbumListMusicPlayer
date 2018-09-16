import React from 'react';
import { Row, Col } from 'react-flexbox-grid';


class Player extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      album: 0,
      song: 0
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.albumPlaying !== 0) {
      this.setState({
        album: newProps.albumPlaying - 1,
        song: newProps.songPlaying - 1
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
          <Col xs={6} ><div className="box">Second</div></Col>
          <Col xs={3} ><div className="box">Third</div></Col>
        </Row>
      </div>
    )
  }
}

export default Player;