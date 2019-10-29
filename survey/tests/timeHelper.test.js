import test from 'tape'
import timeHelper from '../app/utils/timeHelper'
import parseISO from 'date-fns/parseISO'
import isValid from 'date-fns/isValid'

test('iso string format', function (t) {
  const nowISO = timeHelper.getCurrentDateTime()
  const result = parseISO(nowISO)
  t.equals(isValid(result), true)
  t.end()
})
