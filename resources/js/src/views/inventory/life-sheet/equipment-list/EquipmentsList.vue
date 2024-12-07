<template>

  <div>

    <equipment-list-add-new
      :is-add-new-equipment-sidebar-active.sync="isAddNewEquipmentSidebarActive"
      :type-options="typeOptions"
      :activity-options="activityOptions"
      :status-options="statusOptions"
      :city-options="cityOptions"
      @refetch-data="refetchData"
    />

    <!-- Filters -->
    <equipments-list-filters
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
              <!-- <b-button
                variant="primary"
                @click="isAddNewEquipmentSidebarActive = true"
              >
                <span class="text-nowrap">Add Equipment</span>
              </b-button> -->
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refEquipmentListTable"
        class="position-relative"
        :items="fetchEquipments"
        :fields="tableColumns"
        responsive
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- Column: equipment_id -->
        <template #cell(equipment_id)="data">
          <b-media vertical-align="center">
            <b-link
              :to="{ name: 'inventory-life-sheet-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.qrc_id }}
            </b-link>
            <small class="text-muted">{{ data.item.internal_id }}</small>
          </b-media>
        </template>
        <!-- Column: customer -->
        <template #cell(customer)="data">
          <b-media vertical-align="center">
            <!-- <template #aside>
              <b-avatar
                size="32"
                :text="avatarText(data.item.customer_name)"
                :to="{ name: 'inventory-fire-park-view', params: { id: data.item.id } }"
              />
            </template> -->
            <b-link
              :to="{ name: 'inventory-fire-park-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.customer_name }}
            </b-link>
            <small class="text-muted">{{ data.item.park_customer_id }}</small>
          </b-media>
        </template>
        <!-- Column: Park -->
        <template #cell(park)="data">
          <b-media vertical-align="center">
            <b-link
              :to="{ name: 'missions-mission-plan-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.park_park_id }}
            </b-link>
          </b-media>
        </template>
        <!-- Column: area -->
        <!-- <template #cell(area)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :text="avatarText(data.item.equipment_area_description)"
                :to="{ name: 'inventory-fire-park-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'inventory-fire-park-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.equipment_area_id }}
            </b-link>
            <small class="text-muted">{{ data.item.equipment_area_description }}</small>
          </b-media>
        </template> -->
        <!-- Column: equipment -->
        <template #cell(equipment)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :text="avatarText(data.item.equipment_category)"
                :to="{ name: 'inventory-life-sheet-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'inventory-life-sheet-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.equipment_category }}
            </b-link>
            <small>{{ data.item.equipment_model }} - {{ data.item.equipment_weight }} - {{ data.item.equipment_pressure }}</small>
          </b-media>
        </template>
        <!-- Column: equipment_status -->
        <template #cell(equipment_status)="data">
          <b-form-rating
            v-model="data.item.equipment_status"
            size="sm"
            readonly
            no-border
            disabled
          />
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
            <b-dropdown-item :to="{ name: 'contacts-customers-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="removeParkEquipment(data.item.id)"
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
              :total-rows="totalEquipments"
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
  //   BButton,
  BTable,
  BDropdown,
  BDropdownItem,
  BPagination,
  BLink,
  BMedia,
  BAvatar,
  BFormRating,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import useEquipmentsList from './useEquipmentsList'
import useEquipmentsOptions from '../useEquipmentsOptions'
import equipmentStoreModule from '../equipmentStoreModule'
import EquipmentListAddNew from './EquipmentListAddNew.vue'
import EquipmentsListFilters from './EquipmentsListFilters.vue'

export default {
  components: {
    EquipmentListAddNew,
    EquipmentsListFilters,

    BCard,
    BRow,
    BCol,
    BFormInput,
    // BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BFormRating,

    vSelect,
  },

  setup() {
    const EQUIPMENT_APP_STORE_MODULE_NAME = 'app-equipment'

    // Register module
    if (!store.hasModule(EQUIPMENT_APP_STORE_MODULE_NAME)) store.registerModule(EQUIPMENT_APP_STORE_MODULE_NAME, equipmentStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(EQUIPMENT_APP_STORE_MODULE_NAME)) store.unregisterModule(EQUIPMENT_APP_STORE_MODULE_NAME)
    })

    const isAddNewEquipmentSidebarActive = ref(false)

    const {
      fetchEquipments,
      tableColumns,
      perPage,
      currentPage,
      totalEquipments,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refEquipmentListTable,
      refetchData,
      removeEquipment,

      // UI
      resolveEquipmentTypeVariant,
      resolveEquipmentTypeIcon,
      resolveEquipmentStatusVariant,

      // Extra Filters
      typeFilter,
      activityFilter,
      statusFilter,
    } = useEquipmentsList()

    const {
      typeOptions,
      activityOptions,
      statusOptions,
      cityOptions,
    } = useEquipmentsOptions()

    return {
      // Sidebar
      isAddNewEquipmentSidebarActive,

      fetchEquipments,
      tableColumns,
      perPage,
      currentPage,
      totalEquipments,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refEquipmentListTable,
      refetchData,
      removeEquipment,

      // Filter
      avatarText,

      // UI
      resolveEquipmentTypeVariant,
      resolveEquipmentTypeIcon,
      resolveEquipmentStatusVariant,
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
