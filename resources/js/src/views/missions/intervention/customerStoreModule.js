import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {

    // ------------------------------------------------
    //   Customer
    // ------------------------------------------------
    fetchCustomers(_ctx, queryParams) {
      const filters = []
      if (queryParams.type) {
        filters.push({ field: 'customer_type', operator: '=', value: queryParams.type })
      }
      if (queryParams.activity) {
        filters.push({ field: 'customer_activity', operator: '=', value: queryParams.activity })
      }
      if (queryParams.status) {
        filters.push({ field: 'customer_status', operator: '=', value: queryParams.status })
      }
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/customers/search?limit=${queryParams.limit}&page=${queryParams.page}`, {
            search: { value: queryParams.search },
            filters,
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCustomer(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/customers/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCustomer(ctx, customerData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/customers', customerData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateCustomer(ctx, { id, customerData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/customers/${id}`, customerData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeCustomer(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/customers/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
