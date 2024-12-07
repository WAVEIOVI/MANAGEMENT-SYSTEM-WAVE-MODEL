<template>

  <div>
    <!-- Table Container Card -->
    <b-card
      no-body
    >
      <b-card-header>
        <b-card-title>Orders List</b-card-title>
      </b-card-header>

      <!-- body -->
      <b-card-body>

        <b-table
          ref="refCustomerOrdersListTable"
          class="position-relative"
          :items="fetchCustomerOrders"
          responsive
          :fields="tableColumnsOrders"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        >
          <!-- Column: Plan -->
          <template #cell(order_plan)="data">
            <div class="text-nowrap">
              <feather-icon
                :icon="resolveCustomerPlanIcon(data.item.order_plan)"
                size="18"
                class="mr-50"
                :class="`text-${resolveCustomerPlanVariant(data.item.order_plan)}`"
              />
              <span class="align-text-top text-capitalize">{{ data.item.order_plan }}</span>
            </div>
          </template>
          <!-- Column: Status -->
          <template #cell(order_status)="data">
            <b-badge
              pill
              :variant="`light-${resolveCustomerStatusVariant(data.item.order_status)}`"
              class="text-capitalize"
            >
              {{ data.item.order_status }}
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
  BCardHeader,
  BCardTitle,
  BCardBody,
  BTable,
  BBadge,
} from 'bootstrap-vue'
import store from '@/store'
import { onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import useCustomersView from './useCustomersView'
import orderStoreModule from '../customers-edit/customer-edit-tab-orders/orderStoreModule'

export default {
  components: {

    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BTable,
    BBadge,
  },
  setup() {
    const ORDER_APP_STORE_MODULE_NAME = 'app-order'

    // Register module
    if (!store.hasModule(ORDER_APP_STORE_MODULE_NAME)) store.registerModule(ORDER_APP_STORE_MODULE_NAME, orderStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(ORDER_APP_STORE_MODULE_NAME)) store.unregisterModule(ORDER_APP_STORE_MODULE_NAME)
    })

    const {
      fetchCustomerOrders,
      fetchCustomerOrder,
      tableColumnsOrders,
      refCustomerOrdersListTable,
      refetchOrderData,
      resolveCustomerStatusVariant,
    } = useCustomersView()

    return {

      fetchCustomerOrders,
      fetchCustomerOrder,
      tableColumnsOrders,
      refCustomerOrdersListTable,
      refetchOrderData,
      avatarText,

      // UI
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
