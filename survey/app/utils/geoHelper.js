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
      console.log(error)
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
