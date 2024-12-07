<template>
  <b-card
    title="Customer Contact"
    bg-variant="transparent"
    border-variant="primary"
  >
    <blockquote
      v-if="workshopData"
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
            {{ workshopData.address_line1 }} {{ workshopData.address_line2 }}
          </h6>
          <small>{{ workshopData.customer_postcode }} {{ workshopData.customer_city }} {{ workshopData.customer_country }}</small>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="workshopData"
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
              icon="PhoneIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            {{ workshopData.customer_phone }}
          </h6>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="workshopData"
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
              icon="MailIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            {{ workshopData.customer_email }}
          </h6>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="workshopData"
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
            {{ workshopData.general_coordinator }}
          </h6>
          <small> {{ workshopData.gc_phone }} | {{ workshopData.gc_email }}</small>
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
    workshopData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>

</style>
