<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">
        duckFeedr report
      </div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-header>Food and Ducks amounts</v-ons-list-header>
      <v-ons-list-item>
        <canvas
          v-scatterD="scata"
        />
      </v-ons-list-item>
      <v-ons-list-item>
        <div hidden>
          {{ model.resultsTable.length }} - {{ model.updated }}
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import store from '../utils/store'

import chartHelper from '../utils/chartHelper'
export default {
  name: '',
  components: {},
  directives: {
    scatterD: function (canvasElement, binding) {
      if (binding.value) {
        const chart = binding.value.draw(canvasElement)
      }
    }
  },

  data () {
    return {

      // model
      model: store.model

    }
  },
  computed: {
    scata: {
      get () {
        return new Charter(this.model.resultsTable)
      }
    }
  },
  async beforeMount () {

  },
  methods: {

    modelPresent (data) {
      this.nextAction()
    },
    async nextAction () {
      await store.loadResultsTable()
    }
  }
}

// takes in list of records and then draws chart on canvas element
class Charter {
  records = []
  constructor (records) {
    this.records = records
  }

  draw (canvasElement) {
    return chartHelper.drawScatterChart(canvasElement, this.records)
  }
}
</script>

<style>

</style>
