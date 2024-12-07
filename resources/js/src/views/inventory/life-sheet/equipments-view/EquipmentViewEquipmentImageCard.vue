<template>
  <b-card
    bg-variant="transparent"
    border-variant="primary"
  >
    <template
      v-if="equipmentData.equipment_model === 'Powder ABC'"
    >
      <b-img
        :src="require('@/assets/images/equipment/FireExtinguisherPowder.png')"
        fluid-grow
        alt="Fluid image"
      />
    </template>
    <template
      v-if="equipmentData.equipment_model === 'CO2'"
    >
      <b-img
        :src="require('@/assets/images/equipment/FireExtinguisherCo2.png')"
        fluid-grow
        alt="Fluid image"
      />
    </template>
    <template
      v-if="equipmentData.equipment_model === 'Water-based' || equipmentData.equipment_model === 'Foam'"
    >
      <b-img
        :src="require('@/assets/images/equipment/FireExtinguisherFoam.png')"
        fluid-grow
        alt="Fluid image"
      />
    </template>
    <template
      v-if="equipmentData.equipment_category === 'Fire Hoses'"
    >
      <b-img
        :src="require('@/assets/images/equipment/FireHose.png')"
        fluid-grow
        alt="Fluid image"
      />
    </template>
  </b-card>
</template>

<script>
import {
  BCard,
  BImg,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BImg,
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
