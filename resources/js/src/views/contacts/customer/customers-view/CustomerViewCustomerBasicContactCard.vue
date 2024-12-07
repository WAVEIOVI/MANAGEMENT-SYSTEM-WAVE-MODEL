<template>
  <b-card
    title="Basic Contact"
    bg-variant="transparent"
    border-variant="primary"
  >
    <blockquote
      v-if="customerData"
      class="blockquote pl-1 border-left-primary border-left-3"
    >
      <b-media no-body>
        <b-media-aside class="mr-1">
          <b-avatar
            square
            size="55"
            variant="light-primary"
          >
            <feather-icon
              size="32"
              icon="MapPinIcon"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          {{ customerData.address_line1 }} {{ customerData.address_line2 }} {{ customerData.customer_postcode }} {{ customerData.customer_city }} {{ customerData.customer_country }}.
        </b-media-body>
      </b-media>
      <footer class="blockquote-footer text-right">
        Official Address
      </footer>
    </blockquote>
    <blockquote class="blockquote pl-1 border-left-primary border-left-3">
      <b-media no-body>
        <b-media-aside class="mr-1">
          <b-avatar
            square
            size="55"
            variant="light-primary"
          >
            <feather-icon
              size="32"
              icon="UserIcon"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          {{ customerData.general_coordinator }}
          <div>
            <b-badge variant="light-primary">
              <feather-icon
                icon="PhoneIcon"
                class="mr-25"
              />
              {{ customerData.gc_phone }}
            </b-badge>
            <b-badge variant="light-primary">
              <feather-icon
                icon="MailIcon"
                class="mr-25"
              />
              {{ customerData.gc_email }}
            </b-badge>
          </div>
        </b-media-body>
      </b-media>
      <footer class="blockquote-footer text-right">
        General Coordinator
      </footer>
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
  BBadge,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BAvatar,
    BMedia,
    BMediaAside,
    BMediaBody,
    BBadge,
  },
  props: {
    customerData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>

</style>
