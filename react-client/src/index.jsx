import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import getLatitudeAndLongitude from '../helpers/getLatitudeAndLongitude.js'
import { 
  getWeatherByZip, 
  getWeatherByLatitudeAndLongitude 
} from '../helpers/getWeather.js';


const iconStyle = {
  fontSize: '200px',
  textAlign: 'center',
  color: 'grey'
};

class WeatherAtLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      // defaultWeatherInfo: {},
      latitude: 'loading', 
      longitude: 'loading',
      temperature: 'loading',
      humidity: 'loading',
      location: 'loading',
      city: 'loading',
      windSpeed: 'loading',
      iconId: null
    }
  }

  componentDidMount() {

    getLatitudeAndLongitude()
    .then((position) => {
      let { latitude, longitude } = position;
      this.setState({
        latitude,
        longitude
      });
    })
    .then(() => {

      getWeatherByLatitudeAndLongitude(this.state.latitude, this.state.longitude)

      .then((info => {
        console.log(info);

        let temperature = info.data.main.temp;
        let humidity = info.data.main.humidity;
        let location = info.data.name;
        let city = info.data.sys.country;
        let windSpeed = info.data.wind.speed;
        let iconId = info.data.weather[0].id;

        console.log()

        this.setState({
          temperature,
          humidity,
          location,
          city,
          windSpeed,
          iconId
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

    ////////// <<<<<<<<<<<< HARD CODED LAT AND LONG UNCOMMENT CODE ABOVE TO GO BACK >>>>>>>>>>>>

    // let { latitude, longitude } =  {latitude: 37.7771726, longitude: -122.4238155};

    // this.setState({
    //   latitude,
    //   longitude
    // })

    // getWeatherByLatitudeAndLongitude(latitude, longitude)
    // .then((info => {
    //   console.log(info);

    //   let temperature = info.data.main.temp;
    //   let humidity = info.data.main.humidity;
    //   let location = info.data.name;
    //   let city = info.data.sys.country;
    //   let windSpeed = info.data.wind.speed;
    //   let iconId = info.data.weather[0].id;

    //   console.log(iconId);

    //   this.setState({
    //     temperature,
    //     humidity,
    //     location,
    //     city,
    //     windSpeed,
    //     iconId
    //   })

    //   console.log(this.state)
    // }))
    // .catch((err) => {
    //   console.log(err);
    // });

  }

  render () {
    return (
      <div>

        <h1>Weather</h1>
        <i style={iconStyle} className={`wi wi-owm-${this.state.iconId}`}></i>

        <p>{this.state.iconId}</p>
        <p> Location: {this.state.location}  </p>
        <p> Location: {this.state.city} </p>
        <p> Temperature: {this.state.temperature}</p>
        <p> Humidity: {this.state.humidity}</p>
        <p> Wind Speed: {this.state.windSpeed}</p>
        <p> Your latitude: {Math.floor(this.state.latitude)}</p>
        <p> Your longitude: {Math.floor(this.state.longitude)}</p>

      </div>
    )
  }
}

ReactDOM.render(<WeatherAtLocation />, document.getElementById('app'));

