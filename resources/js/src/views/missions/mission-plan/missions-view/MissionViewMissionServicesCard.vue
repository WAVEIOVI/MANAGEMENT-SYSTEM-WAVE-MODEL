<template>

  <div>

    <b-card
      bg-variant="transparent"
      border-variant="primary"
      no-body
    >
      <b-card-header>
        <b-card-title>Services List</b-card-title>
      </b-card-header>

      <!-- body -->
      <b-card-body>

        <b-table
          ref="refMissionServicesListTable"
          class="position-relative"
          :items="fetchMissionServices"
          responsive
          :fields="tableColumnsServices"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        >
          <!-- A virtual column -->
          <template #cell(index)="data">
            {{ data.index + 1 }}
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
import useMissionsView from './useMissionsView'
import serviceStoreModule from '../missions-edit/mission-edit-tab-services/serviceStoreModule'

export default {
  components: {
    BCard,
    BCardHeader,
    BTable,
    BCardTitle,
    BCardBody,
  },

  setup() {
    const SERVICE_APP_STORE_MODULE_NAME = 'app-service'

    // Register module
    if (!store.hasModule(SERVICE_APP_STORE_MODULE_NAME)) store.registerModule(SERVICE_APP_STORE_MODULE_NAME, serviceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(SERVICE_APP_STORE_MODULE_NAME)) store.unregisterModule(SERVICE_APP_STORE_MODULE_NAME)
    })

    const {
      fetchMissionServices,
      tableColumnsServices,
      refMissionServicesListTable,
      refetchData,
    } = useMissionsView()
    return {
      fetchMissionServices,
      tableColumnsServices,
      refMissionServicesListTable,
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
