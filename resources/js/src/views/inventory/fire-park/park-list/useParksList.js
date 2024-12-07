import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useParksList() {
  // Use toast
  const toast = useToast()

  const refParkListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'park_location_id', label: 'Park ID' },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'location', label: 'Address' },
    { key: 'created_at', label: 'Created Date' },
    { key: 'updated_at', label: 'Last Updated' },
    { key: 'actions' },
  ]
  const perPage = ref(15)
  const totalParks = ref(null)
  const currentPage = ref(1)
  const perPageOptions = [5, 10, 15, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  //   const typeFilter = ref(null)
  //   const activityFilter = ref(null)
  //   const statusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refParkListTable.value ? refParkListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalParks.value,
    }
  })

  const refetchData = () => {
    refParkListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })
  const fetchParks = (ctx, callback) => {
    store
      .dispatch('app-park/fetchParks', {
        search: searchQuery.value,
        limit: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
      })
      .then(response => {
        console.log(response)
        console.log(response.data.data)
        const { data } = response.data
        const { total } = response.data.meta

        callback(data)
        totalParks.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching parks list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }
  // ------------------------------------------------
  // removePark
  // ------------------------------------------------
  const removePark = dataItemId => {
    store
      .dispatch('app-park/removePark', { id: dataItemId })
      .then(() => {
        refetchData()
      })
  }
  // ------------------------------------------------
  // Fetch Customers
  // ------------------------------------------------
  const customersData = ref(null)
  store
    .dispatch('app-park/fetchCustomers')
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

  const resolveParkTypeVariant = type => {
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
  const resolveParkTypeIcon = type => {
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

  const resolveParkStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'in_progress') return 'success'
    if (status === 'completed') return 'secondary'
    return 'primary'
  }

  return {
    customersData,
    fetchParks,
    tableColumns,
    perPage,
    currentPage,
    totalParks,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refParkListTable,

    resolveParkTypeVariant,
    resolveParkTypeIcon,
    resolveParkStatusVariant,
    refetchData,
    removePark,

    // Extra Filters
  }
}
