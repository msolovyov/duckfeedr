import test from 'tape'
import chartHelper from '../app/utils/chartHelper'

const inputData = [
  {
    id: 19,
    feedtime: '2020-01-02 12:07:00',
    food: 'Wheat, barley, or similar grains',
    amount: 5,
    latitude: '43.63524970',
    longitude: '-79.43662140',
    timezone: 'America/Vancouver',
    duckAmount: 2
  },
  {
    id: 21,
    feedtime: '2020-01-02 12:07:00',
    food: 'Mealworms',
    amount: 3,
    latitude: '43.63524970',
    longitude: '-79.43662140',
    timezone: 'America/Vancouver',
    duckAmount: 77
  }
]

test('scattet format', function (t) {
  const outputFormat = [
    {
      label: 'Wheat, barley, or similar grains',
      data: [{
        x: 2,
        y: 5
      }],
      pointRadius: 10
    }, {
      label: 'Mealworms',
      data: [{
        x: 77,
        y: 3
      }],
      pointRadius: 10
    }

  ]

  const result = chartHelper.scatterDataSetFormat(inputData, 10)
  t.deepEqual(result, outputFormat)
  t.end()
})
