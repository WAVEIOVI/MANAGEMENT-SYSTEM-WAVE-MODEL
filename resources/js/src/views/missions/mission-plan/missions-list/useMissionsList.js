import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useMissionsList() {
  // Use toast
  const toast = useToast()

  const refMissionListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'mission_id', label: 'Mission ID' },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'location', label: 'Location' },
    { key: 'mission_date', label: 'Mission Date' },
    { key: 'mission_type', label: 'Mission Type' },
    { key: 'mission_status', label: 'Status' },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalMissions = ref(null)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const typeFilter = ref(null)
  const activityFilter = ref(null)
  const statusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refMissionListTable.value ? refMissionListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalMissions.value,
    }
  })

  const refetchData = () => {
    refMissionListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, typeFilter, activityFilter, statusFilter], () => {
    refetchData()
  })
  const fetchMissions = (ctx, callback) => {
    store
      .dispatch('app-mission/fetchMissions', {
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

        callback(data)
        totalMissions.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching missions list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }
  // ------------------------------------------------
  // removeMission
  // ------------------------------------------------
  const removeMission = dataItemId => {
    store
      .dispatch('app-mission/removeMission', { id: dataItemId })
      .then(() => {
        refetchData()
      })
  }
  // ------------------------------------------------
  // Fetch Customers
  // ------------------------------------------------
  const customersData = ref(null)
  store
    .dispatch('app-mission/fetchCustomers')
    .then(response => {
      customersData.value = response.data.data
    })
    .catch(error => {
      if (error.response.status === 404) {
        customersData.value = undefined
      }
    })

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveMissionTypeVariant = type => {
    if (type === 'intervention') return 'primary'
    if (type === 'workshop') return 'info'
    return 'primary'
  }
  const resolveMissionTypeIcon = type => {
    if (type === 'intervention') return 'ToolIcon'
    if (type === 'workshop') return 'HomeIcon'
    return 'HomeIcon'
  }

  const resolveMissionStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'in_progress') return 'success'
    if (status === 'completed') return 'danger'
    return 'primary'
  }

  return {
    customersData,
    fetchMissions,
    tableColumns,
    perPage,
    currentPage,
    totalMissions,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refMissionListTable,

    resolveMissionTypeVariant,
    resolveMissionTypeIcon,
    resolveMissionStatusVariant,
    refetchData,
    removeMission,

    // Extra Filters
    statusFilter,
  }
}
