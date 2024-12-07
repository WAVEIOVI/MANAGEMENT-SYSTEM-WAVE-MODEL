<template>
  <!-- card 1 -->
  <b-card
    bg-variant="transparent"
    border-variant="primary"
  >
    <intervention-edit-update-scrap
      :is-update-intervention-scrap-sidebar-active.sync="isUpdateInterventionScrapSidebarActive"
      :scrap-data="scrapData"
    />
    <div class="d-flex justify-content-center">
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        variant="gradient-primary"
        block
        @click="isUpdateInterventionScrapSidebarActive = true"
      >
        <feather-icon
          icon="Trash2Icon"
          class="mr-50"
        />
        <span class="align-middle">Scrap Management</span>
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

import InterventionEditUpdateScrap from './side-bar/InterventionEditUpdateScrap.vue'

export default {
  components: {
    BCard,
    BButton,
    InterventionEditUpdateScrap,
  },
  directives: {
    Ripple,
  },
  setup() {
    const isUpdateInterventionScrapSidebarActive = ref(false)
    const scrapData = ref()
    store.dispatch('app-intervention/fetchInterventionScraps', { id: router.currentRoute.params.id })
      .then(response => { scrapData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          scrapData.value = undefined
        }
      })
    return {
      scrapData,
      isUpdateInterventionScrapSidebarActive,
    }
  },
}
</script>
