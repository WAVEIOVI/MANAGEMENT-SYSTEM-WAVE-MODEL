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
    fetchCustomers() {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/customers')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
