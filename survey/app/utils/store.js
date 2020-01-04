import storage from './storage'
import merge from 'lodash.merge'

const store = {
  model: {
    type: 'duckReports',
    payload: '',
    resultsTable: [],
    updated: 0

  },
  prepareFormData(data) {
    console.log(data)

    if (data.newReport) {
      const { newReport, ...pLoad } = data
      this.model.payload = pLoad
    }
  },
  async loadResultsTable() {
    const loaded = await storage.loadDuckReport()
    const records = loaded.records

    merge(this.model.resultsTable, records)

    // helps trigger update on computed property
    this.model.updated = this.model.updated + 1
  },
  async present(data = {}) {
    this.prepareFormData(data)
    try {
      await storage.save(this.model.payload, this.model.type)
      await this.loadResultsTable()
    } catch (e) {
      if (e.status === 409) {
        // await sleep(100)
        // await storage.save(this.model)
      }
    } finally {
    }
  }
}
Object.freeze(store)
export default store
