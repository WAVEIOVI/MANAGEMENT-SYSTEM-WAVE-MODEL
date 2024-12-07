import axios from '@axios'

export default {
  namespaced: true,
  state: {
    calendarOptions: [
      {
        color: 'danger',
        label: 'Prevision',
      },
      {
        color: 'success',
        label: 'Real',
      },
    ],
    selectedCalendars: ['Prevision', 'Real'],
  },
  getters: {},
  mutations: {
    SET_SELECTED_EVENTS(state, val) {
      state.selectedCalendars = val
    },
  },
  actions: {
    fetchEvents(ctx, { calendars }) {
      const filters = []
      if (calendars) {
        filters.push({ field: 'calendar', operator: 'in', value: calendars })
      }
      return new Promise((resolve, reject) => {
        axios
          .post('/api/plannings/search', {
            filters,
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addEvent(ctx, { event }) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/plannings', { event })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateEvent(ctx, { event }) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`/api/plannings/${event.id}`, { event })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeEvent(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/plannings/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
