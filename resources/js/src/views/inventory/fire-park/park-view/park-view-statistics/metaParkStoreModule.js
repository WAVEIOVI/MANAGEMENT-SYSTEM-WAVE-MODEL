import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchParkEquipment(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/parks/${id}/equipments`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchParkArea(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/parks/${id}/areas`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
