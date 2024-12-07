import { ref } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'

export default function useInterventionsView() {
  const interventionReportData = ref(null)
  const refInterventionReportsListTable = ref(null)

  // Table Handlers
  const tableColumnsReports = [
    { key: 'index', label: '#' },
    { key: 'id', label: 'id' },
  ]
  const services = ref([])
  const refetchData = () => {
    refInterventionReportsListTable.value.refresh()
  }

  // ------------------------------------------------
  // Tap Customer Report : Fetch Intervention's Customer Report List
  // ------------------------------------------------
  const fetchInterventionReports = (ctx, callback) => {
    store
      .dispatch('app-report/fetchInterventionReports', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }
  // ------------------------------------------------
  // Tap Customer Report : Fetch Intervention's Customer Report View
  // ------------------------------------------------
  const fetchInterventionReport = dataItemId => {
    store.dispatch('app-report/fetchCustomerReport', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        interventionReportData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          interventionReportData.value = undefined
        }
      })
  }

  // ------------------------------------------------
  // Tap services : Fetch Intervention's services View
  // ------------------------------------------------
  const fetchInterventionServices = (ctx, callback) => {
    store
      .dispatch('app-intervention/fetchInterventionServices', { id: router.currentRoute.params.id })
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

  const resolveInterventionPlanVariant = plan => {
    if (plan === 'Basic') return 'primary'
    if (plan === 'Basic Plus') return 'secondary'
    if (plan === 'Company') return 'success'
    if (plan === 'Entreprise') return 'warning'
    if (plan === 'Elite') return 'danger'
    return 'primary'
  }
  const resolveInterventionPlanIcon = plan => {
    if (plan === 'Basic') return 'ToolIcon'
    if (plan === 'Basic Plus') return 'TrendingUpIcon'
    if (plan === 'Company') return 'SlidersIcon'
    if (plan === 'Entreprise') return 'ShieldIcon'
    if (plan === 'Elite') return 'UmbrellaIcon'
    return 'ToolIcon'
  }

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
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  return {
    fetchInterventionReport,
    fetchInterventionReports,
    fetchInterventionServices,
    tableColumnsReports,
    services,
    refetchData,
    interventionReportData,

    resolveInterventionTypeVariant,
    resolveInterventionTypeIcon,
    resolveInterventionPlanVariant,
    resolveInterventionPlanIcon,
    resolveInterventionStatusVariant,

  }
}
