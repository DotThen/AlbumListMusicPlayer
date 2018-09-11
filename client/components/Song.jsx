import React from 'react';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <tr id="hover-elements">
        <td>{this.props.id}</td>
        <td>+</td>
        <td id="song-name">{this.props.song.songName}</td>
        {this.props.song.length%60 < 10 ? 
          <td>{Math.floor(this.props.song.length/60)}:0{this.props.song.length%60}</td>
          :
          <td>{Math.floor(this.props.song.length/60)}:{this.props.song.length%60}</td>
        }
        {/* <td>{this.props.song.popularity}</td> */}
        <td><meter max = "8" min="0" value={this.props.song.popularity}/></td>
      </tr>
    )
  }
}

export default Song;