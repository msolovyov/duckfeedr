import storage from './storage'

const store = {
  model: {
    type: 'duckReports',
    payload: ''
  },
  prepareFormData (data) {
    console.log(data)

    if (data.newReport) {
      const { newReport, ...pLoad } = data
      this.model.payload = pLoad
      console.log(this.model)
    }
  },

  async present (data = {}) {
    this.prepareFormData(data)
    try {
      await storage.save(this.model.payload, this.model.type)
    } catch (e) {
      if (e.status === 409) {
        // await sleep(100)
        // await storage.save(this.model)
      }
    } finally {
    }
  }
}

export default store
