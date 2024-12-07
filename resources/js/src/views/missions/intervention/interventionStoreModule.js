import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {

    // ------------------------------------------------
    //   Intervention
    // ------------------------------------------------
    fetchCustomers() {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/customers')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

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
    // ------------------------------------------------
    // OrdersCustomer
    // ------------------------------------------------
    fetchCustomerOrders(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/customers/${id}/orders`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // ------------------------------------------------
    //   Intervention
    // ------------------------------------------------
    fetchInterventions(_ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/interventions', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchIntervention(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/interventions/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addIntervention(ctx, interventionData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/interventions', interventionData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateIntervention(ctx, { id, interventionData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/interventions/${id}`, interventionData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeIntervention(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/interventions/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    //   Customer Report
    // ------------------------------------------------
    fetchCustomerReport(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/interventions/${id}/customer_report`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateCustomerReport(ctx, { id, reportData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/interventions/${id}/customer_report`, reportData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    //   Customer Satisfaction
    // ------------------------------------------------
    fetchCustomerSatisfaction(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/interventions/${id}/customer_satisfaction`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateCustomerSatisfaction(ctx, { id, satisfactionData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/interventions/${id}/customer_satisfaction`, satisfactionData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
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
    // ------------------------------------------------
    // Services Mission
    // ------------------------------------------------
    fetchInterventionServices(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/missions/${id}/services`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    //   General Checklist
    // ------------------------------------------------
    fetchGeneralChecklist(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/interventions/${id}/general_checklist`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateGeneralChecklist(ctx, { id, generalChecklistData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/interventions/${id}/general_checklist`, generalChecklistData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    //   Material Checklist
    // ------------------------------------------------
    fetchMaterialChecklist(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/interventions/${id}/material_checklist`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateMaterialChecklist(ctx, { id, materialChecklistData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/interventions/${id}/material_checklist`, materialChecklistData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    //   Area Checklist
    // ------------------------------------------------
    fetchAreaChecklist(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/interventions/${id}/work_area_checklist`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateAreaChecklist(ctx, { id, areaChecklistData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/interventions/${id}/work_area_checklist`, areaChecklistData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    //   Equipment
    // ------------------------------------------------
    fetchParkEquipments() {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/equipments/search')
          .then(response => {
            console.log('Response:', response)
            resolve(response)
          })
          .catch(error => {
            console.log('Error:', error)
            reject(error)
          })
      })
    },
    fetchEquipments(_ctx, { queryParams }) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/equipments/search?limit=1', {
            search: { value: queryParams.search },
          })
          .then(response => {
            console.log('Response:', response)
            resolve(response)
          })
          .catch(error => {
            console.log('Error:', error)
            reject(error)
          })
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
    attachEquipment(_ctx, { id, resources }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/interventions/${id}/equipments/attach`, {
            resources: [resources],
          })
          .then(response => {
            console.log('Response:', response)
            resolve(response)
          })
          .catch(error => {
            console.log('Error:', error)
            reject(error)
          })
      })
    },
    addTasks(ctx, { id, tasksData }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/interventions/${id}/tasks`, tasksData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    // Checked Equipment
    // ------------------------------------------------
    fetchCheckedEquipments(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/interventions/${id}/tasks`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    // Intervention Tasks
    // ------------------------------------------------
    fetchInterventionTasks(_ctx, { id, queryParams }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/interventions/${id}/tasks/search?limit=${queryParams.limit}&page=${queryParams.page}`, {
            search: { value: queryParams.search },
          })
          .then(response => {
            console.log('Response:', queryParams)
            console.log('Response:', response)
            resolve(response)
          })
          .catch(error => {
            console.log('Error:', error)
            reject(error)
          })
      })
    },

    fetchEquipmentTasks(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/interventions/${id}/tasks/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateEquipmentTasks(ctx, { id, idloc, equipmentTasksData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/interventions/${id}/tasks/${idloc}`, equipmentTasksData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeEquipmentTasks(ctx, { id, idloc }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/interventions/${id}/tasks/${idloc}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
