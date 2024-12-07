<template>
  <b-modal
    id="sales-process-document"
    title="4.1.3.1 Sales Process Document"
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
            This document provides a detailed guide to the Sales Process at SS PLUS, outlining the key steps and procedures involved in the sale of fire protection equipment. The Sales Process is critical for establishing and maintaining client relationships, meeting their needs, and ensuring the successful delivery of SS PLUS's services.
          </p>
          <h5 class="mb-1">
            1. Lead Generation:
          </h5>
          <h5>
            Objective:
          </h5>
          <p>
            Identify potential clients and establish initial engagement to understand their fire protection equipment needs.
          </p>
          <h5>
            Key Steps:
          </h5>
          <ol class="mb-2">
            <li>Utilize various channels, including marketing campaigns and industry events, for lead generation.</li>
            <li>Initiate contact with potential clients to assess their requirements and challenges.</li>
            <li>Document client information and inquiries for further analysis.</li>
          </ol>
          <h5 class="mb-1">
            2. Proposal and Negotiation:
          </h5>
          <h5>
            Objective:
          </h5>
          <p>
            Prepare and submit comprehensive proposals outlining services and pricing, followed by negotiation and agreement on terms.
          </p>
          <h5>
            Key Steps:
          </h5>
          <ol class="mb-2">
            <li>Develop detailed proposals that clearly outline the scope of services, pricing, and terms.</li>
            <li>Present proposals to clients and address any queries or concerns.</li>
            <li>Engage in negotiation to reach mutually agreed-upon terms and conditions.</li>
          </ol>
          <h5 class="mb-1">
            3. Contractual Agreements:
          </h5>
          <h5>
            Objective:
          </h5>
          <p>
            Formalize agreements through contracts and documentation, following a thorough review and approval process.
          </p>
          <h5>
            Key Steps:
          </h5>
          <ol class="mb-2">
            <li>Prepare contractual agreements detailing the terms and conditions discussed during negotiations.</li>
            <li>Review contracts internally to ensure compliance with organizational policies and legal requirements.</li>
            <li>Seek approval from the relevant authorities before finalizing and executing contracts.</li>
          </ol>
          <h5 class="mt-4">
            Usage Guidelines:
          </h5>
          <ul class="mb-2">
            <li>This Sales Process Document is to be followed by all staff involved in sales activities at SS PLUS.</li>
            <li>Regular training sessions will be conducted to ensure staff familiarity with the Sales Process and any updates to its procedures.</li>
          </ul>
          <h5 class="mt-4">
            Continuous Improvement:
          </h5>
          <p>
            SS PLUS is committed to continuously improving its Sales Process. Feedback from staff members and clients will be actively sought to identify areas for enhancement and optimization.
          </p>
          <h4 class="mt-5">
            Document Approval:
          </h4>
          <p>
            This Sales Process Document is approved by:
          </p>
        </div>
        <hr class="my-2">

        <div class="d-flex align-items-center justify-content-between" />
      </b-col>
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
