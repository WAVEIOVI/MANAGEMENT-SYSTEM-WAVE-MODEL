import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {

    // ------------------------------------------------
    //   Report
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
    //   Report
    // ------------------------------------------------
    fetchReports(_ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/reports', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchReport(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/reports/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addReport(ctx, reportData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/reports', reportData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateReport(ctx, { id, reportData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/reports/${id}`, reportData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeReport(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/reports/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
