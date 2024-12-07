<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="equipmentData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching equipment data
      </h4>
      <div class="alert-body">
        No equipment found with this equipment id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'contacts-equipments-list'}"
        >
          Equipment List
        </b-link>
        for other equipments.
      </div>
    </b-alert>

    <template v-if="equipmentData">
      <!-- First Row -->
      <b-row class="match-height">
        <b-col
          cols="12"
          lg="5"
          md="5"
          xl="5"
        >
          <equipment-view-equipment-image-card :equipment-data="equipmentData" />
          <equipment-view-equipment-status-card :equipment-data="equipmentData" />
          <equipment-view-equipment-manufacturer-card :equipment-data="equipmentData" />
        </b-col>
        <b-col
          cols="12"
          lg="7"
          md="7"
          xl="7"
        >
          <equipment-view-customer-id-card :equipment-data="equipmentData" />
          <equipment-view-equipment-id-card :equipment-data="equipmentData" />
          <equipment-view-equipment-description-card :equipment-data="equipmentData" />
          <equipment-view-equipment-area-card :equipment-data="equipmentData" />
          <equipment-view-equipment-sign-fixation-accessories-card :equipment-data="equipmentData" />
        </b-col>
      </b-row>
      <div class="group-area mt-1">
        <h6>Schedule</h6>
        <hr>
      </div>
      <b-row class="match-height">
        <equipment-view-equipment-warranty-card
          :equipment-data="equipmentData"
          :equipment-tasks-data="equipmentTasksData"
        />
      </b-row>
      <div class="group-area mt-1">
        <h6>Historic</h6>
        <hr>
      </div>
      <b-row class="match-height">
        <b-col
          cols="12"
          lg="12"
          md="12"
          xl="12"
        >
          <equipment-view-equipment-historic-card
            :equipment-data="equipmentData"
            :tasks-historic-data="tasksHistoricData"
          />
        </b-col>
      </b-row>
    </template>

  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'
import equipmentStoreModule from '../equipmentStoreModule'
import EquipmentViewEquipmentImageCard from './EquipmentViewEquipmentImageCard.vue'
import EquipmentViewCustomerIdCard from './EquipmentViewCustomerIdCard.vue'
import EquipmentViewEquipmentIdCard from './EquipmentViewEquipmentIdCard.vue'
import EquipmentViewEquipmentDescriptionCard from './EquipmentViewEquipmentDescriptionCard.vue'
import EquipmentViewEquipmentAreaCard from './EquipmentViewEquipmentAreaCard.vue'
import EquipmentViewEquipmentSignFixationAccessoriesCard from './EquipmentViewEquipmentSignFixationAccessoriesCard.vue'
import EquipmentViewEquipmentStatusCard from './EquipmentViewEquipmentStatusCard.vue'
import EquipmentViewEquipmentManufacturerCard from './EquipmentViewEquipmentManufacturerCard.vue'
import EquipmentViewEquipmentWarrantyCard from './EquipmentViewEquipmentWarrantyCard.vue'
import EquipmentViewEquipmentHistoricCard from './EquipmentViewEquipmentHistoricCard.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,

    // Local Components
    EquipmentViewEquipmentImageCard,
    EquipmentViewCustomerIdCard,
    EquipmentViewEquipmentIdCard,
    EquipmentViewEquipmentDescriptionCard,
    EquipmentViewEquipmentAreaCard,
    EquipmentViewEquipmentSignFixationAccessoriesCard,
    EquipmentViewEquipmentStatusCard,
    EquipmentViewEquipmentManufacturerCard,
    EquipmentViewEquipmentWarrantyCard,
    EquipmentViewEquipmentHistoricCard,

    // InvoiceList,
  },
  setup() {
    const equipmentData = ref(null)
    const equipmentTasksData = ref(null)
    const tasksHistoricData = ref(null)

    const EQUIPMENT_APP_STORE_MODULE_NAME = 'app-equipment'

    // Register module
    if (!store.hasModule(EQUIPMENT_APP_STORE_MODULE_NAME)) store.registerModule(EQUIPMENT_APP_STORE_MODULE_NAME, equipmentStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(EQUIPMENT_APP_STORE_MODULE_NAME)) store.unregisterModule(EQUIPMENT_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-equipment/fetchEquipment', { id: router.currentRoute.params.id })
      .then(response => { equipmentData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          equipmentData.value = undefined
        }
      })
    store.dispatch('app-equipment/fetchEquipmentTasks', { id: router.currentRoute.params.id })
      .then(response => {
        if (response.data.data.length > 0) {
          // Get the last record from the array
          const lastTask = response.data.data[response.data.data.length - 1]
          equipmentTasksData.value = lastTask
        } else {
          equipmentTasksData.value = undefined // No tasks found
        }
      })
      .catch(error => {
        if (error.response.status === 404) {
          equipmentTasksData.value = undefined
        }
      })

    store.dispatch('app-equipment/fetchEquipmentTasks', { id: router.currentRoute.params.id })
      .then(response => { tasksHistoricData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          tasksHistoricData.value = undefined
        }
      })

    return {
      equipmentData,
      equipmentTasksData,
      tasksHistoricData,
    }
  },
}
</script>

<style>

</style>
