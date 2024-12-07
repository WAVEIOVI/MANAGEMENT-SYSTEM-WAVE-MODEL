import { ref } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'

export default function useWorkshopsView() {
  const workshopReportData = ref(null)
  const refWorkshopReportsListTable = ref(null)

  // Table Handlers
  const tableColumnsReports = [
    { key: 'index', label: '#' },
    { key: 'id', label: 'id' },
  ]
  const services = ref([])
  const refetchData = () => {
    refWorkshopReportsListTable.value.refresh()
  }

  // ------------------------------------------------
  // Tap Customer Report : Fetch Workshop's Customer Report List
  // ------------------------------------------------
  const fetchWorkshopReports = (ctx, callback) => {
    store
      .dispatch('app-report/fetchWorkshopReports', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }
  // ------------------------------------------------
  // Tap Customer Report : Fetch Workshop's Customer Report View
  // ------------------------------------------------
  const fetchWorkshopReport = dataItemId => {
    store.dispatch('app-report/fetchCustomerReport', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        workshopReportData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          workshopReportData.value = undefined
        }
      })
  }

  // ------------------------------------------------
  // Tap services : Fetch Workshop's services View
  // ------------------------------------------------
  const fetchWorkshopServices = (ctx, callback) => {
    store
      .dispatch('app-workshop/fetchWorkshopServices', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
        services.value = response.data.data
        console.log(services.value)
      })
  }
  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveWorkshopPlanVariant = plan => {
    if (plan === 'Basic') return 'primary'
    if (plan === 'Basic Plus') return 'secondary'
    if (plan === 'Company') return 'success'
    if (plan === 'Entreprise') return 'warning'
    if (plan === 'Elite') return 'danger'
    return 'primary'
  }
  const resolveWorkshopPlanIcon = plan => {
    if (plan === 'Basic') return 'ToolIcon'
    if (plan === 'Basic Plus') return 'TrendingUpIcon'
    if (plan === 'Company') return 'SlidersIcon'
    if (plan === 'Entreprise') return 'ShieldIcon'
    if (plan === 'Elite') return 'UmbrellaIcon'
    return 'ToolIcon'
  }

  const resolveWorkshopTypeVariant = type => {
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
  const resolveWorkshopTypeIcon = type => {
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

  const resolveWorkshopStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  return {
    fetchWorkshopReport,
    fetchWorkshopReports,
    fetchWorkshopServices,
    tableColumnsReports,
    services,
    refetchData,
    workshopReportData,

    resolveWorkshopTypeVariant,
    resolveWorkshopTypeIcon,
    resolveWorkshopPlanVariant,
    resolveWorkshopPlanIcon,
    resolveWorkshopStatusVariant,

  }
}
