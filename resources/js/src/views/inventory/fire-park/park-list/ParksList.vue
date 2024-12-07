<template>

  <div>

    <park-list-add-new
      :is-add-new-park-sidebar-active.sync="isAddNewParkSidebarActive"
      :status-options="statusOptions"
      :customers-data="customersData"
      @refetch-data="refetchData"
    />

    <!-- Filters -->
    <parks-list-filters
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
              <!-- <b-button
                variant="primary"
                @click="isAddNewParkSidebarActive = true"
              >
                <span class="text-nowrap">Add Park</span>
              </b-button> -->
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refParkListTable"
        class="position-relative"
        :items="fetchParks"
        :fields="tableColumns"
        responsive
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- Column: Id -->
        <template #cell(park_location_id)="data">
          <b-link
            :to="{ name: 'inventory-fire-park-view', params: { id: data.item.id }}"
            class="font-weight-bold"
          >
            #{{ data.value }}
          </b-link>
        </template>
        <!-- Column: Customer -->
        <template #cell(customer)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.avatar"
                :text="avatarText(data.item.customer_name)"
                :to="{ name: 'inventory-fire-park-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'inventory-fire-park-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.customer_name }}
            </b-link>
            <small class="text-muted">{{ data.item.park_customer_id }}</small>
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
              :to="{ name: 'inventory-fire-park-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.location_address }} {{ data.item.location_postcode }}
            </b-link>
            <small class="text-muted"> {{ data.item.location_city }} {{ data.item.location_country }}</small>
          </b-media>
        </template>
        <!-- Column: created_at -->
        <template #cell(created_at)="data">
          <b-badge variant="light-primary">
            <feather-icon
              icon="CalendarIcon"
              class="mr-25"
            />
            {{ data.value }}
          </b-badge>
        </template>
        <!-- Column: updated_at -->
        <template #cell(updated_at)="data">
          <b-badge variant="light-primary">
            <feather-icon
              icon="CalendarIcon"
              class="mr-25"
            />
            {{ data.value }}
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
            <b-dropdown-item :to="{ name: 'inventory-fire-park-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <!-- <b-dropdown-item :to="{ name: 'parks-park-plan-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item> -->

            <!-- <b-dropdown-item
              @click="removePark(data.item.id)"
            >
              <feather-icon
                icon="TrashIcon"
                class="cursor-pointer"
              />
              <span class="align-middle ml-50 ">Delete</span>
            </b-dropdown-item> -->
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
              :total-rows="totalParks"
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
  BBadge,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BDropdown,
  BDropdownItem,
  BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import useParksList from './useParksList'
import useParksOptions from '../useParksOptions'
import parkStoreModule from '../parkStoreModule'
import ParkListAddNew from './ParkListAddNew.vue'
import ParksListFilters from './ParksListFilters.vue'

export default {
  components: {
    ParkListAddNew,
    ParksListFilters,

    BCard,
    BBadge,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BDropdown,
    BDropdownItem,
    BPagination,

    vSelect,
  },

  setup() {
    const PARK_APP_STORE_MODULE_NAME = 'app-park'

    // Register module
    if (!store.hasModule(PARK_APP_STORE_MODULE_NAME)) store.registerModule(PARK_APP_STORE_MODULE_NAME, parkStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PARK_APP_STORE_MODULE_NAME)) store.unregisterModule(PARK_APP_STORE_MODULE_NAME)
    })

    const isAddNewParkSidebarActive = ref(false)

    const {
      customersData,
      fetchParks,
      tableColumns,
      perPage,
      currentPage,
      totalParks,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refParkListTable,
      refetchData,
      removePark,

      // UI
      resolveParkTypeVariant,
      resolveParkTypeIcon,
      resolveParkStatusVariant,

      // Extra Filters
    //   statusFilter,
    } = useParksList()

    const {
      statusOptions,
    } = useParksOptions()

    return {
      // Sidebar
      isAddNewParkSidebarActive,

      customersData,
      fetchParks,
      tableColumns,
      perPage,
      currentPage,
      totalParks,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refParkListTable,
      refetchData,
      removePark,

      // Filter
      avatarText,

      // UI
      resolveParkTypeVariant,
      resolveParkTypeIcon,
      resolveParkStatusVariant,
      // Extra Options
      statusOptions,

      // Extra Filters
    //   statusFilter,
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
