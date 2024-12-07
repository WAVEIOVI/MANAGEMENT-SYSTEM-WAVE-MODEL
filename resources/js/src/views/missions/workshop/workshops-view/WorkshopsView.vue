<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="workshopData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching workshop data
      </h4>
      <div class="alert-body">
        No workshop found with this workshop id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'missions-workshops-list'}"
        >
          Workshop List
        </b-link>
        for other workshops.
      </div>
    </b-alert>

    <template v-if="workshopData">
      <!-- First Row -->
      <b-row class="match-height">
        <b-col
          cols="12"
          xl="9"
          lg="8"
          md="7"
        >
          <workshop-view-workshop-info-card :workshop-data="workshopData" />
        </b-col>
        <b-col
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
          <workshop-view-workshop-action-card />
        </b-col>
      </b-row>
      <div class="group-area mt-1">
        <h6>Basic Information</h6>
        <hr>
      </div>
      <b-row class="match-height">
        <b-col
          cols="12"
          lg="6"
        >
          <workshop-view-workshop-contact-card :workshop-data="workshopData" />
        </b-col>
        <b-col
          cols="12"
          lg="6"
        >
          <!-- <div class="group-area mt-1">
            <h6>Inventory</h6>
            <hr>
          </div> -->
          <workshop-view-workshop-location-card :workshop-data="workshopData" />
          <!-- <workshop-view-workshop-inventory-card :workshop-data="workshopData" /> -->
        </b-col>
      </b-row>
      <b-row class="match-height">
        <b-col
          cols="12"
          lg="8"
        >
          <!-- <workshop-view-workshop-check-list-card :workshop-data="workshopData" /> -->
          <workshop-view-workshop-services-card :workshop-data="workshopData" />
        </b-col>
        <b-col
          cols="12"
          lg="4"
        >
          <workshop-view-workshop-date-card :workshop-data="workshopData" />
        </b-col>
      </b-row>
      <b-row class="match-height">
        <!-- <b-col
          cols="12"
          lg="8"
        >
          <workshop-view-workshop-services-card :workshop-data="workshopData" />

        </b-col> -->
        <b-col
          cols="12"
          lg="4"
        >
          <!-- <workshop-view-workshop-customer-report-card :workshop-data="workshopData" />
          <workshop-view-workshop-customer-satisfaction-card :workshop-data="workshopData" />
          <workshop-view-workshop-work-shop-card :workshop-data="workshopData" />
          <workshop-view-workshop-scrap-management-card :workshop-data="workshopData" /> -->
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
import workshopStoreModule from '../workshopStoreModule'
import WorkshopViewWorkshopInfoCard from './WorkshopViewWorkshopInfoCard.vue'
import WorkshopViewWorkshopActionCard from './WorkshopViewWorkshopActionCard.vue'
import WorkshopViewWorkshopContactCard from './WorkshopViewWorkshopContactCard.vue'
import WorkshopViewWorkshopLocationCard from './WorkshopViewWorkshopLocationCard.vue'
import WorkshopViewWorkshopDateCard from './WorkshopViewWorkshopDateCard.vue'
// import WorkshopViewWorkshopInventoryCard from './WorkshopViewWorkshopInventoryCard.vue'
import WorkshopViewWorkshopServicesCard from './WorkshopViewWorkshopServicesCard.vue'
// import WorkshopViewWorkshopWorkShopCard from './WorkshopViewWorkshopWorkShopCard.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,

    // Local Components
    WorkshopViewWorkshopInfoCard,
    WorkshopViewWorkshopActionCard,
    WorkshopViewWorkshopContactCard,
    WorkshopViewWorkshopLocationCard,
    WorkshopViewWorkshopDateCard,
    WorkshopViewWorkshopServicesCard,
    // WorkshopViewWorkshopWorkShopCard,
    // WorkshopViewWorkshopInventoryCard,
    // InvoiceList,
  },
  setup() {
    const workshopData = ref(null)

    const WORKSHOP_APP_STORE_MODULE_NAME = 'app-workshop'

    // Register module
    if (!store.hasModule(WORKSHOP_APP_STORE_MODULE_NAME)) store.registerModule(WORKSHOP_APP_STORE_MODULE_NAME, workshopStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(WORKSHOP_APP_STORE_MODULE_NAME)) store.unregisterModule(WORKSHOP_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-workshop/fetchWorkshop', { id: router.currentRoute.params.id })
      .then(response => { workshopData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          workshopData.value = undefined
        }
      })

    return {
      workshopData,
    }
  },
}
</script>

<style>
</style>
