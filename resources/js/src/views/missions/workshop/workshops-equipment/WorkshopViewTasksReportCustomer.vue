<template>

  <div>
    <equipment-view-update-task
      :is-equipment-view-update-task-sidebar-active.sync="isEquipmentViewUpdateTaskSidebarActive"
      :equipment-tasks-data="equipmentTasksData"
      @refetch-tasks-data="refetchTasksData"
      @submit="onSubmit"
    />
    <modal-tasks-view
      :equipment-tasks-data="equipmentTasksData"
    />
    <!-- Table search Card -->
    <b-card
      class="mb-0"
    >
      <b-table
        ref="refEquipmentTasksListTable"
        class="position-relative"
        :items="fetchWorkshopTasks"
        responsive
        striped
        :fields="tableColumnsTasksReportCustomer"
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
              class="font-weight-bold d-block text-nowrap"
              @click="isEquipmentViewUpdateTaskSidebarActive = true,
                      fetchEquipmentTasks(data.item.id)"
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
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.area_id }}
            </b-link>
            <small class="text-muted">{{ data.item.park_id }}</small>
          </b-media>
        </template>
        <!-- Column: equipment -->
        <template #cell(equipment)="data">
          <b-media vertical-align="center">
            <b-link
              class="font-weight-bold d-block text-nowrap"
              @click="isEquipmentViewUpdateTaskSidebarActive = true,
                      fetchEquipmentTasks(data.item.id)"
            >
              {{ data.item.equipment_category }}
            </b-link>
            <small>{{ data.item.equipment_model }} - {{ data.item.equipment_weight }} - {{ data.item.equipment_pressure }}</small>
          </b-media>
        </template>
        <!-- Column: verification -->
        <template #cell(verification)="data">
          <b-form-checkbox
            v-if="data.item.equipment_verification === '1'"
            checked="true"
            class="custom-control-primary"
            name="check-button"
            disabled
          />
        </template>
        <!-- Column: azote -->
        <template #cell(azote)="data">
          <b-form-checkbox
            v-if="data.item.azote_recharged === '1'"
            checked="true"
            class="custom-control-primary"
            name="check-button"
            disabled
          />
        </template>
        <!-- Column: raw_material -->
        <template #cell(raw_material)="data">
          <b-form-checkbox
            v-if="data.item.raw_material_recharged === '1'"
            checked="true"
            class="custom-control-primary"
            name="check-button"
            disabled
          />
        </template>
        <!-- Column: equipment_workshop_status -->
        <template #cell(equipment_workshop_status)="data">
          <b-link
            class="font-weight-bold d-block text-nowrap"
          >
            {{ data.item.equipment_workshop_status }}
          </b-link>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            md="4"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
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
          <b-col
            cols="12"
            sm="4"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="4"
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
  BFormCheckbox,
  BRow,
  BCol,
  BTable,
  BMedia,
  //   BAvatar,
  BLink,
  BPagination,
//   BDropdown,
//   BDropdownItem,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import router from '@/router'
// import 'animate.css'
// import { useToast } from 'vue-toastification/composition'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import Ripple from 'vue-ripple-directive'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useTasksView from './useTasksView'
import workshopStoreModule from '../workshopStoreModule'
import useEquipmentOptions from '../useEquipmentOptions'
import EquipmentViewUpdateTask from './EquipmentViewUpdateTask.vue'
import ModalTasksView from './ModalTasksView.vue'

export default {
  components: {
    EquipmentViewUpdateTask,
    ModalTasksView,
    BCard,
    BFormCheckbox,
    BRow,
    BCol,
    BTable,
    BMedia,
    // BAvatar,
    BLink,
    BPagination,
    // BDropdown,
    // BDropdownItem,
    vSelect,
  },
  directives: {
    Ripple,
  },
  methods: {
    updateSearchQuery(query) {
      this.searchQuery = query // Update the searchQuery when the event is emitted
    },
  },
  setup() {
    const WORKSHOP_APP_STORE_MODULE_NAME = 'app-workshop'

    // Register module
    if (!store.hasModule(WORKSHOP_APP_STORE_MODULE_NAME)) store.registerModule(WORKSHOP_APP_STORE_MODULE_NAME, workshopStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(WORKSHOP_APP_STORE_MODULE_NAME)) store.unregisterModule(WORKSHOP_APP_STORE_MODULE_NAME)
    })

    const isEquipmentViewUpdateTaskSidebarActive = ref(false)

    // const toast = useToast()

    const {
      tasksData,
      equipmentTasksData,
      fetchWorkshopTasks,
      fetchEquipmentTasks,
      removeEquipmentTasks,
      tableColumnsTasksReportCustomer,
      refetchTasksData,
      refEquipmentTasksListTable,
      perPage,
      currentPage,
      totalEquipments,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
    } = useTasksView()

    const toast = useToast()
    const onSubmit = () => {
      store
        .dispatch('app-workshop/updateEquipmentTasks', { equipmentTasksData: equipmentTasksData.value, id: router.currentRoute.params.id, idloc: equipmentTasksData.value.id })
        .then(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              text: 'Tasks successfully updated!',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
    }
    const {
      areaOptions,
      categoryOptions,
    } = useEquipmentOptions()

    return {
      // Sidebar
      isEquipmentViewUpdateTaskSidebarActive,
      tasksData,
      onSubmit,
      equipmentTasksData,
      fetchWorkshopTasks,
      fetchEquipmentTasks,
      removeEquipmentTasks,
      tableColumnsTasksReportCustomer,
      refetchTasksData,
      refEquipmentTasksListTable,
      perPage,
      currentPage,
      totalEquipments,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      avatarText,
      // Extra Options
      areaOptions,
      categoryOptions,
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
