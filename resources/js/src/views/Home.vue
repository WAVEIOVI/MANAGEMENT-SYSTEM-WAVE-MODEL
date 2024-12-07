<template>
  <div>
    <!-- faq search section -->
    <section>
      <b-card
        :img-src="require('@/assets/images/banner/parallax-4.jpg')"
        img-top
        img-alt="card img"
      >
        <b-card-body class="text-center">
          <h2>
            SS PLUS Management System
          </h2>
          <h2>
            WAVE.sys Model
          </h2>
          <b-card-text>
            By WAVE IO
          </b-card-text>
        </b-card-body>
      </b-card>
    </section>
    <section>
      <b-card
        border-variant="primary"
        title="WAVE.sys LOGO"
        bg-variant="transparent"
        class="shadow-none"
      >
        <b-card-text>
          WE ARE THE WAVE
        </b-card-text>
      </b-card>
    </section>
    <!-- contact us -->
    <section class="faq-contact">
      <b-row class="mt-5 pt-75 text-center">
        <b-col cols="12">
          <h2>You still have a question?</h2>
          <b-card-text class="mb-3">
            You can always contact us. We will answer to you shortly!
          </b-card-text>
        </b-col>
        <b-col sm="6">
          <b-card
            class="shadow-none py-1 faq-contact-card"
          >
            <b-avatar
              size="42"
              rounded
              variant="light-primary"
              class="mb-2"
            >
              <feather-icon
                icon="PhoneCallIcon"
                size="18"
              />
            </b-avatar>
            <h4>+ (216) 22 036 238</h4>
            <span class="text-body">We are always happy to help!</span>
          </b-card>
        </b-col>
        <b-col sm="6">
          <b-card
            class="shadow-none py-1 faq-contact-card"
          >
            <b-avatar
              size="42"
              rounded
              variant="light-primary"
              class="mb-2"
            >
              <feather-icon
                icon="MailIcon"
                size="18"
              />
            </b-avatar>
            <h4>waveio.tn@hgmail.com</h4>
            <span class="text-body">Best way to get answer faster!</span>
          </b-card>
        </b-col>
      </b-row>
    </section>
    <!--/ contact us -->
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  //   BForm,
  //   BInputGroup,
  //   BFormInput,
  BCardText,
  //   BInputGroupPrepend,
  //   BTabs,
  //   BTab,
  //   BImg,
  BRow,
  BCol,
  BAvatar,
} from 'bootstrap-vue'
// import FaqQuestionAnswer from './FaqQuestionAnswer.vue'

export default {
  components: {
    // BForm,
    BCard,
    BRow,
    BCol,
    BAvatar,
    BCardBody,
    // BInputGroup,
    // BFormInput,
    BCardText,
    // BInputGroupPrepend,
    // BTabs,
    // BTab,
    // BImg,
    // FaqQuestionAnswer,
  },
}
</script>

    <style lang="scss">
    @import '~@resources/scss/vue/pages/page-faq.scss';
    </style>
