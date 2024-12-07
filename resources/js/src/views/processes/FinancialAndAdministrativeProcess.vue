<template>
  <b-modal
    id="financial-and-administrative-process"
    title="4.1.3.4 Financial And Administrative Process"
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
            This document provides a comprehensive guide to the Financial and Administrative Process at SS PLUS, encompassing financial planning, reporting, and administrative procedures. The Financial and Administrative Process is crucial for ensuring effective financial management and streamlined administrative operations within the organization.
          </p>
          <h5 class="mb-1">
            1. Financial Planning and Reporting:
          </h5>
          <h5>
            Objective:
          </h5>
          <p>
            Develop and implement robust financial planning strategies and reporting mechanisms to support informed decision-making.
          </p>
          <h5>
            Key Steps:
          </h5>
          <ol class="mb-2">
            <li>Formulate comprehensive financial plans that align with organizational goals and objectives.</li>
            <li>Regularly review financial performance and generate accurate and timely financial reports.</li>
            <li>Provide financial insights to support strategic decision-making and planning.</li>
          </ol>
          <h5 class="mb-1">
            2. Administrative Processes:
          </h5>
          <h5>
            Objective:
          </h5>
          <p>
            Establish efficient administrative processes to support the day-to-day operations of SS PLUS.
          </p>
          <h5>
            Key Steps:
          </h5>
          <ol class="mb-2">
            <li>Develop standardized administrative procedures to ensure consistency and efficiency.</li>
            <li>Implement effective record-keeping and documentation practices for administrative tasks.</li>
            <li>Regularly assess and optimize administrative processes for continuous improvement.</li>
          </ol>
          <h5 class="mt-4">
            Usage Guidelines:
          </h5>
          <ul class="mb-2">
            <li>This Financial and Administrative Process Document is to be followed by all staff involved in financial and administrative roles at SS PLUS.</li>
            <li>Regular training sessions will be conducted to ensure staff familiarity with the Financial and Administrative Process and any updates to its procedures.</li>
          </ul>
          <h5 class="mt-4">
            Continuous Improvement:
          </h5>
          <p>
            SS PLUS is committed to continuously improving its Financial and Administrative Process. Feedback from staff and insights from financial reports will be actively utilized to drive enhancements and optimize financial and administrative efficiency.
          </p>
          <h4 class="mt-5">
            Document Approval:
          </h4>
          <p>
            This Financial and Administrative Process Document is approved by:
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
