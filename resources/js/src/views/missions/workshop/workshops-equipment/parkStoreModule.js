import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {

    // ------------------------------------------------
    //   Park
    // ------------------------------------------------
    fetchCustomers() {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/customers')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // ------------------------------------------------
    // LocationCustomer
    // ------------------------------------------------
    fetchCustomerLocations(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/customers/${id}/locations`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    //   Park
    // ------------------------------------------------
    fetchParks(_ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/parks/search?limit=${queryParams.limit}&page=${queryParams.page}`, {
            search: { value: queryParams.search },
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchPark(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/parks/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addPark(ctx, parkData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/parks', parkData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updatePark(ctx, { id, parkData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/parks/${id}`, parkData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removePark(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/parks/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    // EquipmentPark
    // ------------------------------------------------
    fetchParkEquipments(_ctx, { id, queryParams }) {
      const filters = []
      if (queryParams.area) {
        filters.push({ field: 'area_description', operator: '=', value: queryParams.area })
      }
      if (queryParams.category) {
        filters.push({ field: 'equipment_category', operator: '=', value: queryParams.category })
      }
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/parks/${id}/equipments/search?limit=${queryParams.limit}&page=${queryParams.page}`, {
            search: { value: queryParams.search },
          })
          .then(response => {
            console.log('Response:', queryParams)
            console.log('Response:', response)
            resolve(response)
          })
          .catch(error => {
            console.log('Error:', error)
            reject(error)
          })
      })
    },
    fetchParkEquipment(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/parks/${id}/equipments/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addParkEquipment(ctx, { id, parkData }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/parks/${id}/equipments`, parkData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateParkEquipment(ctx, { id, idloc, parkEquipmentData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/parks/${id}/equipments/${idloc}`, parkEquipmentData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeParkEquipment(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/parks/${id}/equipments/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    // AreaPark
    // ------------------------------------------------
    fetchParkAreas(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/parks/${id}/areas`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchParkArea(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/parks/${id}/areas/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addParkArea(ctx, { id, parkData }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/parks/${id}/areas`, parkData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateParkArea(ctx, { id, idloc, parkAreaData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/parks/${id}/areas/${idloc}`, parkAreaData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeParkArea(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/parks/${id}/areas/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
