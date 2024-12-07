<template>
  <b-card>

    <b-row>

      <!-- Workshop Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- Workshop Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :text="avatarText(workshopData.workshop_id)"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ workshopData.workshop_id }}
              </h4>
            </div>
            <div class="d-flex flex-wrap">
              <b-button
                :to="{ name: 'missions-workshop-edit', params: { id: workshopData.id } }"
                variant="primary"
              >
                Edit
              </b-button>
              <b-button
                variant="outline-danger"
                class="ml-1"
              >
                Delete
              </b-button>
            </div>
          </div>
        </div>

        <!-- Workshop Stats -->
        <div class="d-flex align-items-center mt-2">
          <!-- <div class="d-flex align-items-center mr-2">
            <b-avatar
              variant="light-primary"
              rounded
            >
              <feather-icon
                icon="ToolIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                10
              </h5>
              <small>Annual Workshop</small>
            </div>
          </div> -->

          <div class="d-flex align-items-center">
            <b-avatar
              variant="light-success"
              rounded
            >
              <feather-icon
                icon="DatabaseIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                350
              </h5>
              <small>Total Equipments</small>
            </div>
          </div>
        </div>
      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="6"
      >
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="TagIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Customer ID</span>
            </th>
            <td class="pb-50">
              {{ workshopData.mission_customer_id }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="UserIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Customer Name</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ workshopData.customer_name }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="ClockIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Frequency</span>
            </th>
            <td>
              {{ workshopData.workshop_frequency }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="TagIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Order ID</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ workshopData.mission_order_id }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="TagIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Location ID</span>
            </th>
            <td class="pb-50">
              {{ workshopData.mission_location_id }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Status</span>
            </th>
            <td>
              {{ workshopData.workshop_status }}
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BAvatar, BRow, BCol,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,
  },
  props: {
    workshopData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      avatarText,

    }
  },
}
</script>

<style>

</style>
