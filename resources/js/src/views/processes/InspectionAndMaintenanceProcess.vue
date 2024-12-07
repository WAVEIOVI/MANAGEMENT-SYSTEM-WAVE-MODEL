<template>
  <b-modal
    id="inspection-and-maintenance-process"
    title="4.1.3.2 Inspection and Maintenance Process"
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
            This document provides a detailed guide to the Inspection and Maintenance Process at SS PLUS, outlining the key steps and procedures involved in ensuring the reliability and functionality of fire protection equipment. The Inspection and Maintenance Process is crucial for safeguarding clients and maintaining compliance with industry standards.
          </p>
          <h5 class="mb-1">
            1. Scheduling and Coordination:
          </h5>
          <h5>
            Objective:
          </h5>
          <p>
            Efficiently schedule and coordinate inspection and maintenance activities to minimize disruptions and ensure timely service delivery.
          </p>
          <h5>
            Key Steps:
          </h5>
          <ol class="mb-2">
            <li>Receive service requests and inquiries from clients.</li>
            <li>Assign qualified personnel to assess service requirements and determine suitable schedules.</li>
            <li>Coordinate with clients to establish convenient inspection and maintenance timelines.</li>
          </ol>
          <h5 class="mb-1">
            2. On-Site Inspection and Maintenance:
          </h5>
          <h5>
            Objective:
          </h5>
          <p>
            Conduct thorough on-site inspections and maintenance activities to ensure the proper functioning of fire protection equipment.
          </p>
          <h5>
            Key Steps:
          </h5>
          <ol class="mb-2">
            <li>Deploy qualified technicians to perform on-site inspections of fire protection equipment.</li>
            <li>Execute routine maintenance tasks and address any identified issues promptly.</li>
            <li>Ensure compliance with relevant safety protocols during on-site activities.</li>
          </ol>
          <h5 class="mb-1">
            3. Service Planning and Implementation:
          </h5>
          <h5>
            Objective:
          </h5>
          <p>
            Plan and implement comprehensive service strategies to enhance the overall performance and longevity of fire protection equipment.
          </p>
          <h5>
            Key Steps:
          </h5>
          <ol class="mb-2">
            <li>Develop service plans based on inspection findings and client requirements.</li>
            <li>Implement strategic maintenance activities to address potential risks and ensure equipment reliability.</li>
            <li>Provide clients with detailed reports and recommendations for further actions if necessary.</li>
          </ol>
          <h5 class="mb-1">
            4. Client Communication:
          </h5>
          <h5>
            Objective:
          </h5>
          <p>
            Maintain transparent and open communication with clients throughout the inspection and maintenance process, providing updates and addressing any concerns.
          </p>
          <h5>
            Key Steps:
          </h5>
          <ol class="mb-2">
            <li>Regularly update clients on the progress of inspection and maintenance activities.</li>
            <li>Address any client inquiries or concerns promptly and professionally.</li>
            <li>Provide comprehensive reports upon completion of inspection and maintenance tasks.</li>
          </ol>
          <h5 class="mt-4">
            Usage Guidelines:
          </h5>
          <ul class="mb-2">
            <li>This Inspection and Maintenance Process Document is to be followed by all staff involved in inspection and maintenance activities at SS PLUS.</li>
            <li>Regular training sessions will be conducted to ensure staff familiarity with the Inspection and Maintenance Process and any updates to its procedures.</li>
          </ul>
          <h5 class="mt-4">
            Continuous Improvement:
          </h5>
          <p>
            SS PLUS is committed to continuously improving its Inspection and Maintenance Process. Feedback from staff members and clients will be actively sought to identify areas for enhancement and optimization.
          </p>
          <h4 class="mt-5">
            Document Approval:
          </h4>
          <p>
            This Inspection and Maintenance Process Document is approved by:
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
