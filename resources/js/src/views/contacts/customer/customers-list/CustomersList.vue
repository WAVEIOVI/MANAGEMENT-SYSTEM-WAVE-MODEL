<template>

  <div>

    <customer-list-add-new
      :is-add-new-customer-sidebar-active.sync="isAddNewCustomerSidebarActive"
      :type-options="typeOptions"
      :activity-options="activityOptions"
      :status-options="statusOptions"
      :city-options="cityOptions"
      :next-customer-id="nextCustomerId"
      @refetch-data="refetchData"
    />

    <!-- Statistic -->
    <customers-statistic-card />

    <!-- Filters -->
    <customers-list-filters
      :type-filter.sync="typeFilter"
      :activity-filter.sync="activityFilter"
      :status-filter.sync="statusFilter"
      :type-options="typeOptions"
      :activity-options="activityOptions"
      :status-options="statusOptions"
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
          >
            <label>Show</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
              <b-button
                variant="primary"
                @click="isAddNewCustomerSidebarActive = true"
              >
                <span class="text-nowrap">Add Customer</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refCustomerListTable"
        class="position-relative"
        :items="fetchCustomers"
        :fields="tableColumns"
        responsive
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >

        <!-- Column: Customer -->
        <template #cell(customer_name)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.avatar"
                :text="avatarText(data.item.customer_name)"
                :variant="`light-${resolveCustomerTypeVariant(data.item.customer_type)}`"
                :to="{ name: 'contacts-customers-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'contacts-customers-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.customer_name }}
            </b-link>
            <small class="text-muted">{{ data.item.customer_id }}</small>
          </b-media>
        </template>

        <!-- Column: Type -->
        <template #cell(customer_type)="data">
          <div class="text-nowrap">
            <feather-icon
              :icon="resolveCustomerTypeIcon(data.item.customer_type)"
              size="18"
              class="mr-50"
              :class="`text-${resolveCustomerTypeVariant(data.item.customer_type)}`"
            />
            <span class="align-text-top text-capitalize">{{ data.item.customer_type }}</span>
          </div>
        </template>

        <!-- Column: Status -->
        <template #cell(customer_status)="data">
          <b-badge
            pill
            :variant="`light-${resolveCustomerStatusVariant(data.item.customer_status)}`"
            class="text-capitalize"
          >
            {{ data.item.customer_status }}
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
            <b-dropdown-item :to="{ name: 'contacts-customers-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'contacts-customers-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="removeCustomer(data.item.id)"
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
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="totalCustomers"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import useCustomersList from './useCustomersList'
import useCustomersOptions from '../useCustomersOptions'
import customerStoreModule from '../customerStoreModule'
import CustomerListAddNew from './CustomerListAddNew.vue'
import CustomersListFilters from './CustomersListFilters.vue'
import CustomersStatisticCard from './customers-statistic/CustomersStatisticCard.vue'

export default {
  components: {
    CustomerListAddNew,
    CustomersListFilters,
    CustomersStatisticCard,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,

    vSelect,
  },

  setup() {
    const CUSTOMER_APP_STORE_MODULE_NAME = 'app-customer'

    // Register module
    if (!store.hasModule(CUSTOMER_APP_STORE_MODULE_NAME)) store.registerModule(CUSTOMER_APP_STORE_MODULE_NAME, customerStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CUSTOMER_APP_STORE_MODULE_NAME)) store.unregisterModule(CUSTOMER_APP_STORE_MODULE_NAME)
    })

    const isAddNewCustomerSidebarActive = ref(false)

    const {
      fetchCustomers,
      tableColumns,
      perPage,
      currentPage,
      totalCustomers,
      nextCustomerId,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refCustomerListTable,
      refetchData,
      removeCustomer,

      // UI
      resolveCustomerTypeVariant,
      resolveCustomerTypeIcon,
      resolveCustomerStatusVariant,

      // Extra Filters
      typeFilter,
      activityFilter,
      statusFilter,
    } = useCustomersList()

    const {
      typeOptions,
      activityOptions,
      statusOptions,
      cityOptions,
    } = useCustomersOptions()

    return {
      // Sidebar
      isAddNewCustomerSidebarActive,

      fetchCustomers,
      tableColumns,
      perPage,
      currentPage,
      totalCustomers,
      nextCustomerId,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refCustomerListTable,
      refetchData,
      removeCustomer,

      // Filter
      avatarText,

      // UI
      resolveCustomerTypeVariant,
      resolveCustomerTypeIcon,
      resolveCustomerStatusVariant,
      // Extra Options
      typeOptions,
      activityOptions,
      statusOptions,
      cityOptions,

      // Extra Filters
      typeFilter,
      activityFilter,
      statusFilter,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '~@resources/scss/vue/libs/vue-select.scss';
</style>
