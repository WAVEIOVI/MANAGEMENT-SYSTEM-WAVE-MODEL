import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {

    // ------------------------------------------------
    //   Certificate
    // ------------------------------------------------
    fetchCertificates(_ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/certificates/search?limit=${queryParams.limit}&page=${queryParams.page}`, {
            search: { value: queryParams.search },
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCertificate(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/certificates/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCertificate(ctx, certificateData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/certificates', certificateData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateCertificate(ctx, { id, certificateData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/certificates/${id}`, certificateData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeCertificate(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/certificates/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    // Intervention
    // ------------------------------------------------
    fetchInterventions() {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/interventions')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
