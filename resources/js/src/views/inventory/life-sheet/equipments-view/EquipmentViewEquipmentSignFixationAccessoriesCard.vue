<template>
  <b-card>
    <blockquote
      v-if="equipmentData"
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
              icon="TriangleIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Sign Availability
          </h6>
          <small>{{ equipmentData.sign_availability }} </small>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="equipmentData"
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
            Fixation
          </h6>
          <small>{{ equipmentData.equipment_fixation }} </small>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="equipmentData"
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
              icon="SpeakerIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Accessories Availability
          </h6>
          <small>{{ equipmentData.accessories_availability }} </small>
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
    equipmentData: {
      type: Object,
      required: true,
    },
  },
}
</script>

    <style>

    </style>
