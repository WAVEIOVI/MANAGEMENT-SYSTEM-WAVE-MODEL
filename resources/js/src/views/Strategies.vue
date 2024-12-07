<template>
  <b-row>
    <!-- blogs -->
    <b-col cols="12">
      <b-card
        :title="$t('II. Strategies')"
      >
        <div
          class="blog-content"
        >
          <!-- Section 1 -->
          <h4 class="mt-4">
            {{ $t('2.1 Strategic Objectives title') }}
          </h4>
          <h5 class="mb-1">
            {{ $t('2.1.1 Innovate Through Technology title') }}
          </h5>
          <h5>
            {{ $t('2.1.1 subtitle01') }}
          </h5>
          <p>
            {{ $t('2.1.1 paragraph01') }}
          </p>
          <h5>
            {{ $t('2.1.1 subtitle02') }}
          </h5>
          <ul class="mb-2">
            <li>{{ $t('2.1.1 paragraph02 list01 item01') }}</li>
            <li>{{ $t('2.1.1 paragraph02 list01 item02') }}</li>
          </ul>
          <h5 class="mb-1">
            {{ $t('2.1.2 Enhance Client Safety and Satisfaction title') }}
          </h5>
          <h5>
            {{ $t('2.1.2 subtitle01') }}
          </h5>
          <p>
            {{ $t('2.1.2 paragraph01') }}
          </p>
          <h5>
            {{ $t('2.1.2 subtitle02') }}
          </h5>
          <ul class="mb-2">
            <li>{{ $t('2.1.2 paragraph02 list01 item01') }}</li>
            <li>{{ $t('2.1.2 paragraph02 list01 item02') }}</li>
          </ul>
          <h5 class="mb-1">
            {{ $t('2.1.3 Expand Market Presence title') }}
          </h5>
          <h5>
            {{ $t('2.1.3 subtitle01') }}
          </h5>
          <p>
            {{ $t('2.1.3 paragraph01') }}
          </p>
          <h5>
            {{ $t('2.1.3 subtitle02') }}
          </h5>
          <ul class="mb-2">
            <li>{{ $t('2.1.3 paragraph02 list01 item01') }}</li>
            <li>{{ $t('2.1.3 paragraph02 list01 item02') }}</li>
          </ul>
          <h5 class="mb-1">
            {{ $t('2.1.4 Optimize Operational Efficiency title') }}
          </h5>
          <h5>
            {{ $t('2.1.4 subtitle01') }}
          </h5>
          <p>
            {{ $t('2.1.4 paragraph01') }}
          </p>
          <h5>
            {{ $t('2.1.4 subtitle02') }}
          </h5>
          <ul class="mb-2">
            <li>{{ $t('2.1.4 paragraph02 list01 item01') }}</li>
            <li>{{ $t('2.1.4 paragraph02 list01 item02') }}</li>
          </ul>
        </div>
        <hr class="my-2">

        <div class="d-flex align-items-center justify-content-between" />
      </b-card>
    </b-col>
    <!--/ blogs -->
  </b-row>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
  methods: {
    tagsColor(tag) {
      if (tag === 'Quote') return 'light-info'
      if (tag === 'Gaming') return 'light-danger'
      if (tag === 'Fashion') return 'light-primary'
      if (tag === 'Video') return 'light-warning'
      if (tag === 'Food') return 'light-success'
      return 'light-primary'
    },
  },
}
</script>

<style lang="scss">
@import '~@resources/scss/vue/pages/page-blog.scss';
</style>
