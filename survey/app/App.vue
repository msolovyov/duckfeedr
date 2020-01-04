<template>
  <v-ons-tabbar
    swipeable
    position="bottom"
    :tabs="tabs"
    :visible="true"
    :index.sync="activeIndex"
  />
</template>

<script>
import feedForm from './components/feedForm'
import report from './components/report'
export default {
  name: 'MainPage',
  components: { feedForm, report },
  data () {
    return {
      activeIndex: 0,
      tabs: [
        {
          icon: 'fa-home',
          label: 'Home',
          page: feedForm
        },
        {
          icon: 'fa-chart-bar',
          label: 'Reports',
          page: report
        }
      ]
      // model
    }
  },
  computed: {
    // state
  },
  methods: {
    modelPresent (data) {},
    nextAction () {}
  }
}
</script>

<style></style>
