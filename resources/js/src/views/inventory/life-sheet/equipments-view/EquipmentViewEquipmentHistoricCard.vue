<template>
  <b-card title="Historic">
    <app-timeline>
      <!-- Equipment MFG -->
      <app-timeline-item
        v-if="equipmentData.mfg_date !== null && equipmentData.mfg_date.trim() !== ''"
      >

        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>MFG Date </h6>
          <small class="text-muted"> {{ equipmentData.mfg_date }} </small>
        </div>
      </app-timeline-item>
      <!-- Intervention Tasks -->
      <app-timeline-item
        v-if="equipmentData.installation_date !== null && equipmentData.installation_date.trim() !== ''"
      >
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Installation Date </h6>
          <small class="text-muted"> {{ equipmentData.installation_date }} </small>
        </div>
      </app-timeline-item>
      <!-- Intervention Tasks -->
      <app-timeline-item
        v-for="(task, index) in tasksHistoricData"
        :key="index"
        variant="success"
      >

        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Intervention {{ task.mission_id }}</h6>
          <small class="text-muted">{{ task.created_at }}</small>
        </div>
        <p>Click the button below to read intervention tasks</p>
        <b-button
          v-b-toggle.report-list
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          size="sm"
          variant="outline-primary"
        >
          Show Tasks
        </b-button>
        <b-collapse id="report-list">
          <b-list-group
            flush
            class="mt-1"
          >
            <b-list-group-item
              href="#"
              class="d-flex justify-content-between align-items-center bg-transparent"
            >
              <h6>Verification</h6>
              <b-form-checkbox
                v-if="task.equipment_verification === '1'"
                checked="true"
                class="custom-control-primary"
                name="check-button"
                disabled
              />
            </b-list-group-item>
            <b-list-group-item
              href="#"
              class="d-flex justify-content-between align-items-center bg-transparent"
            >
              <h6>Nitrogen Recharge </h6>
              <b-form-checkbox
                v-if="task.azote_recharged === '1'"
                checked="true"
                class="custom-control-primary"
                name="check-button"
                disabled
              />
            </b-list-group-item>
            <b-list-group-item
              href="#"
              class="d-flex justify-content-between align-items-center bg-transparent"
            >
              <h6>Raw material Recharge </h6>
              <b-form-checkbox
                v-if="task.raw_material_recharged === '1'"
                checked="true"
                class="custom-control-primary"
                name="check-button"
                disabled
              />
            </b-list-group-item>
          </b-list-group>
        </b-collapse>
      </app-timeline-item>
    </app-timeline>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BCollapse, VBToggle, BListGroup, BListGroupItem, VBTooltip, BFormCheckbox,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    AppTimeline,
    AppTimelineItem,
    BCard,
    BButton,
    BCollapse,
    BListGroup,
    BListGroupItem,
    BFormCheckbox,
  },
  directives: { 'b-toggle': VBToggle, 'b-tooltip': VBTooltip, Ripple },
  props: {
    tasksHistoricData: {
      type: Object,
      required: true,
    },
    equipmentData: {
      type: Object,
      required: true,
    },
  },
}
</script>
