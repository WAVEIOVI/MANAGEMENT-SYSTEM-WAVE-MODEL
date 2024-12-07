<template>

  <div>

    <b-card
      no-body
    >
      <b-card-header>
        <b-card-title>Locations List</b-card-title>
      </b-card-header>

      <!-- body -->
      <b-card-body>

        <b-table
          ref="refCustomerLocationsListTable"
          class="position-relative"
          :items="fetchCustomerLocations"
          responsive
          :fields="tableColumnsLocations"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        >
          <!-- Column: ID -->
          <template #cell(location_id)="data">
            <div> {{ data.item.location_description }}</div>
            <small>{{ data.item.location_id }}</small>
          </template>
          <!-- Column: ID -->
          <template #cell(location_address)="data">
            <div>
              {{ data.item.location_address }}
            </div>
            <div>{{ data.item.location_postcode }} {{ data.item.location_city }} {{ data.item.location_country }}</div>
          </template>
          <!-- Column: contact -->
          <template #cell(location_contact)="data">
            <div>
              {{ data.item.location_phone }}
            </div>
            <div>
              {{ data.item.location_email }}
            </div>
          </template>
        </b-table>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BTable,
  BCardTitle,
  BCardBody,
} from 'bootstrap-vue'
import store from '@/store'
import { onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import useCustomersView from './useCustomersView'
import locationStoreModule from '../customers-edit/customer-edit-tab-locations/locationStoreModule'

export default {
  components: {
    BCard,
    BCardHeader,
    BTable,
    BCardTitle,
    BCardBody,
  },

  setup() {
    const LOCATION_APP_STORE_MODULE_NAME = 'app-location'

    // Register module
    if (!store.hasModule(LOCATION_APP_STORE_MODULE_NAME)) store.registerModule(LOCATION_APP_STORE_MODULE_NAME, locationStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(LOCATION_APP_STORE_MODULE_NAME)) store.unregisterModule(LOCATION_APP_STORE_MODULE_NAME)
    })

    const {
      fetchCustomerLocations,
      tableColumnsLocations,
      refCustomerLocationsListTable,
      refetchData,
    } = useCustomersView()
    return {
      fetchCustomerLocations,
      tableColumnsLocations,
      refCustomerLocationsListTable,
      refetchData,
      avatarText,
    }
  },
}
</script>

    <style lang="scss" scoped>
    .per-page-selector {
      width: 90px;
    }
    </style>
