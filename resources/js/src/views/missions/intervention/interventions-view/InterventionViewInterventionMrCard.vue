<template>
  <b-card
    title="Equipments"
    bg-variant="transparent"
    border-variant="primary"
  >
    <blockquote
      v-if="interventionData"
      class="blockquote pl-1 border-left-primary border-left-3"
    >
      <b-media
        no-body
      >
        <b-media-aside class="mr-1">
          <b-avatar
            rounded
            variant="light-primary"
            size="34"
          >
            <feather-icon
              icon="TruckIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Transportation (Vehicle Model)
          </h6>
          <small>{{ interventionData.vehicle_model }}</small>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="interventionData"
      class="blockquote pl-1 border-left-primary border-left-3"
    >
      <b-media
        no-body
      >
        <b-media-aside class="mr-1">
          <b-avatar
            rounded
            variant="light-primary"
            size="34"
          >
            <feather-icon
              icon="MonitorIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Machines
          </h6>
          <small>{{ formattedResourcesMachineText }}</small>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="interventionData"
      class="blockquote pl-1 border-left-primary border-left-3"
    >
      <b-media
        no-body
      >
        <b-media-aside class="mr-1">
          <b-avatar
            rounded
            variant="light-primary"
            size="34"
          >
            <feather-icon
              icon="ToolIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Toolbox
          </h6>
          <small>{{ formattedResourcesToolboxText }}</small>
        </b-media-body>
      </b-media>
    </blockquote>
  </b-card>
</template>

<script>
import {
  BCard,
  BAvatar,
  BMedia,
  BMediaAside,
  BMediaBody,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BAvatar,
    BMedia,
    BMediaAside,
    BMediaBody,
  },
  props: {
    interventionData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedResourcesToolboxText() {
      try {
        const resourcesToolbox = JSON.parse(this.interventionData.resources_toolbox)
        return resourcesToolbox.join(', ')
      } catch (error) {
        return ''
      }
    },
    formattedResourcesMachineText() {
      try {
        const resourcesMachines = JSON.parse(this.interventionData.resources_machines)
        return resourcesMachines.join(', ')
      } catch (error) {
        return ''
      }
    },
  },
}
</script>

  <style>

  </style>
