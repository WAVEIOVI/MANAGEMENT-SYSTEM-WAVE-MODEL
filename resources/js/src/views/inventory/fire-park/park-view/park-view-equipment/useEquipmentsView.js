import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'
// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useEquipmentsView() {
  // Use toast
  const toast = useToast()

  // ------------------------------------------------
  // Tap Equipments
  // ------------------------------------------------
  const perPage = ref(15)
  const totalEquipments = ref(null)
  const currentPage = ref(1)
  const perPageOptions = [5, 10, 15, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)

  const parkEquipmentData = ref(null)
  const refParkEquipmentsListTable = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refParkEquipmentsListTable.value ? refParkEquipmentsListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalEquipments.value,
    }
  })
  const tableColumnsEquipments = [
    { key: 'equipment_id', label: 'Equipment ID' },
    { key: 'area', label: 'Area' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'equipment_status', label: 'Status' },
    { key: 'created_at', label: 'Created Date' },
    { key: 'updated_at', label: 'Last Updated' },
    { key: 'actions', label: 'Actions' },
  ]

  const refetchEquipmentData = () => {
    refParkEquipmentsListTable.value.refresh()
  }
  watch([currentPage, perPage, searchQuery], () => {
    refetchEquipmentData()
  })

  // ------------------------------------------------
  // Tap Equipments : Fetch Park's Equipments List
  // ------------------------------------------------
  const fetchParkEquipments = (ctx, callback) => {
    store
      .dispatch('app-park/fetchParkEquipments', {
        queryParams: {
          search: searchQuery.value,
          limit: perPage.value,
          page: currentPage.value,
        },
        id: router.currentRoute.params.id,
      })
      .then(response => {
        console.log(response)
        console.log(searchQuery)
        const { data } = response.data
        const { total } = response.data.meta

        callback(data)
        totalEquipments.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching equipments list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }
  // ------------------------------------------------
  // Tap Equipments : Fetch Park Equipment
  // ------------------------------------------------
  const fetchParkEquipment = dataItemId => {
    store.dispatch('app-park/fetchParkEquipment', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        parkEquipmentData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          parkEquipmentData.value = undefined
        }
      })
  }

  // ------------------------------------------------
  // Tap Equipments : remove Park Equipment
  // ------------------------------------------------
  const removeParkEquipment = dataItemId => {
    store
      .dispatch('app-park/removeParkEquipment', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(() => {
        refetchEquipmentData()
      })
  }

  return {

    fetchParkEquipment,
    fetchParkEquipments,
    tableColumnsEquipments,
    refetchEquipmentData,
    refParkEquipmentsListTable,
    parkEquipmentData,
    removeParkEquipment,

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
