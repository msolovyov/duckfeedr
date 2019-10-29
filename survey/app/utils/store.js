import storage from './storage'

const store = {
  model: {
    type: 'duckReport'
  },
  prepareFormData (data) {

  },

  async present (data = {}) {
    try {
      await storage.save(this.model, 'duckReports')
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
