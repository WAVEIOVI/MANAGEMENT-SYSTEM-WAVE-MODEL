<template>
  <b-card
    no-body
    bg-variant="transparent"
    border-variant="primary"
  >
    <!-- <blockquote
      v-if="equipmentData"
      class="blockquote pl-1 border-left-primary border-left-3"
    > -->
    <!-- <b-media
        no-body
      > -->
    <!-- <b-media-aside class="mr-1">
          <b-avatar
            rounded
            variant="light-primary"
            size="34"
          >
            <feather-icon
              icon="CheckSquareIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside> -->
    <!-- <b-media-body> -->
    <b-form-rating
      v-model="equipmentData.equipment_status"
      size="lg"
      readonly
      no-border
      variant="primary"
    />
    <!-- </b-media-body>
      </b-media>
    </blockquote> -->
  </b-card>
</template>

<script>
import {
  BCard,
  BFormRating,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BFormRating,
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
