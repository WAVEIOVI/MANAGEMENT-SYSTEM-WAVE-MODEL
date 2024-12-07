<template>

  <div>

    <customer-edit-add-new-contract
      :is-add-new-customer-contract-sidebar-active.sync="isAddNewCustomerContractSidebarActive"
      :plan-options="planOptions"
      :payment-method-options="paymentMethodOptions"
      :payment-deadline-options="paymentDeadlineOptions"
      :exclusivity-clause="exclusivityClause"
      :status-options="statusOptions"
      @refetch-contract-data="refetchContractData"
    />
    <customer-edit-update-contract
      :is-update-customer-contract-sidebar-active.sync="isUpdateCustomerContractSidebarActive"
      :customer-contract-data="customerContractData"
      :plan-options="planOptions"
      :payment-method-options="paymentMethodOptions"
      :payment-deadline-options="paymentDeadlineOptions"
      :exclusivity-clause="exclusivityClause"
      :status-options="statusOptions"
      @refetch-contract-data="refetchContractData"
      @submit="onSubmit"
    />
    <customer-edit-modal-contract-view
      :customer-data="customerData"
      :customer-contract-data="customerContractData"
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
                @click="isAddNewCustomerContractSidebarActive = true"
              >
                <span class="text-nowrap">Add Contract</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

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
              v-b-modal.modal-contract-view
              @click="fetchCustomerContract(data.item.id)"
            >
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>
            <b-dropdown-item
              @click="isUpdateCustomerContractSidebarActive = true,
                      fetchCustomerContract(data.item.id)"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="removeCustomerContract(data.item.id)"
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
import contractStoreModule from './contractStoreModule'
import useCustomersOptions from '../../useCustomersOptions'
import CustomerEditAddNewContract from './CustomerEditAddNewContract.vue'
import CustomerEditUpdateContract from './CustomerEditUpdateContract.vue'
import CustomerEditModalContractView from './CustomerEditModalContractView.vue'

export default {
  components: {
    CustomerEditAddNewContract,
    CustomerEditUpdateContract,
    CustomerEditModalContractView,

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
    const CONTRACT_APP_STORE_MODULE_NAME = 'app-contract'

    // Register module
    if (!store.hasModule(CONTRACT_APP_STORE_MODULE_NAME)) store.registerModule(CONTRACT_APP_STORE_MODULE_NAME, contractStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CONTRACT_APP_STORE_MODULE_NAME)) store.unregisterModule(CONTRACT_APP_STORE_MODULE_NAME)
    })
    const isAddNewCustomerContractSidebarActive = ref(false)
    const isUpdateCustomerContractSidebarActive = ref(false)

    const toast = useToast()
    const {
      planOptions,
      paymentDeadlineOptions,
      paymentMethodOptions,
      exclusivityClause,
      statusOptions,
    } = useCustomersOptions()
    const {
      customerContractData,
      fetchCustomerContracts,
      fetchCustomerContract,
      tableColumnsContracts,
      refCustomerContractsListTable,
      refetchContractData,
      removeCustomerContract,
      resolveCustomerPlanVariant,
      resolveCustomerPlanIcon,
      resolveCustomerStatusVariant,
    } = useCustomersEdit()

    const onSubmit = () => {
      store
        .dispatch('app-contract/updateCustomerContract', { customerContractData: customerContractData.value, id: router.currentRoute.params.id, idloc: customerContractData.value.id })
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
      isAddNewCustomerContractSidebarActive,
      isUpdateCustomerContractSidebarActive,

      fetchCustomerContracts,
      fetchCustomerContract,
      tableColumnsContracts,
      refCustomerContractsListTable,
      refetchContractData,
      removeCustomerContract,
      customerContractData,
      avatarText,
      onSubmit,

      // UI
      resolveCustomerPlanVariant,
      resolveCustomerPlanIcon,
      resolveCustomerStatusVariant,
      // Options
      planOptions,
      paymentDeadlineOptions,
      paymentMethodOptions,
      exclusivityClause,
      statusOptions,

    }
  },
}
</script>

    <style lang="scss" scoped>
    .per-page-selector {
      width: 90px;
    }
    </style>
