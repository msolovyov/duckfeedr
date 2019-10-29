// upload to aws rds
import ky from 'ky-universal'
import { Buffer } from 'buffer'
import config from '../config'
const storage = {
  async save (data, tableName) {
    const body = {
      data: data,
      tableName: tableName
    }
    const buffer = Buffer.from(JSON.stringify(body))

    const parsed = await ky.post(config.api.duckDbSave, { body: buffer }).json()
    console.log(parsed)
  }
}
export default storage
