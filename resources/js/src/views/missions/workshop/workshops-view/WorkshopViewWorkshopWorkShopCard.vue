<template>
  <!-- card 1 -->
  <b-card
    bg-variant="transparent"
    border-variant="primary"
  >
    <div class="d-flex justify-content-center">
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        variant="gradient-primary"
        block
      >
        <feather-icon
          icon="HomeIcon"
          class="mr-50"
        />
        <span class="align-middle">Work Shop</span>
      </b-button>
    </div>
  </b-card>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import {
  BCard, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BButton,
  },
  directives: {
    Ripple,
  },
}
</script>
