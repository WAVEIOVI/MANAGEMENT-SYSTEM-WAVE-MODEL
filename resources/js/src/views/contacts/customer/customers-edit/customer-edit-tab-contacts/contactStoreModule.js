import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // ------------------------------------------------
    // ContactCustomer
    // ------------------------------------------------
    fetchCustomerContacts(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/customers/${id}/contacts`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCustomerContact(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/customers/${id}/contacts/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCustomerContact(ctx, { id, customerContactData }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/customers/${id}/contacts`, customerContactData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateCustomerContact(ctx, { id, idloc, customerContactData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/customers/${id}/contacts/${idloc}`, customerContactData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeCustomerContact(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/customers/${id}/contacts/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
