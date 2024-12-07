<template>

  <div>

    <customer-edit-add-new-order
      :is-add-new-customer-order-sidebar-active.sync="isAddNewCustomerOrderSidebarActive"
      :status-options="statusOptions"
      :sending-type-options="sendingTypeOptions"
      @refetch-order-data="refetchOrderData"
    />
    <customer-edit-update-order
      :is-update-customer-order-sidebar-active.sync="isUpdateCustomerOrderSidebarActive"
      :customer-order-data="customerOrderData"
      :sending-type-options="sendingTypeOptions"
      :status-options="statusOptions"
      @refetch-order-data="refetchOrderData"
      @submit="onSubmit"
    />
    <customer-edit-modal-order-view
      :customer-data="customerData"
      :customer-order-data="customerOrderData"
    />
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          />
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">

              <b-button
                variant="primary"
                @click="isAddNewCustomerOrderSidebarActive = true"
              >
                <span class="text-nowrap">Add Order</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

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
        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item
              v-b-modal.modal-order-view
              @click="fetchCustomerOrder(data.item.id)"
            >
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>
            <b-dropdown-item
              @click="isUpdateCustomerOrderSidebarActive = true,
                      fetchCustomerOrder(data.item.id)"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="removeCustomerOrder(data.item.id)"
            >
              <feather-icon
                icon="TrashIcon"
                class="cursor-pointer"
              />
              <span class="align-middle ml-50 ">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BTable,
  BDropdown,
  BDropdownItem,
  BBadge,
} from 'bootstrap-vue'
import router from '@/router'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useCustomersEdit from '../useCustomersEdit'
import orderStoreModule from './orderStoreModule'
import useCustomersOptions from '../../useCustomersOptions'
import CustomerEditAddNewOrder from './CustomerEditAddNewOrder.vue'
import CustomerEditUpdateOrder from './CustomerEditUpdateOrder.vue'
import CustomerEditModalOrderView from './CustomerEditModalOrderView.vue'

export default {
  components: {
    CustomerEditAddNewOrder,
    CustomerEditUpdateOrder,
    CustomerEditModalOrderView,

    BCard,
    BRow,
    BCol,
    BButton,
    BTable,
    BDropdown,
    BDropdownItem,
    BBadge,
  },
  props: {
    customerData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const ORDER_APP_STORE_MODULE_NAME = 'app-order'

    // Register module
    if (!store.hasModule(ORDER_APP_STORE_MODULE_NAME)) store.registerModule(ORDER_APP_STORE_MODULE_NAME, orderStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(ORDER_APP_STORE_MODULE_NAME)) store.unregisterModule(ORDER_APP_STORE_MODULE_NAME)
    })
    const isAddNewCustomerOrderSidebarActive = ref(false)
    const isUpdateCustomerOrderSidebarActive = ref(false)

    const toast = useToast()
    const {
      statusOptions,
      sendingTypeOptions,
    } = useCustomersOptions()
    const {
      customerOrderData,
      fetchCustomerOrders,
      fetchCustomerOrder,
      tableColumnsOrders,
      refCustomerOrdersListTable,
      refetchOrderData,
      removeCustomerOrder,
      resolveCustomerPlanVariant,
      resolveCustomerPlanIcon,
      resolveCustomerStatusVariant,
    } = useCustomersEdit()

    const onSubmit = () => {
      store
        .dispatch('app-order/updateCustomerOrder', { customerOrderData: customerOrderData.value, id: router.currentRoute.params.id, idloc: customerOrderData.value.id })
        .then(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              text: 'Form successfully submitted!',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
    }
    return {
      // Sidebar
      isAddNewCustomerOrderSidebarActive,
      isUpdateCustomerOrderSidebarActive,

      fetchCustomerOrders,
      fetchCustomerOrder,
      tableColumnsOrders,
      refCustomerOrdersListTable,
      refetchOrderData,
      removeCustomerOrder,
      customerOrderData,
      avatarText,
      onSubmit,

      // UI
      resolveCustomerPlanVariant,
      resolveCustomerPlanIcon,
      resolveCustomerStatusVariant,
      // Options
      statusOptions,
      sendingTypeOptions,

    }
  },
}
</script>

  <style lang="scss" scoped>
  .per-page-selector {
    width: 90px;
  }
  </style>
