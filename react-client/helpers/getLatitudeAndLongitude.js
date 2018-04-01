export default async () => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
  
          pos => {
            let {latitude, longitude} = pos.coords;
            resolve({latitude, longitude})
          },
  
          error => { reject(error) }
  
        );
      })
    } else {
      throw new Error('Geolocation is not supported by this browser.')
    }
  }