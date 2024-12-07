<template>
  <b-modal
    id="resource-management-process"
    title="4.1.3.5 Resource Management Process"
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
        <b-card
          title="4.5 Resource Management Process Document"
        >
          <div
            class="blog-content"
          >
            <h5>
              Document Overview:
            </h5>
            <p>
              This document provides an in-depth guide to the Resource Management Process at SS PLUS, focusing on the management of both human and material resources. Effective resource management is essential for optimizing workforce capabilities and ensuring the availability of necessary materials to support operational activities.
            </p>
            <h5 class="mb-1">
              1. Human Resources Management:
            </h5>
            <h5>
              Objective:
            </h5>
            <p>
              Efficiently manage human resources to ensure a skilled and motivated workforce that aligns with the goals of SS PLUS.
            </p>
            <h5>
              Key Steps:
            </h5>
            <ol class="mb-2">
              <li>Recruitment and Onboarding: Implement effective recruitment strategies and onboarding processes to attract and integrate qualified professionals into the organization.</li>
              <li>Training and Development: Provide ongoing training and development opportunities to enhance the skills and capabilities of the workforce.</li>
              <li>Performance Management: Establish a comprehensive performance management system to assess, recognize, and develop employee performance.</li>
            </ol>
            <h5 class="mb-1">
              2. Material Resources Management:
            </h5>
            <h5>
              Objective:
            </h5>
            <p>
              Effectively manage material resources to ensure the availability of necessary equipment and supplies for operational activities.
            </p>
            <h5>
              Key Steps:
            </h5>
            <ol class="mb-2">
              <li>Inventory Control: Implement robust inventory control systems to monitor and manage material resources efficiently.</li>
              <li>Supplier Management: Establish effective relationships with suppliers to ensure timely and cost-effective procurement of materials.</li>
              <li>Maintenance and Replacement: Regularly assess the condition of equipment and materials, and plan for maintenance or replacement as needed.</li>
            </ol>
            <h5 class="mt-4">
              Usage Guidelines:
            </h5>
            <ul class="mb-2">
              <li>This Resource Management Process Document is to be followed by all staff involved in human and material resources management at SS PLUS.</li>
              <li>Regular training sessions will be conducted to ensure staff familiarity with the Resource Management Process and any updates to its procedures.</li>
            </ul>
            <h5 class="mt-4">
              Continuous Improvement:
            </h5>
            <p>
              SS PLUS is committed to continuously improving its Resource Management Process. Feedback from staff members and assessments of resource utilization will be actively utilized to drive enhancements and optimize resource efficiency.
            </p>
            <h4 class="mt-5">
              Document Approval:
            </h4>
            <p>
              This Resource Management Process Document is approved by:
            </p>
          </div>
          <hr class="my-2">
          <div class="d-flex align-items-center justify-content-between" />
        </b-card>
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
