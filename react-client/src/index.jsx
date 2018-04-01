import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import getLatitudeAndLongitude from '../helpers/getLatitudeAndLongitude.js'
import { 
  getWeatherByZip, 
  getWeatherByLatitudeAndLongitude 
} from '../helpers/getWeather.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      weatherInfo: {},
      latAndLong: {
        latitude: null, 
        longitude: null
      },
    }
  }

  componentDidMount() {

    getLatitudeAndLongitude()
    .then((position) => {
      this.setState({
        latAndLong: position
      });
    })
    .then(() => {
      let { latitude, longitude } = this.state.latAndLong
      getWeatherByLatitudeAndLongitude(latitude, longitude)
      .then((info => {
        console.log(info.data);
      }))
    })
    .catch((err) => {
      console.log(err);
    });

  }

  render () {
    return (
      <div>
        <h1>Item List</h1>
        <p>{this.state.latAndLong.latitude}</p>
        <List items={this.state.items}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));