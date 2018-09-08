import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: ''
    }
  }

  componentDidMount() {
    this.getAllArtists();
  }

  getAllArtists() {
    $.ajax({
      method: "GET",
      url: "/albums",
      success: (data) => {
        this.setState({
          artist: data[0].artistName
        })
      }
    })
  }

  render() {
    return(
      <div>
        <h1>WE REACT!!</h1>
        <h2>This is what we got from the server</h2>
        <h3>{this.state.artist}</h3>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));