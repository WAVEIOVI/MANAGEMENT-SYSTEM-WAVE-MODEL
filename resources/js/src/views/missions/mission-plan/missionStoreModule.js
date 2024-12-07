import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {

    // ------------------------------------------------
    //   Mission
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
    // OrdersCustomer
    // ------------------------------------------------
    fetchCustomerOrders(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/customers/${id}/orders`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // ------------------------------------------------
    //   Mission
    // ------------------------------------------------
    fetchMissions(_ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/missions', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchMission(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/missions/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addMission(ctx, missionData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/missions', missionData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateMission(ctx, { id, missionData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/missions/${id}`, missionData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeMission(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/missions/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
