import { ref } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'
// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useAreasView() {
  // Use toast
  const toast = useToast()

  // ------------------------------------------------
  // Tap Areas
  // ------------------------------------------------
  const parkAreaData = ref(null)
  const refParkAreasListTable = ref(null)
  const totalAreas = ref(null)
  // Table Handlers
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
  // ------------------------------------------------
  // Tap Areas : Fetch Park's Areas List
  // ------------------------------------------------
  const fetchParkAreas = (ctx, callback) => {
    store
      .dispatch('app-park/fetchParkAreas', {
        id: router.currentRoute.params.id,
      })
      .then(response => {
        const { data } = response.data
        const { total } = response.data.meta

        callback(data)
        totalAreas.value = total
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
  // Tap Areas : remove Park Area
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

  const resolveAreaAccessibilityVariant = accessibility => {
    if (accessibility === 'Open Access Area') return 'success'
    if (accessibility === 'Easy Access') return 'success'
    if (accessibility === 'Limited Access') return 'warning'
    if (accessibility === 'Difficult Access') return 'warning'
    if (accessibility === 'Restricted Access Area') return 'danger'
    if (accessibility === 'Inaccessible') return 'danger'
    return 'primary'
  }
  const resolveAreaClassificationVariant = classification => {
    if (classification === 'Safe Area') return 'success'
    if (classification === 'No Risk') return 'success'
    if (classification === 'Low Risk') return 'info'
    if (classification === 'Controlled Risk') return 'warning'
    if (classification === 'Medium Risk') return 'warning'
    if (classification === 'Special Risk') return 'danger'
    if (classification === 'High Risk') return 'danger'
    return 'primary'
  }

  return {
    fetchParkArea,
    fetchParkAreas,
    tableColumnsAreas,
    refetchAreaData,
    refParkAreasListTable,
    parkAreaData,
    removeParkArea,
    // UI
    resolveAreaClassificationVariant,
    resolveAreaAccessibilityVariant,
  }
}
