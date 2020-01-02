<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">
        duckFeedr report
      </div>
    </v-ons-toolbar>
    <div
      class="chart-container"
      style="position: relative; height:40vh; width:80vw"
    >
      <canvas id="chart" />
    </div>
  </v-ons-page>
</template>

<script>
import store from '../utils/store'
import Chart from 'chart.js'
export default {
  name: '',
  components: {},
  data () {
    return {
      // model
      tableData: store.model.resultsTable
    }
  },
  computed: {
    // state
  },
  beforeMount () {
    this.nextAction()
  },
  methods: {
    makeChart () {
      const food = this.tableData.records.map(x => x.food)
      const data = this.tableData.records.map(d => ({ x: d.duckAmount, y: d.amount }))
      const dataSets = this.tableData.records.map(t => (
        {
          label: t.food,
          x: t.duckAmount,
          y: t.amount

        }
      ))
      console.log(dataSets)

      const myChart = new Chart('chart', {
        type: 'scatter',
        data: {
          labels: food,
          datasets: dataSets
        },
        options: {
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }]
          }
        }
      })
    },
    modelPresent (data) {
    },
    async nextAction () {
      await store.loadResultsTable()
      this.makeChart()
      console.log(this.tableData.records)
    }
  }
}
</script>

<style>

</style>
