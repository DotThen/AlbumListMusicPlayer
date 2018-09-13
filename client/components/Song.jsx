import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryEmpty, faBatteryQuarter, faBatteryHalf, faBatteryThreeQuarters, 
         faBatteryFull, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idElement: this.props.id,
      playing: false
    }
  }

  componentWillReceiveProps() {
    if ( (this.props.originalAlbum !== this.props.albumPlaying || this.props.currentAlbumPlaying === false) && this.props.albumPlaying !== 0) {
    // if (this.props.currentAlbumPlaying === false && this.props.originalAlbum !== this.props.albumPlaying && this.props.albumPlaying !== 0) {
      this.setState ({
        idElement: this.props.id,
        playing: false
      });
    } else if (this.props.songPlaying !== this.props.id && this.props.songPlaying !== 0) {
      this.setState ({
        idElement: this.props.id,
        playing: false
      });
    } else if (this.props.songPlaying === this.props.id) {
      this.setState ({
        idElement: <FontAwesomeIcon icon={faPauseCircle} size="lg"/>,
        playing: true
      });
    } else if (this.state.playing === true) {
      this.setState ({
        idElement: <FontAwesomeIcon icon={faPlayCircle} size="lg"/>,
        playing: false
      });
    } else {
      this.setState ({
        idElement: this.props.id,
        playing: false
      });
    }
  }

  popularity() {
    if (this.props.song.popularity < 2) {
      return <td><FontAwesomeIcon icon={faBatteryEmpty} size="lg"/></td>
    } else if (this.props.song.popularity < 4) {
      return <td><FontAwesomeIcon icon={faBatteryQuarter} size="lg"/></td>
    } else if (this.props.song.popularity === 4) {
      return <td><FontAwesomeIcon icon={faBatteryHalf} size="lg"/></td>
    } else if (this.props.song.popularity < 7) {
      return <td><FontAwesomeIcon icon={faBatteryThreeQuarters} size="lg"/></td>
    } else {
      return <td><FontAwesomeIcon icon={faBatteryFull} size="lg"/></td>
    }
  }

  handleMouseOver() {
    if (!this.state.playing) {
      this.setState({
        idElement: <FontAwesomeIcon icon={faPlayCircle} size="lg"/>
      })
    }
  }

  handleMouseOut() {
    if (!this.state.playing) {
      this.setState({
        idElement: this.props.id
      })
    }
  }

  handleClick() {
    if (!this.state.playing) {
      this.setState({
        idElement: <FontAwesomeIcon icon={faPauseCircle} size="lg"/>,
        playing: true
      }, () => {
        this.props.updateID(this.props.id)
      })
    } else {
      this.setState({
        idElement: <FontAwesomeIcon icon={faPlayCircle} size="lg"/>,
        playing: false
      }, () => {
        this.props.updateID(0)
      })
    }
  }

  coloredTitle() {  // This is not working, color needs to re-render but it is not....
    var results = [];
    if (this.state.idElement === <FontAwesomeIcon icon={faPauseCircle} size="lg"/>) {
      results.push(<td id="song-name" style={{color: 'green'}}>{this.props.song.songName}</td>);
      if (this.props.song.length%60 < 10) {
        results.push(<td style={{color: 'green'}}>{Math.floor(this.props.song.length/60)}:0{this.props.song.length%60}</td>);
      } else {
        results.push(<td style={{color: 'green'}}>{Math.floor(this.props.song.length/60)}:{this.props.song.length%60}</td>);
      }
      return results;
    } else {
      results.push(<td id="song-name">{this.props.song.songName}</td>);
      if (this.props.song.length%60 < 10) {
        results.push(<td>{Math.floor(this.props.song.length/60)}:0{this.props.song.length%60}</td>);
      } else {
        results.push(<td>{Math.floor(this.props.song.length/60)}:{this.props.song.length%60}</td>);
      }
      return results;
    }
  }

  render() {
    return (
      <tr id="hover-elements" onMouseOver={this.handleMouseOver.bind(this)} 
                              onMouseOut={this.handleMouseOut.bind(this)}
                              onClick={this.handleClick.bind(this)}>
        <td>{this.state.idElement}</td>
        <td id="plus">+</td>
        {this.coloredTitle()}
        {this.popularity()}
      </tr>
    )
  }
}

export default Song;