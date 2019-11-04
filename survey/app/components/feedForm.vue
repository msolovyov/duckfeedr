<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">
        duckFeedr
      </div>
    </v-ons-toolbar>
    <form @submit.prevent="submitForm">
      <v-ons-list>
        <v-ons-list-header>Time of feeding</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input
              v-model="formFeedTime"
              type="datetime-local"
              required
            />
          </div>
        </v-ons-list-item>
        <v-ons-list-header>What food?</v-ons-list-header>
        <v-ons-list-item>
          <v-ons-select
            id="foodTypeSelect"
            v-model="formFoodType"
            select-id="foodTypeSelectInner"
            required
          >
            <option
              v-for="item in feedTypeItems"
              :key="item.value"
              :value="item.value"
            >
              {{ item.text }}
            </option>
          </v-ons-select>
        </v-ons-list-item>
        <v-ons-list-header>How much food?</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input
              v-model="formFoodAmount"
              type="number"
              placeholder="Handfuls"
              step="1"
              min="0"
              required
            />
          </div>
        </v-ons-list-item>
        <v-ons-list-header>Where?</v-ons-list-header>
        <v-ons-list-item>
          <div class="left">
            {{ latitude }} , {{ longitude }}
          </div>
          <div class="right">
            <v-ons-button @click="refreshLocation">
              Refresh Location
            </v-ons-button>
          </div>
        </v-ons-list-item>
        <v-ons-list-header>How many?</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input
              type="number"
              placeholder="Number of ducks"
              step="1"
              min="0"
              required
            />
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <button
            class="button--cta"
            type="submit"
          >
            Submit
          </button>
        </v-ons-list-item>
      </v-ons-list>
    </form>
  </v-ons-page>
</template>

<script>
import timeHelper from '../utils/timeHelper'
import geoHelper from '../utils/geoHelper'
import store from '../utils/store'

export default {
  name: 'FeedForm',
  components: {},
  data () {
    return {
      // form data for submit
      feedTime: '',
      formFoodType: '',
      formFoodAmount: '',
      latitude: '',
      longitude: '',
      // model
      feedTypeItems: [
        { text: 'Cracked corn', value: 'Cracked corn' },
        { text: 'Wheat, barley, or similar grains', value: 'Wheat, barley, or similar grains' },
        { text: 'Oats (uncooked; rolled or quick)', value: 'Oats (uncooked; rolled or quick)' },
        { text: 'Rice', value: 'Rice' },
        { text: 'Milo seed', value: 'Milo seed' },
        { text: 'Birdseed', value: 'Birdseed' },
        { text: 'Grapes', value: 'Grapes' },
        { text: 'Nut hearts or pieces', value: 'N' },
        { text: 'Frozen peas', value: 'Frozen peas' },
        { text: 'Earthworms', value: 'Earthworms' },
        { text: 'Mealworms', value: 'Mealworms' },
        { text: 'Chopped lettuce or other greens or salad mixes', value: 'Chopped lettuce or other greens or salad mixes' },
        { text: 'Vegetable trimmings or peels', value: 'Vegetable trimmings or peels' },
        { text: 'Duck feed pellets or poultry starter pellets ', value: 'Duck feed pellets or poultry starter pellets ' }

      ]
    }
  },
  computed: {
    // form
    formFeedTime: {
      get () {
        return timeHelper.getCurrentDateTime()
      },
      set (val) {
        this.feedTime = val
      }
    }

    // state
  },
  beforeMount () {
    this.nextAction()
  },
  methods: {
    async refreshLocation () {
      const coords = await geoHelper.getCoordinates()
      this.latitude = coords.latitude
      this.longitude = coords.longitude
    },
    submitForm () {
      const timezone = timeHelper.getTimeZoneValue()
      const data = {
        newReport: true,
        feedtime: this.feedTime,
        food: this.formFoodType,
        amount: this.formFoodAmount,
        latitude: this.latitude,
        longitude: this.longitude,
        timezone: timezone
      }
      console.log(data)
      if (data.feedtime && data.food && data.amount && data.timezone) {
        this.modelPresent(data)
        this.$ons.notification.alert('Your duck feeding report has been submitted')
      }
    },
    modelPresent (data) {
      store.present(data)
      this.nextAction()
    },
    async nextAction () {
      if (!this.feedtime) {
        this.feedTime = timeHelper.getCurrentDateTime()
      }
      if (!this.latitude || !this.longitude) {
        await this.refreshLocation()
      }
    }
  }

}
</script>

<style></style>
