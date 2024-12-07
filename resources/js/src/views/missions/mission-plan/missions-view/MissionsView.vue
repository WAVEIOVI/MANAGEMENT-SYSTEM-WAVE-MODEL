<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="missionData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching mission data
      </h4>
      <div class="alert-body">
        No mission found with this mission id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'contacts-missions-list'}"
        >
          Mission List
        </b-link>
        for other missions.
      </div>
    </b-alert>

    <template v-if="missionData">
      <!-- First Row -->
      <b-row class="match-height">
        <b-col
          cols="12"
          xl="9"
          lg="8"
          md="7"
        >
          <mission-view-mission-info-card :mission-data="missionData" />
        </b-col>
        <b-col
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
          <mission-view-mission-action-card />
        </b-col>
      </b-row>

      <b-row class="match-height">
        <b-col
          cols="12"
          lg="6"
        >
          <div class="group-area mt-1">
            <h6>Basic Information</h6>
            <hr>
          </div>
          <mission-view-mission-contact-card :mission-data="missionData" />
          <mission-view-mission-location-card :mission-data="missionData" />
        </b-col>
        <b-col
          cols="12"
          lg="6"
        >
          <div class="group-area mt-1">
            <h6>Inventory</h6>
            <hr>
          </div>
          <mission-view-mission-inventory-card :mission-data="missionData" />
        </b-col>
      </b-row>
      <b-row class="match-height">
        <b-col
          cols="12"
          lg="4"
        >
          <mission-view-mission-date-card :mission-data="missionData" />
        </b-col>
        <b-col
          cols="12"
          lg="8"
        >
          <mission-view-mission-services-card :mission-data="missionData" />
        </b-col>
      </b-row>
      <div class="group-area mt-1">
        <h6>Resources</h6>
        <hr>
      </div>
      <b-row class="match-height">
        <b-col
          cols="12"
          lg="4"
        >
          <mission-view-mission-hr-card :mission-data="missionData" />
        </b-col>
        <b-col
          cols="12"
          lg="4"
        >
          <mission-view-mission-mr-card :mission-data="missionData" />
        </b-col>
        <b-col
          cols="12"
          lg="4"
        >
          <mission-view-mission-fr-card :mission-data="missionData" />
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
// import InvoiceList from '@/views/apps/invoice/invoice-list/InvoiceList.vue'
import missionStoreModule from '../missionStoreModule'
import MissionViewMissionInfoCard from './MissionViewMissionInfoCard.vue'
import MissionViewMissionActionCard from './MissionViewMissionActionCard.vue'
import MissionViewMissionContactCard from './MissionViewMissionContactCard.vue'
import MissionViewMissionLocationCard from './MissionViewMissionLocationCard.vue'
import MissionViewMissionInventoryCard from './MissionViewMissionInventoryCard.vue'
import MissionViewMissionServicesCard from './MissionViewMissionServicesCard.vue'
import MissionViewMissionDateCard from './MissionViewMissionDateCard.vue'
import MissionViewMissionHrCard from './MissionViewMissionHrCard.vue'
import MissionViewMissionFrCard from './MissionViewMissionFrCard.vue'
import MissionViewMissionMrCard from './MissionViewMissionMrCard.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,

    // Local Components
    MissionViewMissionInfoCard,
    MissionViewMissionActionCard,
    MissionViewMissionContactCard,
    MissionViewMissionLocationCard,
    MissionViewMissionInventoryCard,
    MissionViewMissionServicesCard,
    MissionViewMissionDateCard,
    MissionViewMissionHrCard,
    MissionViewMissionFrCard,
    MissionViewMissionMrCard,

    // InvoiceList,
  },
  setup() {
    const missionData = ref(null)

    const MISSION_APP_STORE_MODULE_NAME = 'app-mission'

    // Register module
    if (!store.hasModule(MISSION_APP_STORE_MODULE_NAME)) store.registerModule(MISSION_APP_STORE_MODULE_NAME, missionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MISSION_APP_STORE_MODULE_NAME)) store.unregisterModule(MISSION_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-mission/fetchMission', { id: router.currentRoute.params.id })
      .then(response => { missionData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          missionData.value = undefined
        }
      })

    return {
      missionData,
    }
  },
}
</script>

<style>

</style>
