import Vue from 'vue/dist/vue.js'
import VueOnsen from 'vue-onsenui'
import App from './App.vue'

Vue.use(VueOnsen)
Vue.config.productionTip = false
new Vue({
  el: 'app',
  components: { App }
})
