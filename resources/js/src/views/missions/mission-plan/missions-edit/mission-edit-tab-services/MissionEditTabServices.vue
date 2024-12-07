<template>

  <div>

    <mission-edit-add-new-service
      :is-add-new-mission-service-sidebar-active.sync="isAddNewMissionServiceSidebarActive"
      :service-description-options="serviceDescriptionOptions"
      :opening-options="openingOptions"
      :city-options="cityOptions"
      @refetch-data="refetchData"
    />
    <mission-edit-update-service
      :is-update-mission-service-sidebar-active.sync="isUpdateMissionServiceSidebarActive"
      :mission-service-data="missionServiceData"
      :service-description-options="serviceDescriptionOptions"
      :opening-options="openingOptions"
      :city-options="cityOptions"
      @refetch-data="refetchData"
      @submit="onSubmit"
    />
    <mission-edit-modal-service-view
      :mission-service-data="missionServiceData"
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
                @click="isAddNewMissionServiceSidebarActive = true"
              >
                <span class="text-nowrap">Add Service</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refMissionServicesListTable"
        class="position-relative"
        :items="fetchMissionServices"
        responsive
        :fields="tableColumnsServices"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- A virtual column -->
        <template #cell(index)="data">
          {{ data.index + 1 }}
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
              v-b-modal.modal-service-view
              @click="fetchMissionService(data.item.id)"
            >
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>
            <b-dropdown-item
              @click="isUpdateMissionServiceSidebarActive = true,
                      fetchMissionService(data.item.id)"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="removeMissionService(data.item.id)"
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
} from 'bootstrap-vue'
import router from '@/router'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useMissionsEdit from '../useMissionsEdit'
import serviceStoreModule from './serviceStoreModule'
import useMissionsOptions from '../../useMissionsOptions'
import MissionEditAddNewService from './MissionEditAddNewService.vue'
import MissionEditUpdateService from './MissionEditUpdateService.vue'
import MissionEditModalServiceView from './MissionEditModalServiceView.vue'

export default {
  components: {
    MissionEditAddNewService,
    MissionEditUpdateService,
    MissionEditModalServiceView,

    BCard,
    BRow,
    BCol,
    BButton,
    BTable,
    BDropdown,
    BDropdownItem,
  },

  setup() {
    const SERVICE_APP_STORE_MODULE_NAME = 'app-service'

    // Register module
    if (!store.hasModule(SERVICE_APP_STORE_MODULE_NAME)) store.registerModule(SERVICE_APP_STORE_MODULE_NAME, serviceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(SERVICE_APP_STORE_MODULE_NAME)) store.unregisterModule(SERVICE_APP_STORE_MODULE_NAME)
    })
    const isAddNewMissionServiceSidebarActive = ref(false)
    const isUpdateMissionServiceSidebarActive = ref(false)

    const toast = useToast()
    const {
      openingOptions,
      serviceDescriptionOptions,
      cityOptions,
    } = useMissionsOptions()

    const {
      missionServiceData,
      fetchMissionServices,
      fetchMissionService,
      tableColumnsServices,
      refMissionServicesListTable,
      refetchData,
      removeMissionService,
    } = useMissionsEdit()

    const onSubmit = () => {
      store
        .dispatch('app-service/updateMissionService', { missionServiceData: missionServiceData.value, id: router.currentRoute.params.id, idloc: missionServiceData.value.id })
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
      isAddNewMissionServiceSidebarActive,
      isUpdateMissionServiceSidebarActive,

      fetchMissionServices,
      fetchMissionService,
      tableColumnsServices,
      refMissionServicesListTable,
      refetchData,
      removeMissionService,
      missionServiceData,
      avatarText,
      onSubmit,

      //   options
      openingOptions,
      serviceDescriptionOptions,
      cityOptions,

    }
  },
}
</script>

  <style lang="scss" scoped>
  .per-page-selector {
    width: 90px;
  }
  </style>
