import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'
// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useEquipmentsView() {
  // Use toast
  const toast = useToast()

  // ------------------------------------------------
  // Tap Equipments
  // ------------------------------------------------
  const perPage = ref(1)
  const totalEquipments = ref(null)
  const currentPage = ref(1)
  const perPageOptions = [5, 10, 15, 25, 50, 100]
  const searchQuery = ref('')
  const areaFilter = ref(null)
  const categoryFilter = ref(null)
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)

  const parkEquipmentData = ref(null)
  const refParkEquipmentsListTable = ref(null)

  const workshopData = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refParkEquipmentsListTable.value ? refParkEquipmentsListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalEquipments.value,
    }
  })
  const tableColumnsEquipments = [
    // { key: 'attach', label: 'ATTACH' },
    // { key: 'show_details', label: 'Tasks' },
    { key: 'equipment_id', label: 'Equipment ID' },
    { key: 'area', label: 'Area' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'created_at', label: 'Created Date' },
    { key: 'updated_at', label: 'Last Updated' },
  ]

  const refetchEquipmentData = () => {
    refParkEquipmentsListTable.value.refresh()
  }
  watch([currentPage, perPage, areaFilter, categoryFilter, searchQuery], () => {
    refetchEquipmentData()
  })
  // ------------------------------------------------
  // Tap Equipments : Fetch Park Workshop
  // ------------------------------------------------
  const missionLocId = ref()
  //   store.dispatch('app-workshop/fetchWorkshop', { id: router.currentRoute.params.id })
  //     .then(response => {
  //       workshopData.value = response.data.data
  //       console.log(response.data.data)
  //       missionLocId.value = workshopData.value.mission_loc_id
  //       console.log('workshopData.mission_loc_id:', workshopData.value.mission_loc_id)
  //     })
  // .catch(error => {
  //   if (error.response.status === 404) {
  //     workshopData.value = undefined
  //   }
  // })

  // ------------------------------------------------
  // Tap Equipments : Fetch Park's Equipments List
  // ------------------------------------------------
  //   const fetchParkEquipments = (ctx, callback) => {
  //     store.dispatch('app-workshop/fetchWorkshop', { id: router.currentRoute.params.id })
  //       .then(response => {
  //         workshopData.value = response.data.data
  //         console.log(response.data.data)
  //         missionLocId.value = workshopData.value.mission_loc_id
  //         console.log('workshopData.mission_loc_id:', workshopData.value.mission_loc_id)
  //       })
  //     store
  //       .dispatch('app-park/fetchParkEquipments', {
  //         queryParams: {
  //           area: areaFilter.value,
  //           category: categoryFilter.value,
  //           search: searchQuery.value,
  //           limit: perPage.value,
  //           page: currentPage.value,
  //         },
  //         id: missionLocId.value,
  //       })
  //       .then(response => {
  //         console.log(response)
  //         console.log(searchQuery)
  //         const { data } = response.data
  //         const { total } = response.data.meta

  //         callback(data)
  //         totalEquipments.value = total
  //       })
  //       .catch(() => {
  //         toast({
  //           component: ToastificationContent,
  //           props: {
  //             title: 'Error fetching equipments list',
  //             icon: 'AlertTriangleIcon',
  //             variant: 'danger',
  //           },
  //         })
  //       })
  //   }
  const fetchParkEquipments = (ctx, callback) => {
    // Fetch the workshop data
    store.dispatch('app-workshop/fetchWorkshop', { id: router.currentRoute.params.id })
      .then(response => {
        workshopData.value = response.data.data
        console.log(workshopData.value)

        // Set missionLocId based on the workshop data
        missionLocId.value = workshopData.value.mission_loc_id
        console.log('workshopData.mission_loc_id:', missionLocId.value)

        // Fetch park equipment data using missionLocId
        return store.dispatch('app-park/fetchParkEquipments', {
          queryParams: {
            area: areaFilter.value,
            category: categoryFilter.value,
            search: searchQuery.value,
            limit: perPage.value,
            page: currentPage.value,
          },
          id: missionLocId.value,
        })
      })
      .then(parkEquipmentResponse => {
        console.log(parkEquipmentResponse)
        console.log(searchQuery)

        const { data } = parkEquipmentResponse.data
        const { total } = parkEquipmentResponse.data.meta

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
        refetchEquipmentData()
      })
  }

  // ------------------------------------------------
  // Tap Equipments : Attach Equipment with Workshop
  // ------------------------------------------------
  const attachEquipment = dataItemId => {
    store
      .dispatch('app-workshop/attachEquipment', { id: router.currentRoute.params.id, resources: dataItemId })
      .then(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Notification',
            text: 'Equipment Successfully Attached!',
            icon: 'CheckIcon',
            variant: 'success',
          },
        })
      })
  }
  return {

    fetchParkEquipment,
    fetchParkEquipments,
    tableColumnsEquipments,
    refetchEquipmentData,
    refParkEquipmentsListTable,
    parkEquipmentData,
    removeParkEquipment,
    attachEquipment,

    perPage,
    currentPage,
    totalEquipments,
    dataMeta,
    perPageOptions,
    searchQuery,
    areaFilter,
    categoryFilter,
    sortBy,
    isSortDirDesc,
  }
}
