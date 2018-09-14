import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerEmpty, faThermometerQuarter, faThermometerHalf, faThermometerThreeQuarters, 
         faThermometerFull, faPlayCircle, faPauseCircle, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idElement: this.props.id,
      playing: false,
      inLibrary: this.props.addedToLibrary
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      inLibrary: nextProps.addedToLibrary
    });
    if ( nextProps.originalAlbum !== nextProps.albumPlaying && nextProps.albumPlaying !== 0) {
      this.setState ({
        idElement: this.props.id,
        playing: false
      });
    } else if (nextProps.songPlaying !== this.props.id && nextProps.songPlaying !== 0) {
      this.setState ({
        idElement: this.props.id,
        playing: false
      });
    } else if (nextProps.songPlaying === this.props.id) {
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
      return(
        <td>
          <div className="dropdown">
            <FontAwesomeIcon icon={faThermometerEmpty} size="lg"/>
            <div className="dropdown-content">
              {this.props.song.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} plays
            </div>
          </div>
        </td>
      )
    } else if (this.props.song.popularity < 4) {
      return(
        <td>
          <div className="dropdown">
            <FontAwesomeIcon icon={faThermometerQuarter} size="lg"/>
            <div className="dropdown-content">
              {this.props.song.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} plays
            </div>
          </div>
        </td>
      )
    } else if (this.props.song.popularity === 4) {
      return(
        <td>
          <div className="dropdown">
            <FontAwesomeIcon icon={faThermometerHalf} size="lg"/>
            <div className="dropdown-content">
              {this.props.song.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} plays
            </div>
          </div>
        </td>
      )
    } else if (this.props.song.popularity < 7) {
      return(
        <td>
          <div className="dropdown">
            <FontAwesomeIcon icon={faThermometerThreeQuarters} size="lg"/>
            <div className="dropdown-content">
              {this.props.song.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} plays
            </div>
          </div>
        </td>
      )
    } else {
      return(
        <td>
          <div className="dropdown">
            <FontAwesomeIcon icon={faThermometerFull} size="lg"/>
            <div className="dropdown-content">
              {this.props.song.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} plays
            </div>
          </div>
        </td>
      )
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

  handlePlayClick() {
    if (!this.state.playing) {
      this.setState({
        idElement: <FontAwesomeIcon icon={faPauseCircle} size="lg"/>,
        playing: true
      }, () => {
        this.props.updateID(this.props.id);
        this.forceUpdate();
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

  inLibraryCheck() {
    if (this.state.inLibrary) {
      return <td id="plus" onClick={this.handleChangeInLibraryClick.bind(this)}><FontAwesomeIcon icon={faCheck} size="sm"/></td>;
    } else {
      return <td id="plus" onClick={this.handleChangeInLibraryClick.bind(this)}><FontAwesomeIcon icon={faPlus} size="sm"/></td>;
    }
  }

  handleChangeInLibraryClick() {
    var newStateInLibrary = !this.state.inLibrary;
    this.setState({
      inLibrary: newStateInLibrary
    }, () => this.props.handleLibraryClick(this.props.id, newStateInLibrary))
  }

  coloredTitle() {  // This is not working, color needs to re-render but it is not...
    var results = [];
    if (this.state.idElement === <FontAwesomeIcon icon={faPauseCircle} size="lg"/>) {
      results.push(<td id="song-name" onClick={this.handlePlayClick.bind(this)} style={{color: 'green'}}>{this.props.song.songName}</td>);
      if (this.props.song.length%60 < 10) {
        results.push(<td onClick={this.handlePlayClick.bind(this)} style={{color: 'green'}}>{Math.floor(this.props.song.length/60)}:0{this.props.song.length%60}</td>);
      } else {
        results.push(<td onClick={this.handlePlayClick.bind(this)} style={{color: 'green'}}>{Math.floor(this.props.song.length/60)}:{this.props.song.length%60}</td>);
      }
      return results;
    } else {
      results.push(<td id="song-name" onClick={this.handlePlayClick.bind(this)}>{this.props.song.songName}</td>);
      if (this.props.song.length%60 < 10) {
        results.push(<td onClick={this.handlePlayClick.bind(this)}>{Math.floor(this.props.song.length/60)}:0{this.props.song.length%60}</td>);
      } else {
        results.push(<td onClick={this.handlePlayClick.bind(this)}>{Math.floor(this.props.song.length/60)}:{this.props.song.length%60}</td>);
      }
      return results;
    }
  }

  render() {
    return (
      <tr id="hover-elements" onMouseOver={this.handleMouseOver.bind(this)} 
                              onMouseOut={this.handleMouseOut.bind(this)}>
        <td onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>{this.state.idElement}</td>
        {this.inLibraryCheck()}
        {this.coloredTitle()}
        {this.popularity()}
      </tr>
    )
  }
}

export default Song;