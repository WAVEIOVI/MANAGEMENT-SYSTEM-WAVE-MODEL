import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useInterventionsList() {
  // Use toast
  const toast = useToast()

  const refInterventionListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'intervention_id', label: 'Intervention ID' },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'location', label: 'Location' },
    { key: 'team_leader', label: 'Team Leader' },
    { key: 'intervention_date', label: 'Intervention Date' },
    { key: 'intervention_status', label: 'Status' },
    { key: 'actions' },
  ]
  const pendingIntervention = ref([])
  const perPage = ref(10)
  const totalInterventions = ref(null)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const typeFilter = ref(null)
  const activityFilter = ref(null)
  const statusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refInterventionListTable.value ? refInterventionListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalInterventions.value,
    }
  })

  const refetchData = () => {
    refInterventionListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, typeFilter, activityFilter, statusFilter], () => {
    refetchData()
  })
  const fetchInterventions = (ctx, callback) => {
    store
      .dispatch('app-intervention/fetchInterventions', {
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
        totalInterventions.value = total
        pendingIntervention.value = response.data.data
        console.log('pendingIntervention', pendingIntervention)
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching interventions list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }
  // ------------------------------------------------
  // removeIntervention
  // ------------------------------------------------
  const removeIntervention = dataItemId => {
    store
      .dispatch('app-intervention/removeIntervention', { id: dataItemId })
      .then(() => {
        refetchData()
      })
  }
  // ------------------------------------------------
  // Fetch Customers
  // ------------------------------------------------
  const customersData = ref(null)
  store
    .dispatch('app-intervention/fetchCustomers')
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

  const resolveInterventionTypeVariant = type => {
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
  const resolveInterventionTypeIcon = type => {
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

  const resolveInterventionStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'in_progress') return 'success'
    if (status === 'completed') return 'secondary'
    return 'primary'
  }

  return {
    customersData,
    fetchInterventions,
    pendingIntervention,
    tableColumns,
    perPage,
    currentPage,
    totalInterventions,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refInterventionListTable,

    resolveInterventionTypeVariant,
    resolveInterventionTypeIcon,
    resolveInterventionStatusVariant,
    refetchData,
    removeIntervention,

    // Extra Filters
    statusFilter,
  }
}
