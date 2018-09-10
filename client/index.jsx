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
          <img src={this.state.albums[0].albumImage} width="130" height="130"/>
        </div>
        <div>
          <br/>
          <table>
            <tbody>
              <tr>
                <th width="40">#</th>
                <th width="30"></th>
                <th>TITLE</th>
                <th width="30">time</th>
              </tr>
              <tr>
                <td>1</td>
                <td>+</td>
                <td>Test1</td>
                <td>time</td>
              </tr>
              <tr>
                <td>2</td>
                <td>+</td>
                <td>Test3</td>
                <td>time</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));