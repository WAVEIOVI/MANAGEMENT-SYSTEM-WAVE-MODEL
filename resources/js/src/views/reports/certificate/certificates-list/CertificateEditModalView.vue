<template>
  <b-modal
    id="modal-certificate-view"
    cancel-variant="outline-secondary"
    cancel-title="Close"
    ok-title="Accept"
    size="lg"
    title="Inspection Certificate"
  >
    <!-- body -->
    <b-card-body>
      <b-card-text class="text-primary">
        Inspection Certificate {{ certificateData.certificate_id }}
      </b-card-text>
      <b-card-text>
        Inspection Date: {{ certificateData.intervention_date }}
      </b-card-text>
      <b-card-text>
        Next Inspection Date: {{ certificateData.next_intervention_date }}
      </b-card-text>
      <b-card-text>
        Customer Name: {{ certificateData.customer_id }} | {{ certificateData.customer_name }}
        <span>
          {{ certificateData.customer_phone }} | {{ certificateData.customer_email }}
        </span>
        <p>
          {{ certificateData.address_line1 }} {{ certificateData.address_line2 }} {{ certificateData.customer_postcode }} {{ certificateData.customer_city }} {{ certificateData.customer_country }}.
        </p>
      </b-card-text>
      <b-card-text>
        {{ certificateData.location_id }}
        <p>
          {{ certificateData.location_address }} {{ certificateData.location_postcode }} {{ certificateData.location_city }} {{ certificateData.location_country }}.
        </p>
      </b-card-text>
      <hr>
      <b-card-text>
        <b-list-group>
          <b-list-group-item>
            Total Inspected Equipment:
          </b-list-group-item>
          <b-list-group-item
            v-for="(count, equipment) in tasksPerIntervention"
            :key="equipment"
          >
            {{ equipment }}: {{ count }}
          </b-list-group-item>
        </b-list-group>
      </b-card-text>
      <b-card-text>
        <b-list-group>
          <b-list-group-item>
            Inspected Equipment List:
          </b-list-group-item>
          <b-list-group-item
            v-for="(count, equipment) in equipmentCombinationCount"
            :key="equipment"
          >
            {{ equipment }}: {{ count }}
          </b-list-group-item>
        </b-list-group>
      </b-card-text>
      <b-list-group>
        <b-list-group-item>
          Status:
        </b-list-group-item>
        <b-list-group-item
          v-for="(count, equipment) in statisticsStatusCount"
          :key="equipment"
        >
          {{ equipment }}: {{ count }}
        </b-list-group-item>
      </b-list-group>
      <b-card-text class="text-primary">
        Inspection Results
      </b-card-text>
      <b-card-text>
        All equipment have been inspected and comply with safety standards.
      </b-card-text>
      <b-card-text class="text-primary">
        Comments
      </b-card-text>
      <b-card-text>
        - Fire extinguishers are in good working order. <br>
        - Safety seals are intact.<br>
        - The inspection date on the label has been updated.
      </b-card-text>
      <b-card-text class="text-primary">
        We hereby certify that the above-mentioned fire extinguishers have been inspected in accordance with applicable safety regulations. They are in good working order and comply with safety standards.
      </b-card-text>
      <b-row>
        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-card-text>
            SECURITE SERVICES PLUS
          </b-card-text>
        </b-col>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-end"
        >
          <b-card-text>
            {{ certificateData.customer_name }}
          </b-card-text>
        </b-col>
      </b-row>
    </b-card-body>
  </b-modal>
</template>

<script>
import {

  BModal,
  VBModal,
  BCardText,
  BCardBody,
  BRow,
  BCol,
  BListGroup,
  BListGroupItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
    BCardText,
    BCardBody,
    BRow,
    BCol,
    BListGroup,
    BListGroupItem,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    certificateData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    equipmentCombinationCount() {
      return JSON.parse(this.certificateData.equipment_combination_count)
    },
    tasksPerIntervention() {
      return JSON.parse(this.certificateData.tasks_per_intervention)
    },
    statisticsStatusCount() {
      return JSON.parse(this.certificateData.statistics_status_count)
    },
  },
}
</script>
