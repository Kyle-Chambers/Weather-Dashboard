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
      // defaultWeatherInfo: {},
      latAndLong: {
        latitude: 'loading', 
        longitude: 'loading'
      },
      temperature: 'loading',
      humidity: 'loading',
      location: 'loading',
      city: 'loading',
      windSpeed: 'loading',
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
      let { latitude, longitude } = this.state.latAndLong;

      getWeatherByLatitudeAndLongitude(latitude, longitude)
      .then((info => {
        let temperature = info.data.main.temp;
        let humidity = info.data.main.humidity;
        let location = info.data.name;
        let city = info.data.sys.country;
        let windSpeed = info.data.wind.speed;

        this.setState({
          temperature,
          humidity,
          location,
          city,
          windSpeed
        })

        console.log(this.state)
      }))
      .catch((err) => {
        console.log(err);
      });

    })
    .catch((err) => {
      console.log(err);
    });

  }

  render () {
    return (
      <div>
        <h1>Weather</h1>
        <p> Location: {this.state.temperature} </p>
        <p> Temperature: {this.state.temperature}</p>
        <p> Humidity: {this.state.humidity}</p>
        <p> Wind Speed: {this.state.windSpeed}</p>
        <p> Your latitude: {this.state.latAndLong.latitude}</p>
        <p> Your longitude: {this.state.latAndLong.longitude}</p>

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));