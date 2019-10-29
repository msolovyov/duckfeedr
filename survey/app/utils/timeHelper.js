import { zonedTimeToUtc } from 'date-fns-tz'
import format from 'date-fns/format'

const timeHelper = {
  getTimeZoneValue () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  },
  getCurrentDateTime () {
    // datetime-local requires there not be seconds: yyyy-MM-dd
    return format(new Date(), "yyyy-MM-dd'T'HH:mm")
  },
  getUTCDate () {
    return zonedTimeToUtc(this.getCurrentDate(), this.getTimeZoneValue())
  }
}
export default timeHelper
