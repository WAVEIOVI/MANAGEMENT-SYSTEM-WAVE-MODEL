<template>
  <b-card
    no-body
    class="border-primary"
  >
    <!-- <b-card-header class="d-flex justify-content-between align-items-center pt-75 pb-25">
      <h5 class="mb-0">
        Actions
      </h5>
    </b-card-header> -->

    <b-card-body>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        block
      >
        Send Mail
      </b-button>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="outline-primary"
        block
      >
        Print
      </b-button>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="outline-primary"
        block
      >
        Download
      </b-button>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BCard,
    BCardBody,
    BButton,
  },
}
</script>

<style>

</style>
