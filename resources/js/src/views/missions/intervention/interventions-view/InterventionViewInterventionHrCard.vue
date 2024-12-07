<template>
  <b-card
    title="Team"
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
              icon="UserIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Team Leader
          </h6>
          <small> {{ interventionData.team_leader }}</small>
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
              icon="UserIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Team Driver
          </h6>
          <small> {{ interventionData.team_driver }}</small>
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
              icon="UsersIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Team Members
          </h6>
          <small> {{ formattedTeamMembersText }}</small>
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
    formattedTeamMembersText() {
      try {
        const teamMembers = JSON.parse(this.interventionData.team_members)
        return teamMembers.join(', ')
      } catch (error) {
        return ''
      }
    },
  // Create similar computed properties for other fields
  },

}
</script>

  <style>

  </style>
