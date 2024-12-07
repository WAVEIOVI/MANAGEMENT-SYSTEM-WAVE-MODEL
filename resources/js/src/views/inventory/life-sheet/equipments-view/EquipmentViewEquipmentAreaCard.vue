<template>
  <b-card>
    <b-row>
      <b-col>
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
                  icon="TagIcon"
                  size="18"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h6 class="mb-0">
                {{ equipmentData.equipment_area_description }}
              </h6>
              <small> {{ equipmentData.equipment_area }} </small>
            </b-media-body>
          </b-media>
        </blockquote>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
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
                  icon="CornerDownRightIcon"
                  size="18"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h6 class="mb-0">
                Area accessibility
              </h6>
              <small> {{ equipmentData.equipment_area_accessibility }} </small>
            </b-media-body>
          </b-media>
        </blockquote>
      </b-col>
      <b-col>
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
                  icon="AlertTriangleIcon"
                  size="18"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h6 class="mb-0">
                Area Classification
              </h6>
              <small> {{ equipmentData.equipment_area_classification }} </small>
            </b-media-body>
          </b-media>
        </blockquote>
      </b-col></b-row>
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BAvatar,
  BMedia,
  BMediaAside,
  BMediaBody,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
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
