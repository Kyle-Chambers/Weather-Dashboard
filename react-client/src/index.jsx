import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import getLatitudeAndLongitude from '../helpers/getLatitudeAndLongitude.js';
import style from './styles/main.css'
import { 
  getWeatherByZip, 
  getWeatherByLatitudeAndLongitude 
} from '../helpers/getWeather.js';



class LocalWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      // defaultWeatherInfo: {},
      latitude: 'loading', 
      longitude: 'loading',
      temperature: 0,
      humidity: 'loading',
      location: 'loading',
      country: 'loading',
      windSpeed: 'loading',
      iconId: null,
      descriptor: 'loading'
    }
  }

  capitalizeDescriptor() {

  }

  componentDidMount() {

    // getLatitudeAndLongitude()
    // .then((position) => {
    //   let { latitude, longitude } = position;
    //   this.setState({
    //     latitude,
    //     longitude
    //   });
    // })
    // .then(() => {

    //   getWeatherByLatitudeAndLongitude(this.state.latitude, this.state.longitude)

    //   .then((info => {
    //     console.log(info);

    //     let temperature = info.data.main.temp;
    //     let humidity = info.data.main.humidity;
    //     let location = info.data.name;
    //     let city = info.data.sys.country;
    //     let windSpeed = info.data.wind.speed;
    //     let iconId = info.data.weather[0].id;

    //     this.setState({
    //       temperature,
    //       humidity,
    //       location,
    //       city,
    //       windSpeed,
    //       iconId
    //     })

    //   }))
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    ////////// <<<<<<<<<<<< HARD CODED LAT AND LONG UNCOMMENT CODE ABOVE TO GO BACK >>>>>>>>>>>>

    let { latitude, longitude } =  {latitude: 37.7771726, longitude: -122.4238155};

    this.setState({
      latitude,
      longitude
    })

    getWeatherByLatitudeAndLongitude(latitude, longitude)
    .then((info => {
      console.log(info);

      let temperature = Math.floor(info.data.main.temp);
      let humidity = info.data.main.humidity;
      let location = info.data.name;
      let country = info.data.sys.country;
      let windSpeed = info.data.wind.speed;
      let iconId = info.data.weather[0].id;
      let descriptor = info.data.weather[0].description.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');

      this.setState({
        temperature,
        humidity,
        location,
        country,
        windSpeed,
        iconId,
        descriptor
      })

    }))
    .catch((err) => {
      console.log(err);
    });

  }

  render () {
    return (
      <div className={style.main}>

        {/* main info<> */}

        <div className={style.mainInfo}> 

          <div className={style.iconContainer}>
            <i  className={[style.icon,` wi wi-owm-${this.state.iconId}`].join(' ')}></i> 
          </div>

          <p className={style.temperature}> 
            {`${this.state.temperature}°`}
          </p>

        </div>

        {/* <>detailed info<> */}

        <div className={style.detailedInfo}>

          <p className={style.descriptor}>
            {this.state.descriptor}
          </p>

          <p className={style.location}> 
            City | {this.state.location}
          </p>

          <p className={style.country}> 
            Country | {this.state.country}
          </p>

          <p className={style.coordinates}> 
            Coordinates | {this.state.latitude.toString().slice(0,4)}, {this.state.longitude.toString().slice(0,4)}
          </p>

          <p className={style.humidity}> 
            Humidity | {this.state.humidity}
          </p>

          <p className={style.windSpeed}> 
            Wind Speed | {this.state.windSpeed}
          </p>

        </div>

      </div>
    )
  }
}

ReactDOM.render(<LocalWeather />, document.getElementById('app'));

