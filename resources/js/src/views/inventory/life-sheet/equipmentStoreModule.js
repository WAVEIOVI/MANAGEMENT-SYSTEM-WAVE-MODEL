import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {

    // ------------------------------------------------
    //   Equipment
    // ------------------------------------------------
    fetchEquipments(_ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/equipments', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchEquipment(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/equipments/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addEquipment(ctx, equipmentData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/equipments', equipmentData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateEquipment(ctx, { id, equipmentData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/equipments/${id}`, equipmentData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeEquipment(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/equipments/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchEquipmentTasks(_ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/equipments/${id}/tasks`)
          .then(response => resolve(response))
          .catch(error => {
            console.log('Error:', error)
            reject(error)
          })
      })
    },
  },
}
