<template>

  <div>

    <!-- Table Container Card -->
    <b-card
      no-body
    >
      <b-card-header>
        <b-card-title>Contracts List</b-card-title>
      </b-card-header>

      <!-- body -->
      <b-card-body>

        <b-table
          ref="refCustomerContractsListTable"
          class="position-relative"
          :items="fetchCustomerContracts"
          responsive
          :fields="tableColumnsContracts"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        >
          <!-- Column: Plan -->
          <template #cell(contract_plan)="data">
            <div class="text-nowrap">
              <feather-icon
                :icon="resolveCustomerPlanIcon(data.item.contract_plan)"
                size="18"
                class="mr-50"
                :class="`text-${resolveCustomerPlanVariant(data.item.contract_plan)}`"
              />
              <span class="align-text-top text-capitalize">{{ data.item.contract_plan }}</span>
            </div>
          </template>
          <!-- Column: Status -->
          <template #cell(contract_status)="data">
            <b-badge
              pill
              :variant="`light-${resolveCustomerStatusVariant(data.item.contract_status)}`"
              class="text-capitalize"
            >
              {{ data.item.contract_status }}
            </b-badge>
          </template>
        </b-table>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  BCardHeader,
  BCardTitle,
  BTable,
  BBadge,
} from 'bootstrap-vue'
import store from '@/store'
import { onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import useCustomersView from './useCustomersView'
import contractStoreModule from '../customers-edit/customer-edit-tab-contracts/contractStoreModule'

export default {
  components: {
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    BTable,
    BBadge,
  },
  setup() {
    const CONTRACT_APP_STORE_MODULE_NAME = 'app-contract'

    // Register module
    if (!store.hasModule(CONTRACT_APP_STORE_MODULE_NAME)) store.registerModule(CONTRACT_APP_STORE_MODULE_NAME, contractStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CONTRACT_APP_STORE_MODULE_NAME)) store.unregisterModule(CONTRACT_APP_STORE_MODULE_NAME)
    })

    const {
      fetchCustomerContracts,
      tableColumnsContracts,
      refCustomerContractsListTable,
      refetchContractData,
      resolveCustomerPlanVariant,
      resolveCustomerPlanIcon,
      resolveCustomerStatusVariant,
    } = useCustomersView()

    return {

      fetchCustomerContracts,
      tableColumnsContracts,
      refCustomerContractsListTable,
      refetchContractData,
      avatarText,

      // UI
      resolveCustomerPlanVariant,
      resolveCustomerPlanIcon,
      resolveCustomerStatusVariant,

    }
  },
}
</script>

    <style lang="scss" scoped>
    .per-page-selector {
      width: 90px;
    }
    </style>
