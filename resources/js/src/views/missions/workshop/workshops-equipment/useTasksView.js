import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'
// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useTasksView() {
  // Use toast
  const toast = useToast()

  // ------------------------------------------------
  // Tap Equipments
  // ------------------------------------------------
  const perPage = ref(5)
  const totalEquipments = ref(null)
  const currentPage = ref(1)
  const perPageOptions = [5, 10, 15, 25, 50, 100]
  const searchQuery = ref('')
  //   const areaFilter = ref(null)
  //   const categoryFilter = ref(null)
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)

  const equipmentTasksData = ref(null)
  const refEquipmentTasksListTable = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refEquipmentTasksListTable.value ? refEquipmentTasksListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalEquipments.value,
    }
  })
  const tableColumnsTasks = [
    { key: 'equipment_id', label: 'Equipment ID' },
    { key: 'area', label: 'Area' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'verification', label: 'VER' },
    { key: 'azote', label: 'N' },
    { key: 'raw_material', label: 'Raw Material' },
    { key: 'equipment_workshop_status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]
  const tableColumnsTasksReportCustomer = [
    { key: 'equipment_id', label: 'Equipment ID' },
    { key: 'area', label: 'Area' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'verification', label: 'VER' },
    { key: 'azote', label: 'N' },
    { key: 'raw_material', label: 'Raw Material' },
    { key: 'equipment_workshop_status', label: 'Status' },
  ]

  const refetchTasksData = () => {
    refEquipmentTasksListTable.value.refresh()
  }
  watch([currentPage, perPage, searchQuery], () => {
    refetchTasksData()
  })
  // ------------------------------------------------
  // Tap Equipments : Fetch Park Workshop
  // ------------------------------------------------

  const fetchWorkshopTasks = (ctx, callback) => {
    store
      .dispatch('app-workshop/fetchWorkshopTasks', {
        queryParams: {
          search: searchQuery.value,
          limit: perPage.value,
          page: currentPage.value,
        },
        id: router.currentRoute.params.id,
      })
      .then(response => {
        console.log(response)
        console.log(response.config)
        const { data } = response.data
        const { total } = response.data.meta
        callback(data)
        totalEquipments.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching customers list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // ------------------------------------------------
  // Tap Contracts : Fetch Equipment Tasks
  // ------------------------------------------------
  const fetchEquipmentTasks = dataItemId => {
    store.dispatch('app-workshop/fetchEquipmentTasks', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        equipmentTasksData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          equipmentTasksData.value = undefined
        }
      })
  }
  // ------------------------------------------------
  // Tap Equipments : remove Park Equipment
  // ------------------------------------------------
  const removeEquipmentTasks = dataItemId => {
    store
      .dispatch('app-workshop/removeEquipmentTasks', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(() => {
        refetchTasksData()
      })
  }
  return {

    fetchWorkshopTasks,
    fetchEquipmentTasks,
    removeEquipmentTasks,
    tableColumnsTasks,
    tableColumnsTasksReportCustomer,
    refetchTasksData,
    refEquipmentTasksListTable,
    equipmentTasksData,
    perPage,
    currentPage,
    totalEquipments,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
  }
}
