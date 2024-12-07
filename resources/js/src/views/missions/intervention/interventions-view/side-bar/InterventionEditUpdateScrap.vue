<template>
  <b-sidebar
    id="update-intervention-scrap-sidebar"
    :visible="isUpdateInterventionScrapSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-update-intervention-scrap-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Scrap List
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>
      <b-card-body>
        <!-- services List -->
        <b-list-group
          v-for="(scrap,index) in scrapData"
          :key="index"
        >
          <b-list-group-item
            class="flex-column align-items-start"
          >
            <div>
              <h6 class="mb-1 text-white">
                {{ scrap.equipment_type }}
              </h6>
            </div>
            <div>
              <h6 class="mb-1 text-white">
                Quantity: {{ scrap.quantity }}
              </h6>
            </div>
            <b-card-text class="mb-1">
              <b-form-rating
                id="rating-disabled"
                v-model="scrap.equipment_status"
                variant="warning"
                no-border
                disabled
                inline
              />
            </b-card-text>
          </b-list-group-item>
        </b-list-group>
      </b-card-body>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BListGroup, BListGroupItem, BCardBody, BFormRating,
} from 'bootstrap-vue'
// import router from '@/router'
// import store from '@/store'
// import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BSidebar,
    BListGroup,
    BListGroupItem,
    BCardBody,
    BFormRating,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isUpdateInterventionScrapSidebarActive',
    event: 'update:is-update-intervention-scrap-sidebar-active',
  },
  props: {
    isUpdateInterventionScrapSidebarActive: {
      type: Boolean,
      required: true,
    },
    scrapData: {
      type: Array,
      required: true,
    },
  },
}
</script>

    <style lang="scss">
    @import '~@resources/scss/vue/libs/vue-select.scss';

    #update-intervention-scrap-sidebar {
      .vs__dropdown-menu {
        max-height: 200px !important;
      }
    }
    </style>
