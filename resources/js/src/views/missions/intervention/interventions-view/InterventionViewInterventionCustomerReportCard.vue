<template>
  <!-- card 1 -->
  <b-card
    bg-variant="transparent"
    border-variant="primary"
  >
    <intervention-edit-update-report
      :is-update-intervention-report-sidebar-active.sync="isUpdateInterventionReportSidebarActive"
      :report-data="reportData"
      @submit="onSubmit"
    />
    <div class="d-flex justify-content-center">
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        variant="gradient-primary"
        block
        @click="isUpdateInterventionReportSidebarActive = true"
      >
        <feather-icon
          icon="Edit3Icon"
          class="mr-50"
        />
        <span class="align-middle">Customer Report</span>
      </b-button>
    </div>
  </b-card>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import {
  BCard, BButton,
} from 'bootstrap-vue'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import InterventionEditUpdateReport from './side-bar/InterventionEditUpdateReport.vue'

export default {
  components: {
    BCard,
    BButton,
    InterventionEditUpdateReport,
  },
  directives: {
    Ripple,
  },
  setup() {
    const reportData = ref()
    const toast = useToast()
    const isUpdateInterventionReportSidebarActive = ref(false)
    store.dispatch('app-intervention/fetchCustomerReport', { id: router.currentRoute.params.id })
      .then(response => { reportData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          reportData.value = undefined
        }
      })
    const onSubmit = () => {
      store
        .dispatch('app-intervention/updateCustomerReport', { reportData: reportData.value, id: router.currentRoute.params.id })
        .then(() => {
          console.log('test', reportData)
          toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              text: 'Form successfully updated!',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
    }

    return {
      onSubmit,
      reportData,
      isUpdateInterventionReportSidebarActive,
    }
  },
}
</script>
