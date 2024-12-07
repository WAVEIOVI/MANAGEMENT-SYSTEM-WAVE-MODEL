<template>
  <b-modal
    id="modal-tasks-view"
    cancel-variant="outline-secondary"
    cancel-title="Close"
    ok-title="Accept"
    size="lg"
    title="Equipment's Tasks"
  >
    <!-- body -->
    <b-card
      no-body
    >
      <b-row class="match-height my-2">
        <b-col
          cols="12"
          lg="5"
          md="5"
          xl="5"
        >
          <template>
            <b-card
              bg-variant="transparent"
              border-variant="primary"
            >
              <template
                v-if="equipmentTasksData.equipment_model === 'Powder ABC'"
              >
                <b-img
                  :src="require('@/assets/images/equipment/FireExtinguisherPowder.png')"
                  fluid-grow
                  alt="Fluid image"
                />
              </template>
              <template
                v-if="equipmentTasksData.equipment_model === 'CO2'"
              >
                <b-img
                  :src="require('@/assets/images/equipment/FireExtinguisherCo2.png')"
                  fluid-grow
                  alt="Fluid image"
                />
              </template>
              <template
                v-if="equipmentTasksData.equipment_model === 'Water-based' || equipmentTasksData.equipment_model === 'Foam'"
              >
                <b-img
                  :src="require('@/assets/images/equipment/FireExtinguisherFoam.png')"
                  fluid-grow
                  alt="Fluid image"
                />
              </template>
              <template
                v-if="equipmentTasksData.equipment_category === 'Fire Hoses'"
              >
                <b-img
                  :src="require('@/assets/images/equipment/FireHose.png')"
                  fluid-grow
                  alt="Fluid image"
                />
              </template>
            </b-card>
          </template>
        </b-col>
        <b-col
          cols="12"
          lg="7"
          md="7"
          xl="7"
        >
          <!-- Equipment ID -->
          <b-card-text class="item-company mb-0">
            <h6 class="item-price mr-1">
              {{ equipmentTasksData.qrc_id }} - {{ equipmentTasksData.internal_id }} - {{ equipmentTasksData.serial_number }}
            </h6>
          </b-card-text>
          <!-- Equipment -->
          <h6>{{ equipmentTasksData.equipment_category }} - {{ equipmentTasksData.equipment_model }} - {{ equipmentTasksData.equipment_weight }} - {{ equipmentTasksData.equipment_pressure }} </h6>
          <b-link class="company-name">
            {{ equipmentTasksData.equipment_brand }}
          </b-link>
          <!-- Area & Park ID -->
          <div class="ecommerce-details-price d-flex flex-wrap mt-1">
            <h6 class="item-price mr-1">
              {{ equipmentTasksData.park_id }} - {{ equipmentTasksData.area_id }}
            </h6>
          </div>
          <!-- Equipment Verification -->
          <div class="ecommerce-details-price d-flex flex-wrap mt-1">
            <h6 class="item-price mr-1">
              Equipment Verification :
            </h6>
            <b-form-checkbox
              v-if="equipmentTasksData.equipment_verification === '1'"
              checked="true"
              class="custom-control-primary"
              name="check-button"
              disabled
            />
          </div>
          <!-- Azote  -->
          <div class="ecommerce-details-price d-flex flex-wrap mt-1">
            <h6 class="item-price mr-1">
              Recharge Nitrogen :
            </h6>
            <b-form-checkbox
              v-if="equipmentTasksData.azote_recharged === '1'"
              checked="true"
              class="custom-control-primary"
              name="check-button"
              disabled
            />
          </div>
          <!-- raw_material_recharged  -->
          <div class="ecommerce-details-price d-flex flex-wrap mt-1">
            <h6 class="item-price mr-1">
              Recharge Raw Material :
            </h6>
            <b-form-checkbox
              v-if="equipmentTasksData.raw_material_recharged === '1'"
              checked="true"
              class="custom-control-primary"
              name="check-button"
              disabled
            />
          </div>
          <!-- equipment_intervention_status  -->
          <div class="ecommerce-details-price d-flex flex-wrap mt-1">
            <h6 class="item-price mr-1">
              Intervention Status :
            </h6>
            <h6>
              {{ equipmentTasksData.equipment_intervention_status }}
            </h6>
          </div>
        </b-col>
      </b-row>
    </b-card></b-modal>
</template>

<script>
import {

  BModal,
  BImg,
  VBModal,
  BCardText,
  //   BCardBody,
  BFormCheckbox,
  BRow,
  BCol,
  BLink,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
    BImg,
    BCardText,
    // BCardBody,
    BFormCheckbox,
    BRow,
    BCol,
    BLink,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    equipmentTasksData: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import "~@resources/scss/base/pages/app-ecommerce-details.scss";
</style>
