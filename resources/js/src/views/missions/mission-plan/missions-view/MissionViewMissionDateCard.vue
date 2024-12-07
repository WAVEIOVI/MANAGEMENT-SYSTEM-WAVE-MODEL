<template>
  <b-card
    title="Dates"
    bg-variant="transparent"
    border-variant="primary"
  >
    <blockquote
      v-if="missionData"
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
              icon="CalendarIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Mission Date
          </h6>
          <small>{{ missionData.mission_date }}</small>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="missionData"
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
              icon="CalendarIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Intervention Date
          </h6>
          <small>{{ missionData.intervention_date }}</small>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="missionData"
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
              icon="ClockIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Intervention Duration
          </h6>
          <small> {{ missionData.intervention_duration }}</small>
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
    missionData: {
      type: Object,
      required: true,
    },
  },
}
</script>

  <style>

  </style>
