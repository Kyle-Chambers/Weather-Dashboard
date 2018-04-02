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
      descriptor: 'loading',
      date: new Date(),
    }
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }


  componentDidMount() {

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    /////////////////////////

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
  
    //     let temperature = Math.floor(info.data.main.temp);
    //     let humidity = info.data.main.humidity;
    //     let location = info.data.name;
    //     let country = info.data.sys.country;
    //     let windSpeed = info.data.wind.speed;
    //     let iconId = info.data.weather[0].id;
    //     let descriptor = info.data.weather[0].description.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
  
    //     this.setState({
    //       temperature,
    //       humidity,
    //       location,
    //       country,
    //       windSpeed,
    //       iconId,
    //       descriptor
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
        descriptor,

      })

    }))
    .catch((err) => {
      console.log(err);
    });

  }

  render () {
    let hour = this.state.date.toLocaleTimeString().split(':')[0];
    let min = this.state.date.toLocaleTimeString().split(':')[1];
    return (
      <div className={style.screen}>  
              {/* clock <> */}
              <div className={style.clock}>
                <div className={style.clockDigitTop}>
                  <p className={style.clockDigits}>{hour.length === 2 ? hour : '0' + hour}</p>
                </div>
                <div className={style.clockDigitBottom}>
                  <p className={style.clockDigits}>{min}</p>
                </div>
              </div>

              <div className={style.main}>

                  {/* <>main info<> */}

                  <div className={style.mainInfo}> 

                    <i  className={[style.icon,` wi wi-owm-${this.state.iconId}`].join(' ')}></i> 

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
      </div>
    )
  }
}

ReactDOM.render(<LocalWeather />, document.getElementById('app'));

