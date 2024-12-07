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
    <!-- <equipment-view-update-task
      :is-equipment-view-update-task-sidebar-active.sync="isEquipmentViewUpdateTaskSidebarActive"
    /> -->

    <!-- Statistic -->
    <!-- <workshop-statistic-card /> -->
    <!-- Filters -->
    <!-- <equipments-list-filters
      :area-filter.sync="areaFilter"
      :category-filter.sync="categoryFilter"
      :area-options="areaOptions"
      :category-options="categoryOptions"
      @search="updateSearchQuery"
    /> -->
    <b-row class="match-height">
      <b-col
        cols="12"
        md="6"
        align-self="stretch"
      >
        <b-card
          no-body
          class="d-flex flex-column"
        >
          <b-card-body class="d-flex justify-content-center align-items-center flex-grow-1">
            <div>
              <b-button
                v-if="!showDiv"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                class="btn-icon"
                @click="showDiv = true"
              >
                <feather-icon
                  icon="MaximizeIcon"
                  size="100"
                />
              </b-button>
              <div v-if="showDiv">
                <b-button
                  v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                  variant="flat-danger"
                  size="sm"
                  @click="showDiv = false"
                >
                  <feather-icon
                    icon="XIcon"
                    class="mr-50"
                  />
                  <span class="align-middle">hide</span>
                </b-button>

                <p class="error">
                  {{ error }}
                </p>

                <qrcode-stream
                  @decode="onDecode"
                  @init="onInit"
                />
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col
        cols="12"
        md="6"
        align-self="stretch"
      >
        <b-card
          no-body
        >
          <b-card-body class="justify-content-center align-items-center flex-grow-1">
            <div class="align-items-center">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
            </div>
            <div class="align-items-center">
              <!-- <b-button
                variant="primary"
                @click="isAddNewParkEquipmentSidebarActive = true"
              >
                <span class="text-nowrap">Add Equipment</span>
              </b-button> -->
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <!-- Table search Card -->
    <b-card
      v-if="searchQuery !== ''"
      no-body
      class="mb-0"
    >
      <b-table
        ref="refParkEquipmentsListTable"
        class="position-relative"
        :items="fetchParkEquipments"
        responsive
        striped
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
              class="font-weight-bold d-block text-nowrap"
              @click="confirmText(data.item.id)"
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
              />
            </template>
            <b-link
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.equipment_category }}
            </b-link>
            <small>{{ data.item.equipment_model }} - {{ data.item.equipment_weight }} - {{ data.item.equipment_pressure }}</small>
          </b-media>
        </template>
      </b-table>
    </b-card>
    <br>
    <b-row>
      <b-col
        cols="12"
        sm="12"
      >
        <workshop-view-tasks />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  BRow,
  BCol,
  BFormInput,
  //   BFormCheckbox,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  //   BBadge,
  //   BDropdown,
  //   BDropdownItem,
  //   BPagination,
} from 'bootstrap-vue'
// import vSelect from 'vue-select'
import store from '@/store'
import router from '@/router'
import 'animate.css'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import Ripple from 'vue-ripple-directive'
import { QrcodeStream } from 'vue-qrcode-reader'
import useEquipmentsView from './useEquipmentsView'
import parkStoreModule from './parkStoreModule'
import workshopStoreModule from '../workshopStoreModule'
import useEquipmentOptions from '../useEquipmentOptions'
// import EquipmentsListFilters from './EquipmentsListFilters.vue'
import ParkViewAddNewEquipment from '../../../inventory/fire-park/park-view/park-view-equipment/ParkViewAddNewEquipment.vue'
// import EquipmentViewUpdateTask from './EquipmentViewUpdateTask.vue'
import WorkshopViewTasks from './WorkshopViewTasks.vue'
// import EquipmentForm from './EquipmentForm.vue'
// import WorkshopStatisticCard from './workshop-statistic/WorkshopStatisticCard.vue'

export default {
  components: {
    ParkViewAddNewEquipment,
    // EquipmentViewUpdateTask,
    // EquipmentsListFilters,
    // EquipmentForm,
    WorkshopViewTasks,
    // WorkshopStatisticCard,

    BCard,
    BCardBody,
    BRow,
    BCol,
    BFormInput,
    // BFormCheckbox,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    // BBadge,
    // BDropdown,
    // BDropdownItem,
    // BPagination,
    QrcodeStream,

    // vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      error: '',
      showDiv: false,
    }
  },
  methods: {
    updateSearchQuery(query) {
      this.searchQuery = query // Update the searchQuery when the event is emitted
    },
    onDecode(searchQuery) {
      this.$emit('search', searchQuery)
    },
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permission'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
        } else {
          this.error = `ERROR: Camera error (${error.name})`
        }
      }
    },
    // confirm text
    confirmText(dataItemId) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will attach this equipment to this workshop!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Attach it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        showClass: {
          popup: 'animate__animated animate__flipInX',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          //   this.isEquipmentViewUpdateTaskSidebarActive = true
          //   this.isAddNewParkEquipmentSidebarActive = true
          this.attachEquipment(dataItemId)
          this.addNewTasks(dataItemId)
        }
      })
    },
  },

  setup() {
    const PARK_APP_STORE_MODULE_NAME = 'app-park'

    // Register module
    if (!store.hasModule(PARK_APP_STORE_MODULE_NAME)) store.registerModule(PARK_APP_STORE_MODULE_NAME, parkStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PARK_APP_STORE_MODULE_NAME)) store.unregisterModule(PARK_APP_STORE_MODULE_NAME)
    })

    const WORKSHOP_APP_STORE_MODULE_NAME = 'app-workshop'

    // Register module
    if (!store.hasModule(WORKSHOP_APP_STORE_MODULE_NAME)) store.registerModule(WORKSHOP_APP_STORE_MODULE_NAME, workshopStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(WORKSHOP_APP_STORE_MODULE_NAME)) store.unregisterModule(WORKSHOP_APP_STORE_MODULE_NAME)
    })

    const isAddNewParkEquipmentSidebarActive = ref(false)
    // const isEquipmentViewUpdateTaskSidebarActive = ref(false)

    const toast = useToast()
    const attachEquipment = dataItemId => {
      store
        .dispatch('app-workshop/attachEquipment', { id: router.currentRoute.params.id, resources: dataItemId })
        .then(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              text: 'Equipment Successfully Attached!',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
    }
    const addNewTasks = dataItemId => {
      const tasksData = {
        equipment_id: dataItemId,
      }
      store.dispatch('app-workshop/addTasks', { id: router.currentRoute.params.id, tasksData })
        .then(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              text: 'Tasks Successfully Added!',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
    }

    const {
      workshopData,
      parkEquipmentData,
      fetchParkEquipments,
      //   attachEquipment,
      //   fetchParkEquipment,
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
      //  Extra Filters
      areaFilter,
      categoryFilter,
    } = useEquipmentsView()

    const {
      areaOptions,
      categoryOptions,
    } = useEquipmentOptions()

    return {
      // Sidebar
      isAddNewParkEquipmentSidebarActive,
      //   isEquipmentViewUpdateTaskSidebarActive,
      fetchParkEquipments,
      attachEquipment,
      //   fetchParkEquipment,
      workshopData,
      tableColumnsEquipments,
      refParkEquipmentsListTable,
      refetchEquipmentData,
      removeParkEquipment,
      parkEquipmentData,
      avatarText,
      addNewTasks,
      perPage,
      currentPage,
      totalEquipments,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      // Extra Options
      areaOptions,
      categoryOptions,
      // Extra Filters
      areaFilter,
      categoryFilter,
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

<style lang="scss">
@import '~@resources/scss/vue/libs/vue-sweetalert.scss';
</style>
