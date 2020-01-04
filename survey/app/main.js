/* eslint-disable no-undef, no-new, no-unused-vars */
import Vue from 'vue/dist/vue.js'
import VueOnsen from 'vue-onsenui'
import App from './App.vue'
import 'core-js'
import store from './utils/store'

Vue.use(VueOnsen)

Vue.config.productionTip = false
new Vue({
  el: 'app',
  components: { App },
  async beforeCreate() { await store.loadResultsTable() }
})
