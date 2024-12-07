import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useParksView() {
  // Use toast
  const toast = useToast()

  const parkAreaData = ref(null)
  const parkEquipmentData = ref(null)

  const refParkEquipmentsListTable = ref(null)
  const refParkAreasListTable = ref(null)

  const perPage = ref(10)
  const totalParks = ref(null)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)

  const dataMeta = computed(() => {
    const localItemsCount = refParkEquipmentsListTable.value ? refParkEquipmentsListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalParks.value,
    }
  })
  // Table Handlers
  const tableColumnsEquipments = [
    { key: 'equipment_id', label: 'Equipment ID' },
    { key: 'area', label: 'Area' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'equipment_status', label: 'Status' },
    { key: 'created_at', label: 'Created Date' },
    { key: 'updated_at', label: 'Last Updated' },
    { key: 'actions', label: 'Actions' },
  ]
  const tableColumnsAreas = [
    { key: 'area_id', label: 'Area ID' },
    { key: 'area_description', label: 'Area Description' },
    { key: 'area_accessibility', label: 'Area Accessibility' },
    { key: 'area_classification', label: 'Area Classification' },
    { key: 'actions', label: 'Actions' },
  ]
  const refetchAreaData = () => {
    refParkAreasListTable.value.refresh()
  }

  const refetchData = () => {
    refParkEquipmentsListTable.value.refresh()
  }
  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })

  // ------------------------------------------------
  // Tap Equipments : Fetch Park's Equipments List
  // ------------------------------------------------
  const fetchParkEquipments = (ctx, callback) => {
    store
      .dispatch('app-park/fetchParkEquipments', {
        search: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        id: router.currentRoute.params.id,
      })
      .then(response => {
        const { data } = response.data
        const { total } = response.data.meta

        callback(data)
        totalParks.value = total
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
        refetchData()
      })
  }

  // ------------------------------------------------
  // Tap Areas : Fetch Park's Areas List
  // ------------------------------------------------
  const fetchParkAreas = (ctx, callback) => {
    store
      .dispatch('app-park/fetchParkAreas', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching area list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }
  // ------------------------------------------------
  // Tap Areas : Fetch Park Area
  // ------------------------------------------------
  const fetchParkArea = dataItemId => {
    store.dispatch('app-park/fetchParkArea', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        parkAreaData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          parkAreaData.value = undefined
        }
      })
  }

  // ------------------------------------------------
  // Tap Equipments : remove Park Equipment
  // ------------------------------------------------
  const removeParkArea = dataItemId => {
    store
      .dispatch('app-park/removeParkArea', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(() => {
        refetchAreaData()
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveParkPlanVariant = plan => {
    if (plan === 'Basic') return 'primary'
    if (plan === 'Basic Plus') return 'secondary'
    if (plan === 'Company') return 'success'
    if (plan === 'Entreprise') return 'warning'
    if (plan === 'Elite') return 'danger'
    return 'primary'
  }
  const resolveParkPlanIcon = plan => {
    if (plan === 'Basic') return 'ToolIcon'
    if (plan === 'Basic Plus') return 'TrendingUpIcon'
    if (plan === 'Company') return 'SlidersIcon'
    if (plan === 'Entreprise') return 'ShieldIcon'
    if (plan === 'Elite') return 'UmbrellaIcon'
    return 'ToolIcon'
  }

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
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  return {

    // Equipment
    tableColumnsEquipments,
    fetchParkEquipments,
    fetchParkEquipment,
    removeParkEquipment,
    parkEquipmentData,
    perPage,
    currentPage,
    totalParks,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refParkEquipmentsListTable,
    // Global
    refetchData,
    tableColumnsAreas,
    fetchParkAreas,
    fetchParkArea,
    removeParkArea,
    parkAreaData,
    refetchAreaData,

    resolveParkPlanVariant,
    resolveParkPlanIcon,
    resolveParkTypeVariant,
    resolveParkTypeIcon,
    resolveParkStatusVariant,

  }
}
