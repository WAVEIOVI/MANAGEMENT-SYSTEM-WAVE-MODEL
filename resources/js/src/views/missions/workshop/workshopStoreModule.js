import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {

    // ------------------------------------------------
    //   Workshop
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
    //   Workshop
    // ------------------------------------------------
    fetchWorkshops(_ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/workshops', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchWorkshop(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/workshops/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addWorkshop(ctx, workshopData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/workshops', workshopData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateWorkshop(ctx, { id, workshopData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/workshops/${id}`, workshopData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeWorkshop(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/workshops/${id}`)
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
          .get(`/api/workshops/${id}/customer_report`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateCustomerReport(ctx, { id, reportData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/workshops/${id}/customer_report`, reportData)
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
          .get(`/api/workshops/${id}/customer_satisfaction`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateCustomerSatisfaction(ctx, { id, satisfactionData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/workshops/${id}/customer_satisfaction`, satisfactionData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    // ScrapWorkshop
    // ------------------------------------------------
    fetchWorkshopScraps(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/workshops/${id}/customer_scraps`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // ------------------------------------------------
    // Services Mission
    // ------------------------------------------------
    fetchWorkshopServices(ctx, { id }) {
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
          .get(`/api/workshops/${id}/general_checklist`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateGeneralChecklist(ctx, { id, generalChecklistData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/workshops/${id}/general_checklist`, generalChecklistData)
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
          .get(`/api/workshops/${id}/material_checklist`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateMaterialChecklist(ctx, { id, materialChecklistData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/workshops/${id}/material_checklist`, materialChecklistData)
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
          .get(`/api/workshops/${id}/work_area_checklist`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateAreaChecklist(ctx, { id, areaChecklistData }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/workshops/${id}/work_area_checklist`, areaChecklistData)
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
          .post(`/api/workshops/${id}/equipments/attach`, {
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
          .post(`/api/workshops/${id}/tasks`, tasksData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
