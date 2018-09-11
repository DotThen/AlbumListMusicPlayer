import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryEmpty, faBatteryQuarter, faBatteryHalf, faBatteryThreeQuarters, faBatteryFull } from '@fortawesome/free-solid-svg-icons';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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

  render() {
    return (
      <tr id="hover-elements">
        <td>{this.props.id}</td>
        <td id="plus">+</td>
        <td id="song-name">{this.props.song.songName}</td>
        {this.props.song.length%60 < 10 ? 
          <td>{Math.floor(this.props.song.length/60)}:0{this.props.song.length%60}</td>
          :
          <td>{Math.floor(this.props.song.length/60)}:{this.props.song.length%60}</td>
        }
        {/* <td>{this.props.song.popularity}</td> */}
        {this.popularity()}
      </tr>
    )
  }
}

export default Song;