import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: {},
      artistName: '',
      albums: [{albumImage: ""}]
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
          artist: data[0],
          artistName: data[0].artistName,
          albums: data[0].albums
        })
      }
    })
  }

  render() {
    return(
      <div>
        <h3>Albums</h3>
        <hr/>
        <div>
          <img src={this.state.albums[0].albumImage} width="150" height="150"/>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Test1</td>
              </tr>
              <tr>
                <td>Test3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));