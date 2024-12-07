import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // ------------------------------------------------
    // Order Customer
    // ------------------------------------------------
    fetchCustomerOrders(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/customers/${id}/orders`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCustomerOrder(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/customers/${id}/orders/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCustomerOrder(ctx, { id, customerOrderData }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/customers/${id}/orders`, customerOrderData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateCustomerOrder(ctx, { id, idloc, customerOrderData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/customers/${id}/orders/${idloc}`, customerOrderData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeCustomerOrder(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/customers/${id}/orders/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
