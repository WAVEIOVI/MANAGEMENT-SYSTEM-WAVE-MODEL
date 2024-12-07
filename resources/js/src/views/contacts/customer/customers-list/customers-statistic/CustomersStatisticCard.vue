<template>
  <div>
    <!-- Stats Card Horizontal -->
    <b-row class="match-height">
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="UsersIcon"
          :statistic="metaData.all_customers"
          statistic-title="All Customers"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="UserCheckIcon"
          color="success"
          :statistic="metaData.active_customers"
          statistic-title="Active Customers"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="UserPlusIcon"
          color="warning"
          :statistic="metaData.pending_customers"
          statistic-title="Pending Customers"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="UserXIcon"
          color="danger"
          :statistic="metaData.inactive_customers"
          statistic-title="Inactive Customers"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BRow, BCol,
} from 'bootstrap-vue'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import metaStoreModule from './metaCustomersStoreModule'

export default {
  components: {
    BRow,
    BCol,
    StatisticCardHorizontal,
  },
  setup() {
    const META_APP_STORE_MODULE_NAME = 'app-meta'

    // Register module
    if (!store.hasModule(META_APP_STORE_MODULE_NAME)) store.registerModule(META_APP_STORE_MODULE_NAME, metaStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(META_APP_STORE_MODULE_NAME)) store.unregisterModule(META_APP_STORE_MODULE_NAME)
    })

    const metaData = ref({})
    store
      .dispatch('app-meta/fetchCustomers')
      .then(response => {
        metaData.value = response.data.count
        console.log(metaData.value)
      })

    return {
      metaData,
    }
  },
}
</script>
