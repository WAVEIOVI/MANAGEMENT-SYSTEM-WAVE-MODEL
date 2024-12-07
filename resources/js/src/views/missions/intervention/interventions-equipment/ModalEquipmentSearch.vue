<template>
  <b-modal
    id="modal-equipment-search"
    ok-only
    ok-title="Accept"
    centered
    size="lg"
    title="Large Modal"
  >
    <b-card-text>
      {{ parkSearchEquipmentData }}
    </b-card-text>
  </b-modal>
</template>

<script>
import {

  BModal,
  VBModal,
  BCardText,
  //   BCardBody,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
    BCardText,
    // BCardBody,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    parkSearchEquipmentData: {
      type: Array,
      required: true,
    },
  },
}
</script>

  <style lang="scss">
  @import "~@resources/scss/base/pages/app-ecommerce-details.scss";
  </style>
