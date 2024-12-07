<template>

  <div>

    <report-list-add-new
      :is-add-new-report-sidebar-active.sync="isAddNewReportSidebarActive"
      :status-options="statusOptions"
      :type-options="typeOptions"
      :frequency-options="frequencyOptions"
      :customers-data="customersData"
      @refetch-data="refetchData"
    />

    <!-- Filters -->
    <reports-list-filters
      :status-filter.sync="statusFilter"
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
                @click="isAddNewReportSidebarActive = true"
              >
                <span class="text-nowrap">Add Report</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refReportListTable"
        class="position-relative"
        :items="fetchReports"
        :fields="tableColumns"
        responsive
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- Column: report_id -->
        <template #cell(report_id)="data">
          <b-media vertical-align="center">
            <b-link
              :to="{ name: 'reports-report-plan-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              #{{ data.value }}
            </b-link>
          </b-media>
        </template>
        <!-- Column: Customer -->
        <template #cell(customer)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.avatar"
                :text="avatarText(data.item.customer_name)"
                :to="{ name: 'reports-report-plan-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'reports-report-plan-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.customer_name }}
            </b-link>
            <small class="text-muted">{{ data.item.report_customer_id }}</small>
          </b-media>
        </template>
        <!-- Column: Location -->
        <template #cell(location)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                variant="primary"
              >
                <feather-icon
                  icon="MapPinIcon"
                />
              </b-avatar>
            </template>
            <b-link
              :to="{ name: 'reports-report-plan-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.location_address }} {{ data.item.location_postcode }} {{ data.item.location_city }} {{ data.item.location_country }}
            </b-link>
            <small class="text-muted">{{ data.item.report_location_id }} | {{ data.item.location_description }}</small>
          </b-media>
        </template>
        <!-- Column: report_date -->
        <template #cell(report_date)="data">
          <b-badge variant="light-primary">
            <feather-icon
              icon="CalendarIcon"
              class="mr-25"
            />
            {{ data.value }}
          </b-badge>
        </template>
        <!-- Column: report_status -->
        <template #cell(report_status)="data">
          <b-badge
            pill
            :variant="`light-${resolveReportStatusVariant(data.item.report_status)}`"
            class="text-capitalize"
          >
            {{ data.item.report_status }}
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
            <b-dropdown-item :to="{ name: 'reports-report-plan-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'reports-report-plan-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="removeReport(data.item.id)"
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
              :total-rows="totalReports"
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
import useReportsList from './useReportsList'
import useReportsOptions from '../useReportsOptions'
import reportStoreModule from '../reportStoreModule'
import ReportListAddNew from './ReportListAddNew.vue'
import ReportsListFilters from './ReportsListFilters.vue'

export default {
  components: {
    ReportListAddNew,
    ReportsListFilters,

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
    const REPORT_APP_STORE_MODULE_NAME = 'app-report'

    // Register module
    if (!store.hasModule(REPORT_APP_STORE_MODULE_NAME)) store.registerModule(REPORT_APP_STORE_MODULE_NAME, reportStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(REPORT_APP_STORE_MODULE_NAME)) store.unregisterModule(REPORT_APP_STORE_MODULE_NAME)
    })

    const isAddNewReportSidebarActive = ref(false)

    const {
      customersData,
      fetchReports,
      tableColumns,
      perPage,
      currentPage,
      totalReports,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refReportListTable,
      refetchData,
      removeReport,

      // UI
      resolveReportTypeVariant,
      resolveReportTypeIcon,
      resolveReportStatusVariant,

      // Extra Filters
      statusFilter,
    } = useReportsList()

    const {
      statusOptions,
      typeOptions,
      frequencyOptions,
    } = useReportsOptions()

    return {
      // Sidebar
      isAddNewReportSidebarActive,

      customersData,
      fetchReports,
      tableColumns,
      perPage,
      currentPage,
      totalReports,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refReportListTable,
      refetchData,
      removeReport,

      // Filter
      avatarText,

      // UI
      resolveReportTypeVariant,
      resolveReportTypeIcon,
      resolveReportStatusVariant,
      // Extra Options
      statusOptions,

      // Extra Filters
      statusFilter,
      typeOptions,
      frequencyOptions,
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
