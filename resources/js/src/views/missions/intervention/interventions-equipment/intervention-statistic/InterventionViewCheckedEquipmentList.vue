<template>
  <b-sidebar
    id="checked-equipment-list-sidebar"
    :visible="isCheckedEquipmentListSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    width="100%"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-checked-equipment-list-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Checked Equipment List
        </h5>
        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>
      <!-- BODY -->
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
              </div>
            </b-col>
          </b-row>

        </div>

        <b-table
        ref="refCheckedEquipmentsListTable"
    class="position-relative"
    :items="fetchCheckedEquipments"
    responsive
    striped
    :fields="tableColumnsCheckedEquipments"
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
              {{ data.item.area_id }}
              <small class="text-muted">{{ data.item.area_id }}</small>
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
          <!-- Column: Verification -->
          <template #cell(verification)="data">
            <b-form-checkbox
              v-model="data.item.equipment_verification"
              class="custom-control-success"
              name="check-button"
              switch
              disabled
            >
              <span class="switch-icon-left">
                <feather-icon icon="CheckIcon" />
              </span>
              <span class="switch-icon-right">
                <feather-icon icon="CheckIcon" />
              </span>
            </b-form-checkbox>
          </template>
          <!-- Column: Azote -->
          <template #cell(azote)="data">
            <b-form-checkbox
              v-model="data.item.azote_recharged"
              class="custom-control-success"
              name="check-button"
              switch
              disabled
            >
              <span class="switch-icon-left">
                <feather-icon icon="CheckIcon" />
              </span>
              <span class="switch-icon-right">
                <feather-icon icon="CheckIcon" />
              </span>
            </b-form-checkbox>
          </template>
          <!-- Column: Verification -->
          <template #cell(raw_material)="data">
            <b-form-checkbox
              v-model="data.item.raw_material_recharged"
              class="custom-control-success"
              name="check-button"
              switch
              disabled
            >
              <span class="switch-icon-left">
                <feather-icon icon="CheckIcon" />
              </span>
              <span class="switch-icon-right">
                <feather-icon icon="CheckIcon" />
              </span>
            </b-form-checkbox>
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
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BPagination,
} from 'bootstrap-vue'
import { onUnmounted } from '@vue/composition-api'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import useEquipmentsView from './useCheckedEquipmentsView'
import interventionStoreModule from '../../interventionStoreModule'

export default {
  components: {
    BSidebar,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BPagination,
    vSelect,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isCheckedEquipmentListSidebarActive',
    event: 'update:is-checked-equipment-list-sidebar-active',
  },
  props: {
    isCheckedEquipmentListSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const INTERVENTION_APP_STORE_MODULE_NAME = 'app-intervention'

    // Register module
    if (!store.hasModule(INTERVENTION_APP_STORE_MODULE_NAME)) store.registerModule(INTERVENTION_APP_STORE_MODULE_NAME, interventionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INTERVENTION_APP_STORE_MODULE_NAME)) store.unregisterModule(INTERVENTION_APP_STORE_MODULE_NAME)
    })

    const {
    //   interventionData,
    //   checkedEquipmentData,
      fetchCheckedEquipments,
      //   attachEquipment,
      //   fetchCheckedEquipment,
      refCheckedEquipmentsListTable,
      //   refetchEquipmentData,
      //   removeCheckedEquipment,
      tableColumnsCheckedEquipments,
      perPage,
      currentPage,
      totalEquipments,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
    } = useEquipmentsView()
    return {
      fetchCheckedEquipments,
      //   fetchCheckedEquipment,
      //   interventionData,
      tableColumnsCheckedEquipments,
      refCheckedEquipmentsListTable,
      //   refetchEquipmentData,
      //   removeCheckedEquipment,
      //   checkedEquipmentData,
      //   attachEquipment,
      //   onSubmit,
      perPage,
      currentPage,
      totalEquipments,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
    }
  },
}
</script>

  <style lang="scss">
      @import '~@resources/scss/vue/libs/vue-select.scss';
      @import '~@resources/scss/vue/libs/vue-flatpicker.scss';

  #is-checked-equipment-list-sidebar-active {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
