<template>
  <b-row>
    <!-- blogs -->
    <b-col cols="12">
      <b-card :title="$t('1. introduction title')">
        <div
          class="blog-content"
        >
          <!-- Section 1 -->
          <h4 class="mt-3">
            {{ $t('1.1 Purpose') }}
          </h4>
          <p>
            {{ $t('The purpose of WAVE.sys') }}
          </p>

          <!-- Section 2 -->
          <h4 class="mt-3">
            {{ $t('1.2 Scope title') }}
          </h4>
          <p>
            {{ $t('1.2 Scope paragraph01') }}
          </p>
          <p class="mt-3">
            {{ $t('1.2 Scope paragraph02') }}
          </p>
        </div>
        <hr class="my-2">

        <div class="d-flex align-items-center justify-content-between">
          <!-- dropdown -->
          <!-- <div class="blog-detail-share">
            <b-dropdown
              variant="link"
              toggle-class="p-0"
              no-caret
              right
            >
              <template #button-content>
                <feather-icon
                  size="21"
                  icon="Share2Icon"
                  class="text-body"
                />
              </template>
              <b-dropdown-item
                v-for="icon in socialShareIcons"
                :key="icon"
                href="#"
              >
                <feather-icon
                  :icon="icon"
                  size="18"
                />
              </b-dropdown-item>
            </b-dropdown>
          </div> -->
          <!--/ dropdown -->
        </div>
      </b-card>
    </b-col>
    <!--/ blogs -->
  </b-row>
</template>

<script>
import {
//   BMedia,
  //   BAvatar,
  //   BMediaAside,
//   BMediaBody,
//   BLink,
  BCard,
  BRow,
  BCol,
  //   BBadge,
  //   BCardText,
//   BDropdown,
//   BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    // BMedia,
    // BAvatar,
    // BMediaAside,
    // BMediaBody,
    // BLink,
    BCard,
    BRow,
    BCol,
    // BBadge,
    // BCardText,
    // BDropdown,
    // BDropdownItem,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      socialShareIcons: ['GithubIcon', 'GitlabIcon', 'FacebookIcon', 'TwitterIcon', 'LinkedinIcon'],
    }
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
