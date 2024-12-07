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
    <!-- <intervention-statistic-card /> -->
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
              <!-- Search -->
              <b-input-group>
                <b-form-input
                  v-model="searchQuery"
                  placeholder="Search..."
                />
                <b-input-group-append>
                  <b-button
                    v-b-modal.modal-equipment-search
                    variant="outline-primary"
                    @click="fetchSearchParkEquipments()"
                  >
                    <feather-icon icon="SearchIcon" />
                  </b-button>
                </b-input-group-append>
              </b-input-group>
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
        <intervention-view-tasks
          ref="interventionViewTasks"
        />
        <modal-equipment-search
          :park-search-equipment-data="parkSearchEquipmentData"
        />
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
  BInputGroup,
  BInputGroupAppend,
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
import interventionStoreModule from '../interventionStoreModule'
import useEquipmentOptions from '../useEquipmentOptions'
import ModalEquipmentSearch from './ModalEquipmentSearch.vue'
// import EquipmentsListFilters from './EquipmentsListFilters.vue'
import ParkViewAddNewEquipment from '../../../inventory/fire-park/park-view/park-view-equipment/ParkViewAddNewEquipment.vue'
// import EquipmentViewUpdateTask from './EquipmentViewUpdateTask.vue'
import InterventionViewTasks from './InterventionViewTasks.vue'
// import EquipmentForm from './EquipmentForm.vue'
// import InterventionStatisticCard from './intervention-statistic/InterventionStatisticCard.vue'

export default {
  components: {
    ParkViewAddNewEquipment,
    // EquipmentViewUpdateTask,
    // EquipmentsListFilters,
    // EquipmentForm,
    InterventionViewTasks,
    ModalEquipmentSearch,
    // InterventionStatisticCard,

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
    BInputGroup,
    BInputGroupAppend,
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
        text: 'You will attach this equipment to this intervention!',
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
          this.searchQuery = ''
          this.$refs.interventionViewTasks.refetchTasksData()
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

    const INTERVENTION_APP_STORE_MODULE_NAME = 'app-intervention'

    // Register module
    if (!store.hasModule(INTERVENTION_APP_STORE_MODULE_NAME)) store.registerModule(INTERVENTION_APP_STORE_MODULE_NAME, interventionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INTERVENTION_APP_STORE_MODULE_NAME)) store.unregisterModule(INTERVENTION_APP_STORE_MODULE_NAME)
    })

    const isAddNewParkEquipmentSidebarActive = ref(false)
    // const isEquipmentViewUpdateTaskSidebarActive = ref(false)

    const toast = useToast()
    const attachEquipment = dataItemId => {
      store
        .dispatch('app-intervention/attachEquipment', { id: router.currentRoute.params.id, resources: dataItemId })
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
      store.dispatch('app-intervention/addTasks', { id: router.currentRoute.params.id, tasksData })
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
      interventionData,
      parkEquipmentData,
      parkSearchEquipmentData,
      fetchSearchParkEquipments,
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
      fetchSearchParkEquipments,
      attachEquipment,
      //   fetchParkEquipment,
      interventionData,
      tableColumnsEquipments,
      refParkEquipmentsListTable,
      refetchEquipmentData,
      removeParkEquipment,
      parkEquipmentData,
      parkSearchEquipmentData,
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
