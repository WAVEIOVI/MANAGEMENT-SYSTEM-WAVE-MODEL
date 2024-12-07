import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // ------------------------------------------------
    // ScrapIntervention
    // ------------------------------------------------
    fetchInterventionScraps(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/interventions/${id}/customer_scraps`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchInterventionScrap(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/interventions/${id}/customer_scraps/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addInterventionScrap(ctx, { id, interventionData }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/interventions/${id}/customer_scraps`, interventionData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateInterventionScrap(ctx, { id, idloc, interventionScrapData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/interventions/${id}/customer_scraps/${idloc}`, interventionScrapData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeInterventionScrap(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/interventions/${id}/customer_scraps/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
