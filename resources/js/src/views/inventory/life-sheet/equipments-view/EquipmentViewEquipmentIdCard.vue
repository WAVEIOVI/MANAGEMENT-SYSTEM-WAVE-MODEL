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
                QRC ID
              </h6>
              <small> {{ equipmentData.qrc_id }} </small>
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
                  icon="TagIcon"
                  size="18"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h6 class="mb-0">
                Internal ID
              </h6>
              <small> {{ equipmentData.internal_id }} </small>
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
                  icon="TagIcon"
                  size="18"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h6 class="mb-0">
                S/N
              </h6>
              <small> {{ equipmentData.serial_number }} </small>
            </b-media-body>
          </b-media>
        </blockquote>
      </b-col>
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
