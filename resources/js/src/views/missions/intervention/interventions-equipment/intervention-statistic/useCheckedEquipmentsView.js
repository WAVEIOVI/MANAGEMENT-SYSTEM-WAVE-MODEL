import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'
// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useCheckedEquipmentsView() {
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

  const checkedEquipmentData = ref(null)
  const refCheckedEquipmentsListTable = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refCheckedEquipmentsListTable.value ? refCheckedEquipmentsListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalEquipments.value,
    }
  })
  const tableColumnsCheckedEquipments = [
    { key: 'equipment_id', label: 'Equipment ID' },
    { key: 'area', label: 'Area' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'verification', label: 'Verification' },
    { key: 'azote', label: 'Azote' },
    { key: 'raw_material', label: 'Raw Material' },
    { key: 'updated_at', label: 'Last Updated' },
  ]

  const refetchEquipmentData = () => {
    refCheckedEquipmentsListTable.value.refresh()
  }
  watch([currentPage, perPage, searchQuery], () => {
    refetchEquipmentData()
  })

  const fetchCheckedEquipments = (ctx, callback) => {
    store
      .dispatch('app-intervention/fetchCheckedEquipments', {
        queryParams: {
          search: searchQuery.value,
          limit: perPage.value,
          page: currentPage.value,
        },
        id: router.currentRoute.params.id,
      })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching checked equipment list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  return {
    fetchCheckedEquipments,
    tableColumnsCheckedEquipments,
    refCheckedEquipmentsListTable,
    checkedEquipmentData,

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
