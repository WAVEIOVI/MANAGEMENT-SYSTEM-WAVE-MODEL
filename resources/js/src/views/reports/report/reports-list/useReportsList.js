import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useReportsList() {
  // Use toast
  const toast = useToast()

  const refReportListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'report_id', label: 'Report ID' },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'Type', label: 'Type' },
    { key: 'Location', label: 'Location' },
    { key: 'report_date', label: 'Report Date' },
    { key: 'report_status', label: 'Status' },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalReports = ref(null)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const typeFilter = ref(null)
  const activityFilter = ref(null)
  const statusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refReportListTable.value ? refReportListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalReports.value,
    }
  })

  const refetchData = () => {
    refReportListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, typeFilter, activityFilter, statusFilter], () => {
    refetchData()
  })
  const fetchReports = (ctx, callback) => {
    store
      .dispatch('app-report/fetchReports', {
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
        totalReports.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching reports list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }
  // ------------------------------------------------
  // removeReport
  // ------------------------------------------------
  const removeReport = dataItemId => {
    store
      .dispatch('app-report/removeReport', { id: dataItemId })
      .then(() => {
        refetchData()
      })
  }
  // ------------------------------------------------
  // Fetch Customers
  // ------------------------------------------------
  const customersData = ref(null)
  store
    .dispatch('app-report/fetchCustomers')
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

  const resolveReportTypeVariant = type => {
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
  const resolveReportTypeIcon = type => {
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

  const resolveReportStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'in_progress') return 'success'
    if (status === 'completed') return 'danger'
    return 'primary'
  }

  return {
    customersData,
    fetchReports,
    tableColumns,
    perPage,
    currentPage,
    totalReports,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refReportListTable,

    resolveReportTypeVariant,
    resolveReportTypeIcon,
    resolveReportStatusVariant,
    refetchData,
    removeReport,

    // Extra Filters
    statusFilter,
  }
}
