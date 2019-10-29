const geoHelper = {
  geo () {
    if ('geolocation' in navigator) {
      /* geolocation is available */
      return true
    } else {
      /* geolocation IS NOT available */
      return false
    }
  },
  async getCoordinates () {
    try {
      const pos = await this.getCurrentPosition()

      return pos.coords
    } catch (error) {
      let msg = null
      switch (error.code) {
        case error.PERMISSION_DENIED:
          msg = 'User denied the request for Geolocation.';
          break
        case error.POSITION_UNAVAILABLE:
          msg = 'Location information is unavailable.';
          break
        case error.TIMEOUT:
          msg = 'The request to get user location timed out.';
          break
        case error.UNKNOWN_ERROR:
          msg = 'An unknown error occurred.';
          break
      }
      alert(msg)
    }
  },
  getCurrentPosition () {
    if (navigator.geolocation) {
      return new Promise(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
      )
    } else {
      return new Promise(
        resolve => resolve({})
      )
    }
  },
  async getLatLong () {
    const coords = await this.getCoordinates()
    const latlong = coords.latitude + ' , ' + coords.longitude
    return latlong
  }
}

export default geoHelper
