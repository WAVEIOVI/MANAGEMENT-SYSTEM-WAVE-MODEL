import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
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
    fetchCustomerLocation(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/customers/${id}/locations/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCustomerLocation(ctx, { id, customerData }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/customers/${id}/locations`, customerData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateCustomerLocation(ctx, { id, idloc, customerLocationData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/customers/${id}/locations/${idloc}`, customerLocationData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeCustomerLocation(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/customers/${id}/locations/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    // contactsCustomer
    // ------------------------------------------------
    fetchCustomerContacts(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/customers/${id}/contacts`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
