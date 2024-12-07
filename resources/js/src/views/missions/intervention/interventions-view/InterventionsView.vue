<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="interventionData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching intervention data
      </h4>
      <div class="alert-body">
        No intervention found with this intervention id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'missions-interventions-list'}"
        >
          Intervention List
        </b-link>
        for other interventions.
      </div>
    </b-alert>

    <template v-if="interventionData">
      <!-- First Row -->
      <b-row class="match-height">
        <b-col
          cols="12"
          xl="9"
          lg="8"
          md="7"
        >
          <intervention-view-intervention-info-card :intervention-data="interventionData" />
        </b-col>
        <b-col
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
          <intervention-view-intervention-action-card />
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
          <intervention-view-intervention-contact-card :intervention-data="interventionData" />
        </b-col>
        <b-col
          cols="12"
          lg="6"
        >
          <!-- <div class="group-area mt-1">
            <h6>Inventory</h6>
            <hr>
          </div> -->
          <intervention-view-intervention-location-card :intervention-data="interventionData" />
          <!-- <intervention-view-intervention-inventory-card :intervention-data="interventionData" /> -->
        </b-col>
      </b-row>
      <b-row class="match-height">
        <b-col
          cols="12"
          lg="8"
        >
          <div class="group-area mt-1">
            <h6>CheckList</h6>
            <hr>
          </div>
          <intervention-view-intervention-check-list-card :intervention-data="interventionData" />

        </b-col>
        <b-col
          cols="12"
          lg="4"
        >
          <intervention-view-intervention-date-card :intervention-data="interventionData" />
        </b-col>
      </b-row>
      <b-row class="match-height">
        <b-col
          cols="12"
          lg="8"
        >
          <intervention-view-intervention-services-card :intervention-data="interventionData" />

        </b-col>
        <b-col
          cols="12"
          lg="4"
        >
          <intervention-view-intervention-customer-report-card :intervention-data="interventionData" />
          <intervention-view-intervention-customer-satisfaction-card :intervention-data="interventionData" />
          <intervention-view-intervention-work-shop-card :intervention-data="interventionData" />
          <intervention-view-intervention-scrap-management-card :intervention-data="interventionData" />
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
          <intervention-view-intervention-hr-card :intervention-data="interventionData" />
        </b-col>
        <b-col
          cols="12"
          lg="4"
        >
          <intervention-view-intervention-mr-card :intervention-data="interventionData" />
        </b-col>
        <b-col
          cols="12"
          lg="4"
        >
          <intervention-view-intervention-fr-card :intervention-data="interventionData" />
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
import interventionStoreModule from '../interventionStoreModule'
import InterventionViewInterventionInfoCard from './InterventionViewInterventionInfoCard.vue'
import InterventionViewInterventionActionCard from './InterventionViewInterventionActionCard.vue'
import InterventionViewInterventionContactCard from './InterventionViewInterventionContactCard.vue'
import InterventionViewInterventionLocationCard from './InterventionViewInterventionLocationCard.vue'
import InterventionViewInterventionCheckListCard from './InterventionViewInterventionCheckListCard.vue'
import InterventionViewInterventionDateCard from './InterventionViewInterventionDateCard.vue'
// import InterventionViewInterventionInventoryCard from './InterventionViewInterventionInventoryCard.vue'
import InterventionViewInterventionServicesCard from './InterventionViewInterventionServicesCard.vue'
import InterventionViewInterventionCustomerReportCard from './InterventionViewInterventionCustomerReportCard.vue'
import InterventionViewInterventionCustomerSatisfactionCard from './InterventionViewInterventionCustomerSatisfactionCard.vue'
import InterventionViewInterventionWorkShopCard from './InterventionViewInterventionWorkShopCard.vue'
import InterventionViewInterventionScrapManagementCard from './InterventionViewInterventionScrapManagementCard.vue'
import InterventionViewInterventionHrCard from './InterventionViewInterventionHrCard.vue'
import InterventionViewInterventionFrCard from './InterventionViewInterventionFrCard.vue'
import InterventionViewInterventionMrCard from './InterventionViewInterventionMrCard.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,

    // Local Components
    InterventionViewInterventionInfoCard,
    InterventionViewInterventionActionCard,
    InterventionViewInterventionContactCard,
    InterventionViewInterventionLocationCard,
    InterventionViewInterventionCheckListCard,
    InterventionViewInterventionDateCard,
    InterventionViewInterventionServicesCard,
    InterventionViewInterventionCustomerReportCard,
    InterventionViewInterventionCustomerSatisfactionCard,
    InterventionViewInterventionWorkShopCard,
    InterventionViewInterventionScrapManagementCard,
    // InterventionViewInterventionInventoryCard,
    InterventionViewInterventionHrCard,
    InterventionViewInterventionFrCard,
    InterventionViewInterventionMrCard,

    // InvoiceList,
  },
  setup() {
    const interventionData = ref(null)

    const INTERVENTION_APP_STORE_MODULE_NAME = 'app-intervention'

    // Register module
    if (!store.hasModule(INTERVENTION_APP_STORE_MODULE_NAME)) store.registerModule(INTERVENTION_APP_STORE_MODULE_NAME, interventionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INTERVENTION_APP_STORE_MODULE_NAME)) store.unregisterModule(INTERVENTION_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-intervention/fetchIntervention', { id: router.currentRoute.params.id })
      .then(response => { interventionData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          interventionData.value = undefined
        }
      })

    return {
      interventionData,
    }
  },
}
</script>

<style>
</style>
