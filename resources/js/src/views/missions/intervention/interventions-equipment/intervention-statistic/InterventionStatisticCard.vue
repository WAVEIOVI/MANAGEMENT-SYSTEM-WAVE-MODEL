<template>
  <div>
    <intervention-view-checked-equipment-list
      :is-checked-equipment-list-sidebar-active.sync="isCheckedEquipmentListSidebarActive"
    />
    <!-- Stats Card Horizontal -->
    <b-row class="match-height">
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="DatabaseIcon"
          statistic-title="Park's Equipment"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="CheckIcon"
          color="success"
          statistic-title="Checked Equipment"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-horizontal
          icon="XIcon"
          color="danger"
          statistic-title="Non Checked Equipment"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <b-card no-body>
          <b-card-body class="d-flex justify-content-between align-items-center">
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="primary"
              @click="isCheckedEquipmentListSidebarActive = true"
            >
              <span class="align-middle">Checked Equipment List</span>
            </b-button>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
// import store from '@/store'
import { ref } from '@vue/composition-api'
import {
  BRow, BCol, BButton, BCard, BCardBody,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import InterventionViewCheckedEquipmentList from './InterventionViewCheckedEquipmentList.vue'
// import metaStoreModule from './metaCustomersStoreModule'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BCard,
    BCardBody,
    StatisticCardHorizontal,
    InterventionViewCheckedEquipmentList,
  },
  directives: {
    Ripple,
  },

  setup() {
    const isCheckedEquipmentListSidebarActive = ref(false)
    return {
      isCheckedEquipmentListSidebarActive,
    }
  },
}
</script>
