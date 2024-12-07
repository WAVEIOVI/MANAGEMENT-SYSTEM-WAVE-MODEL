<template>
  <b-modal
    id="material-resources-management"
    title="Material Resources Management"
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
        <!-- <b-card> -->
        <div
          class="blog-content"
        >
          <!-- Section 1 -->
          <h5 class="mt-3">
            Overview:
          </h5>
          <p>
            This document outlines the Material Resources Management Procedure at SS PLUS, providing detailed instructions on the effective management of material resources essential for the organization's operations. The Material Resources Management Procedure covers aspects such as procurement, inventory management, and utilization to ensure optimal resource allocation and support for SS PLUS's objectives.
          </p>
          <h5 class="mt-2">
            Objective:
          </h5>
          <p>
            Establish systematic processes for the acquisition, utilization, and tracking of material resources, ensuring the availability and efficiency of resources to meet organizational needs.
          </p>
          <h5 class="mt-2">
            Key Steps:
          </h5>
          <h4 class="mt-3">
            1. Procurement:
          </h4>
          <h5 class="mt-2">
            1.1 Vendor Selection:
          </h5>
          <ul class="mb-2">
            <li>Conduct a comprehensive assessment of potential vendors based on factors such as reliability, quality, and cost-effectiveness.</li>
            <li>Establish a list of approved vendors for different categories of material resources.</li>
          </ul>
          <h5 class="mt-2">
            1.2 Purchase Requisition:
          </h5>
          <ul class="mb-2">
            <li>Initiate the procurement process through the submission of a purchase requisition outlining the specific material resource requirements.</li>
            <li>Ensure proper authorization and documentation for purchase requisitions.</li>
          </ul>
          <h4 class="mt-3">
            2. Inventory Management:
          </h4>
          <h5 class="mt-2">
            2.1 Receiving and Inspection:
          </h5>
          <ul class="mb-2">
            <li>Establish procedures for receiving and inspecting incoming material resources to ensure quality and quantity compliance.</li>
            <li>Document and report any discrepancies or issues identified during the inspection process.</li>
          </ul>
          <h5 class="mt-2">
            2. Storage and Organization:
          </h5>
          <ul class="mb-2">
            <li>Implement organized storage systems for material resources based on type, usage frequency, and shelf life.</li>
            <li>Regularly conduct inventory checks and audits to maintain accuracy and identify obsolete or surplus items.</li>
          </ul>
          <h4 class="mt-3">
            3. Utilization and Allocation:
          </h4>
          <h5 class="mt-2">
            3.1 Resource Allocation:
          </h5>
          <ul class="mb-2">
            <li>Establish a process for allocating material resources to different departments or projects based on priority and need.</li>
            <li>Ensure fair and efficient distribution of resources to support operational requirements.</li>
          </ul>
          <h5 class="mt-2">
            3. Usage Tracking:
          </h5>
          <ul class="mb-2">
            <li>Implement systems to track the usage of material resources, including consumption rates and replenishment needs.</li>
            <li>Utilize technology solutions for real-time tracking and reporting.</li>
          </ul>
          <h4 class="mt-4">
            Usage Guidelines:
          </h4>
          <ul class="mb-2">
            <li>This Material Resources Management Procedure Document is to be followed by all staff involved in material resources management activities at SS PLUS.</li>
            <li>Regular training sessions will be conducted to ensure staff proficiency in executing material resources management tasks and any updates to its procedures.</li>
          </ul>
          <h4 class="mt-5">
            Continuous Improvement:
          </h4>
          <ul class="mb-2">
            <p>
              SS PLUS is committed to continuous improvement in its Material Resources Management Procedure. Feedback from staff members, insights from inventory management, and evolving industry standards will be actively utilized to optimize material resources management strategies.
            </p>
          </ul>
          <h4 class="mt-5">
            Document Approval:
          </h4>
          <p>
            This Material Resources Management Procedure Document is approved by:
          </p>
        </div>
        <!-- </b-card> -->
      </b-col>
      <!--/ blogs -->
    </b-row>

  </b-modal>
</template>
<script>
import {
//   BCard,
  BModal,
  BRow,
  BCol,
} from 'bootstrap-vue'

export default {
  components: {
    // BCard,
    BModal,
    BRow,
    BCol,
  },
}
</script>
