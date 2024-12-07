<template>

  <div>
    <park-view-add-new-equipment
      :is-add-new-park-equipment-sidebar-active.sync="isAddNewParkEquipmentSidebarActive"
      :fixation-options="fixationOptions"
      :pressure-options="pressureOptions"
      :accessories-options="accessoriesOptions"
      :sign-options="signOptions"
      :ce-options="ceOptions"
      @refetch-equipment-data="refetchEquipmentData"
    />
    <park-view-update-equipment
      :is-update-park-equipment-sidebar-active.sync="isUpdateParkEquipmentSidebarActive"
      :park-equipment-data="parkEquipmentData"
      :fixation-options="fixationOptions"
      :pressure-options="pressureOptions"
      :accessories-options="accessoriesOptions"
      :sign-options="signOptions"
      :ce-options="ceOptions"
      @refetch-equipment-data="refetchEquipmentData"
      @submit="onSubmit"
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
                @click="isAddNewParkEquipmentSidebarActive = true"
              >
                <span class="text-nowrap">Add Equipment</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="refParkEquipmentsListTable"
        class="position-relative"
        :items="fetchParkEquipments"
        responsive
        :fields="tableColumnsEquipments"
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
        <!-- Column: area -->
        <template #cell(area)="data">
          <b-media vertical-align="center">
            <b-link
              :to="{ name: 'inventory-life-sheet-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.equipment_area_description }}
            </b-link>
            <small class="text-muted">{{ data.item.equipment_area }}</small>
          </b-media>
        </template>
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
            <b-dropdown-item>
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>
            <b-dropdown-item
              @click="isUpdateParkEquipmentSidebarActive = true,
                      fetchParkEquipment(data.item.id)"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
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
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BDropdown,
  BDropdownItem,
  BPagination,
  BLink,
  BMedia,
  BAvatar,
  BFormRating,
} from 'bootstrap-vue'
import router from '@/router'
import store from '@/store'
import vSelect from 'vue-select'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useEquipmentsView from './useEquipmentsView'
import parkStoreModule from '../../parkStoreModule'
import useParksOptions from '../../useParksOptions'
import ParkViewAddNewEquipment from './ParkViewAddNewEquipment.vue'
import ParkViewUpdateEquipment from './ParkViewUpdateEquipment.vue'
// import ParksListFilters from './ParksListFilters.vue'

export default {
  components: {
    ParkViewAddNewEquipment,
    ParkViewUpdateEquipment,
    // ParksListFilters,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BDropdown,
    BDropdownItem,
    BPagination,
    vSelect,
    BLink,
    BMedia,
    BAvatar,
    BFormRating,
  },

  setup() {
    const PARK_APP_STORE_MODULE_NAME = 'app-park'

    // Register module
    if (!store.hasModule(PARK_APP_STORE_MODULE_NAME)) store.registerModule(PARK_APP_STORE_MODULE_NAME, parkStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PARK_APP_STORE_MODULE_NAME)) store.unregisterModule(PARK_APP_STORE_MODULE_NAME)
    })
    const isAddNewParkEquipmentSidebarActive = ref(false)
    const isUpdateParkEquipmentSidebarActive = ref(false)

    const toast = useToast()
    const {
      fixationOptions,
      pressureOptions,
      accessoriesOptions,
      ceOptions,
      signOptions,
    } = useParksOptions()

    const {
      parkEquipmentData,
      fetchParkEquipments,
      fetchParkEquipment,
      tableColumnsEquipments,
      refParkEquipmentsListTable,
      refetchEquipmentData,
      removeParkEquipment,
      perPage,
      currentPage,
      totalEquipments,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
    } = useEquipmentsView()

    const onSubmit = () => {
      store
        .dispatch('app-park/updateParkEquipment', { parkEquipmentData: parkEquipmentData.value, id: router.currentRoute.params.id, idloc: parkEquipmentData.value.id })
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
      isAddNewParkEquipmentSidebarActive,
      isUpdateParkEquipmentSidebarActive,

      fetchParkEquipments,
      fetchParkEquipment,
      tableColumnsEquipments,
      refParkEquipmentsListTable,
      refetchEquipmentData,
      removeParkEquipment,
      parkEquipmentData,
      avatarText,
      onSubmit,
      perPage,
      currentPage,
      totalEquipments,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,

      //   options
      fixationOptions,
      pressureOptions,
      accessoriesOptions,
      ceOptions,
      signOptions,

    }
  },
}
</script>

      <style lang="scss" scoped>
      .per-page-selector {
        width: 90px;
      }
      </style>
