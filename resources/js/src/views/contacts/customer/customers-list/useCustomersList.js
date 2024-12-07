import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useCustomersList() {
  // Use toast
  const toast = useToast()

  const refCustomerListTable = ref(null)

  // Define nextCustomerId as a reactive variable
  const nextCustomerId = ref('') // Initialize it with an empty string

  // Table Handlers
  const tableColumns = [
    { key: 'customer_name', label: 'Customer', sortable: true },
    { key: 'customer_email', label: 'Email' },
    { key: 'customer_type', label: 'Type' },
    { key: 'customer_activity', label: 'Activity Area' },
    { key: 'customer_status', label: 'Status' },
    { key: 'actions' },
  ]
  const perPage = ref(15)
  const totalCustomers = ref(null)
  const currentPage = ref(1)
  const perPageOptions = [5, 10, 15, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const typeFilter = ref(null)
  const activityFilter = ref(null)
  const statusFilter = ref(null)
  const dataMeta = computed(() => {
    const localItemsCount = refCustomerListTable.value ? refCustomerListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalCustomers.value,
    }
  })

  const refetchData = () => {
    refCustomerListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, typeFilter, activityFilter, statusFilter], () => {
    refetchData()
  })
  const fetchCustomers = (ctx, callback) => {
    store
      .dispatch('app-customer/fetchCustomers', {
        search: searchQuery.value,
        limit: perPage.value,
        page: currentPage.value,
        sortby: sortBy.value,
        sortDesc: isSortDirDesc.value,
        type: typeFilter.value,
        activity: activityFilter.value,
        status: statusFilter.value,
      })
      .then(response => {
        // console.log(response)
        // console.log(response.config)
        // console.log(response.data.meta.per_page)
        const { data } = response.data
        const { total } = response.data.meta
        nextCustomerId.value = response.data.next_customer_id
        callback(data)
        totalCustomers.value = total
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
  // removeCustomer
  // ------------------------------------------------
  const removeCustomer = dataItemId => {
    store
      .dispatch('app-customer/removeCustomer', { id: dataItemId })
      .then(() => {
        refetchData()
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveCustomerTypeVariant = type => {
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
  const resolveCustomerTypeIcon = type => {
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

  const resolveCustomerStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  return {
    fetchCustomers,
    tableColumns,
    perPage,
    currentPage,
    totalCustomers,
    nextCustomerId,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refCustomerListTable,

    resolveCustomerTypeVariant,
    resolveCustomerTypeIcon,
    resolveCustomerStatusVariant,
    refetchData,
    removeCustomer,

    // Extra Filters
    typeFilter,
    activityFilter,
    statusFilter,
  }
}
