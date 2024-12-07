<template>
  <b-modal
    id="quality-control-process"
    title="4.1.3.3 Quality Control Process"
    cancel-variant="outline-secondary"
    cancel-title="Close"
    size="lg"
    ok-only
    ok-title="Done"
    centered
  >
    <b-row>
      <!-- blogs -->
      <b-col cols="12">
        <div
          class="blog-content"
        >
          <h5>
            Document Overview:
          </h5>
          <p>
            This document provides a detailed guide to the Quality Control Process at SS PLUS, focusing on maintaining and improving the quality of operational activities, including the sale, inspection, and maintenance of fire protection equipment. The Quality Control Process is essential for ensuring that SS PLUS consistently meets or exceeds industry benchmarks.
          </p>
          <h5 class="mb-1">
            1. Internal Audits:
          </h5>
          <h5>
            Objective:
          </h5>
          <p>
            Conduct systematic internal audits to monitor and enhance the quality of operational processes at SS PLUS.
          </p>
          <h5>
            Key Steps:
          </h5>
          <ol class="mb-2">
            <li>Establish standardized procedures and protocols for quality assurance in all operational processes.</li>
            <li>Conduct regular internal audits to assess adherence to established quality standards.</li>
            <li>Identify areas for improvement and implement corrective actions based on audit findings.</li>
          </ol>
          <h5 class="mb-1">
            2. Client Feedback Integration:
          </h5>
          <h5>
            Objective:
          </h5>
          <p>
            Integrate client feedback mechanisms to collect, analyze, and act upon feedback for continuous improvement of services.
          </p>
          <h5>
            Key Steps:
          </h5>
          <ol class="mb-2">
            <li>Establish mechanisms for collecting and analyzing client feedback across all service touch-points.</li>
            <li>Regularly review client feedback to identify areas for improvement in operational processes.</li>
            <li>Implement corrective actions and enhancements based on the insights gained from client feedback.</li>
          </ol>
          <h5 class="mt-4">
            Usage Guidelines:
          </h5>
          <ul class="mb-2">
            <li>This Quality Control Process Document is to be followed by all staff involved in operational activities at SS PLUS.</li>
            <li>Regular training sessions will be conducted to ensure staff familiarity with the Quality Control Process and any updates to its procedures.</li>
          </ul>
          <h5 class="mt-4">
            Continuous Improvement:
          </h5>
          <p>
            SS PLUS is committed to continuously improving its Quality Control Process. Feedback from internal audits and client feedback will be actively utilized to drive enhancements and optimize operational quality.
          </p>
          <h4 class="mt-5">
            Document Approval:
          </h4>
          <p>
            This Quality Control Process Document is approved by:
          </p>
        </div>
        <hr class="my-2">
        <div class="d-flex align-items-center justify-content-between" />
      </b-col>
      <!--/ blogs -->
    </b-row>
  </b-modal>
</template>

<script>
import {
  BRow,
  BCol,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
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
