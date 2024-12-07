<template>
  <b-card
    no-body
  >
    <!-- <b-card-text>
      <span>Documentation and examples for opting images (via </span>
      <code>&lt;b-img&gt;</code>
      <span>
        component) into responsive behavior (so they never become larger than their parent elements), optionally adding
        lightweight styles to them — all via props.
      </span>
    </b-card-text> -->

    <b-img
      :src="require('@/assets/images/pages/wavefire.jpg')"
      fluid
      class="w-100"
      alt="Responsive image"
    />
  </b-card>
</template>

<script>
import { BCard, BImg, BCardText } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
    // eslint-disable-next-line vue/no-unused-components
    BImg,
  },
}
</script>
