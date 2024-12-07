<template>
  <!-- card 1 -->
  <b-card
    bg-variant="transparent"
    border-variant="primary"
  >
    <intervention-edit-update-satisfaction
      :is-update-intervention-satisfaction-sidebar-active.sync="isUpdateInterventionSatisfactionSidebarActive"
      :satisfaction-data="satisfactionData"
      @submit="onSubmit"
    />
    <div class="d-flex justify-content-center">
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        variant="gradient-primary"
        block
        @click="isUpdateInterventionSatisfactionSidebarActive = true"
      >
        <feather-icon
          icon="SmileIcon"
          class="mr-50"
        />
        <span class="align-middle">Customer Satisfaction</span>
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
import InterventionEditUpdateSatisfaction from './side-bar/InterventionEditUpdateSatisfaction.vue'

export default {
  components: {
    BCard,
    BButton,
    InterventionEditUpdateSatisfaction,
  },
  directives: {
    Ripple,
  },
  setup() {
    const satisfactionData = ref()
    const toast = useToast()
    const isUpdateInterventionSatisfactionSidebarActive = ref(false)
    store.dispatch('app-intervention/fetchCustomerSatisfaction', { id: router.currentRoute.params.id })
      .then(response => { satisfactionData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          satisfactionData.value = undefined
        }
      })
    const onSubmit = () => {
      store
        .dispatch('app-intervention/updateCustomerSatisfaction', { satisfactionData: satisfactionData.value, id: router.currentRoute.params.id })
        .then(() => {
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
      satisfactionData,
      isUpdateInterventionSatisfactionSidebarActive,
    }
  },
}
</script>
