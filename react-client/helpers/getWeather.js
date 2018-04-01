import axios from 'axios';
import OPEN_WEATHER_MAP_KEY from '../../config.js'

const getWeatherByZip = (zip) => {
    return axios.get({
        method:'get',
        url:`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us`,
        responseType:'json'
      })
}

const getWeatherByLatitudeAndLongitude = (latitude, longitude) => {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${OPEN_WEATHER_MAP_KEY}`)
}

export { getWeatherByZip, getWeatherByLatitudeAndLongitude }
