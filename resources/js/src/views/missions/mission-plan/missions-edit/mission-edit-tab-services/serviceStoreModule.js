import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // ------------------------------------------------
    // ServiceMission
    // ------------------------------------------------
    fetchMissionServices(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/missions/${id}/services`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchMissionService(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/missions/${id}/services/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addMissionService(ctx, { id, missionData }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/missions/${id}/services`, missionData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateMissionService(ctx, { id, idloc, missionServiceData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/missions/${id}/services/${idloc}`, missionServiceData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeMissionService(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/missions/${id}/services/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
