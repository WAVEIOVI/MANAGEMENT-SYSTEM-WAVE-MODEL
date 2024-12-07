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
                  icon="UserIcon"
                  size="18"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h6 class="mb-0">
                {{ equipmentData.customer_name }}
              </h6>
              <small>{{ equipmentData.park_customer_id }} </small>
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
                  icon="MapPinIcon"
                  size="18"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h6 class="mb-0">
                {{ equipmentData.park_park_id }}
              </h6>
            </b-media-body>
          </b-media>
        </blockquote>
      </b-col>
      <b-col />
    </b-row>
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
