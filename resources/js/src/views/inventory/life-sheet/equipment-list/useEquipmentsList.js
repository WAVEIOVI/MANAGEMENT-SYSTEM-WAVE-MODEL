import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useEquipmentsList() {
  // Use toast
  const toast = useToast()

  const refEquipmentListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'equipment_id', label: 'Equipment ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'park', label: 'Park' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'equipment_status', label: 'Status' },
    { key: 'created_at', label: 'Created Date' },
    { key: 'updated_at', label: 'Last Updated' },
    { key: 'actions', label: 'Actions' },
  ]
  const perPage = ref(15)
  const totalEquipments = ref(null)
  const currentPage = ref(1)
  const perPageOptions = [10, 15, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const typeFilter = ref(null)
  const activityFilter = ref(null)
  const statusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refEquipmentListTable.value ? refEquipmentListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalEquipments.value,
    }
  })

  const refetchData = () => {
    refEquipmentListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, typeFilter, activityFilter, statusFilter], () => {
    refetchData()
  })
  const fetchEquipments = (ctx, callback) => {
    store
      .dispatch('app-equipment/fetchEquipments', {
        search: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        type: typeFilter.value,
        activity: activityFilter.value,
        status: statusFilter.value,
      })
      .then(response => {
        console.log(response)
        console.log(response.data.data)
        const { data } = response.data
        const { total } = response.data.meta
        data.forEach(equipment => {
          console.log(equipment.id)
          console.log(equipment.equipment_id)
          console.log(equipment.equipment_name)
        })
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
  // removeEquipment
  // ------------------------------------------------
  const removeEquipment = dataItemId => {
    store
      .dispatch('app-equipment/removeEquipment', { id: dataItemId })
      .then(() => {
        refetchData()
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveEquipmentTypeVariant = type => {
    if (type === 'residential') return 'primary'
    if (type === 'commercial') return 'secondary'
    if (type === 'public') return 'success'
    if (type === 'industrial') return 'warning'
    if (type === 'international') return 'danger'
    if (type === 'premium') return 'info'
    if (type === 'subcontracting') return 'light'
    if (type === 'resellers') return 'dark'
    return 'primary'
  }
  const resolveEquipmentTypeIcon = type => {
    if (type === 'residential') return 'HomeIcon'
    if (type === 'commercial') return 'BriefcaseIcon'
    if (type === 'public') return 'BookOpenIcon'
    if (type === 'industrial') return 'ToolIcon'
    if (type === 'international') return 'GlobeIcon'
    if (type === 'premium') return 'AwardIcon'
    if (type === 'subcontracting') return 'UsersIcon'
    if (type === 'resellers') return 'ShoppingCartIcon'
    return 'HomeIcon'
  }

  const resolveEquipmentStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  return {
    fetchEquipments,
    tableColumns,
    perPage,
    currentPage,
    totalEquipments,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refEquipmentListTable,

    resolveEquipmentTypeVariant,
    resolveEquipmentTypeIcon,
    resolveEquipmentStatusVariant,
    refetchData,
    removeEquipment,

    // Extra Filters
    typeFilter,
    activityFilter,
    statusFilter,
  }
}
