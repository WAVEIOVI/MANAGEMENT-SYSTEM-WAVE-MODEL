<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="parkData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching park data
      </h4>
      <div class="alert-body">
        No park found with this park id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'contacts-parks-list'}"
        >
          Park List
        </b-link>
        for other parks.
      </div>
    </b-alert>

    <template v-if="parkData">
      <!-- First Row -->
      <b-row class="match-height">
        <b-col
          cols="12"
          xl="9"
          lg="8"
          md="7"
        >
          <park-view-park-info-card
            :park-data="parkData"
          />
        </b-col>
        <b-col
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
          <park-view-park-action-card />
        </b-col>
      </b-row>
      <b-row class="match-height">
        <b-col>
          <park-view-park-statistics-card />
        </b-col>
      </b-row>
      <b-row class="match-height">
        <b-col>
          <park-view-area-list-card />
        </b-col>
      </b-row>
      <hr>
      <b-row class="match-height">
        <b-col>
          <park-view-equipment-list-card />
        </b-col>
      </b-row>
    </template>

  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'
import parkStoreModule from '../parkStoreModule'
import ParkViewParkInfoCard from './ParkViewParkInfoCard.vue'
import ParkViewParkActionCard from './ParkViewParkActionCard.vue'
import ParkViewParkStatisticsCard from './park-view-statistics/ParkViewParkStatisticsCard.vue'
import ParkViewAreaListCard from './park-view-area/ParkViewAreaListCard.vue'
import ParkViewEquipmentListCard from './park-view-equipment/ParkViewEquipmentListCard.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,

    // Local Components
    ParkViewParkInfoCard,
    ParkViewParkActionCard,
    ParkViewParkStatisticsCard,
    ParkViewAreaListCard,
    ParkViewEquipmentListCard,

  },
  setup() {
    const parkData = ref(null)

    const PARK_APP_STORE_MODULE_NAME = 'app-park'

    // Register module
    if (!store.hasModule(PARK_APP_STORE_MODULE_NAME)) store.registerModule(PARK_APP_STORE_MODULE_NAME, parkStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PARK_APP_STORE_MODULE_NAME)) store.unregisterModule(PARK_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-park/fetchPark', { id: router.currentRoute.params.id })
      .then(response => { parkData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          parkData.value = undefined
        }
      })

    return {
      parkData,
    }
  },
}
</script>

<style>

</style>
