import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // ------------------------------------------------
    // Contract Customer
    // ------------------------------------------------
    fetchCustomerContracts(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/customers/${id}/contracts`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCustomerContract(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/customers/${id}/contracts/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCustomerContract(ctx, { id, customerContractData }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/customers/${id}/contracts`, customerContractData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateCustomerContract(ctx, { id, idloc, customerContractData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/customers/${id}/contracts/${idloc}`, customerContractData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeCustomerContract(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/customers/${id}/contracts/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
