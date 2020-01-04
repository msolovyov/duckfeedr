import Chart from 'chart.js'
import 'chartjs-plugin-colorschemes'

const chartHelper = {
  // makes sql table data output to something chart.js wants for scatter charts
  scatterDataSetFormat(arr, radius) {
    // for every food label gather the x/y data points
    const myObject = arr.reduce((accumulator, value) => {
      const filtered = arr.filter(entry => entry.food === value.food)
      const points = filtered.map(d => ({ x: d.duckAmount, y: d.amount }))

      accumulator.push({ label: value.food, data: points, pointRadius: radius })
      return accumulator
    }, [])

    // make unique based on label
    const cachedObject = {}
    myObject.map((item) => (cachedObject[item.label] = item))
    const result = (Object.values(cachedObject))
    return result
  },
  drawScatterChart(canvasElement, arr) {
    // console.log(arr)

    // Get canvas context
    const ctx = canvasElement.getContext('2d')
    // Clear the canvas
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    // get dataset
    const result = this.scatterDataSetFormat(arr, 10)
    // paint chart
    const b = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: result
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'Ducks'
            }
          }],
          yAxes: [{
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: 'Handfuls'
            }
          }]
        },
        plugins: {
          colorschemes: {
            scheme: 'brewer.SetThree12'
          }
        }
      }
    })
    return b
  }
}
export default chartHelper
