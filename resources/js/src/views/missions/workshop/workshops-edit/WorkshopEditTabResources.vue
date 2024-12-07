<template>
  <div>

    <!-- Workshop Info: Input Fields -->
    <b-form
      @submit.prevent="onSubmit"
    >

      <!-- Header: Team-->
      <div class="d-flex mt-2">
        <feather-icon
          icon="UsersIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Workshop Team
        </h4>
      </div>
      <b-row class="mt-1">

        <!-- Field: Team Leader -->
        <b-col
          cols="12"
          md="6"
          lg="3"
        >
          <b-form-group
            label="Team Leader"
            label-for="team-leader"
          >
            <v-select
              v-model="workshopData.team_leader"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="team"
              :reduce="(option) => option.technician"
              label="technician"
            >
              <template #option="{ technician }">
                <feather-icon
                  icon="UserIcon"
                  size="16"
                  class="align-middle mr-50"
                />
                <span> {{ technician }}</span>
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <!-- Field: Driver -->
        <b-col
          cols="12"
          md="6"
          lg="3"
        >
          <b-form-group
            label="Driver"
            label-for="team-driver"
          >
            <v-select
              v-model="workshopData.team_driver"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="team"
              :reduce="(option) => option.technician"
              label="technician"
            >
              <template #option="{ technician }">
                <feather-icon
                  icon="UserIcon"
                  size="16"
                  class="align-middle mr-50"
                />
                <span> {{ technician }}</span>
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <!-- Field: Team Members -->
        <b-col
          cols="12"
          md="6"
          lg="6"
        >
          <b-form-group
            label="Team Members"
            label-for="team-members"
          >
            <v-select
              v-model="workshopData.team_members"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              multiple
              :options="team"
              :reduce="(option) => option.technician"
              label="technician"
            >
              <template #option="{ technician }">
                <feather-icon
                  icon="UserIcon"
                  size="16"
                  class="align-middle mr-50"
                />
                <span> {{ technician }}</span>
              </template>
            </v-select>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- Header: Transportation -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="TruckIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Transportation
        </h4>
      </div>
      <b-row class="mt-1">
        <!-- Field: Vehicle Make and Mode -->
        <b-col
          cols="12"
          md="6"
          lg="3"
        >
          <b-form-group
            label="Vehicle Make and Model"
            label-for="vehicle-model"
          >
            <v-select
              v-model="workshopData.vehicle_model"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="vehicle"
              :reduce="val => val.value"
              :clearable="false"
            >
              <template #option="{ label }">
                <feather-icon
                  icon="TruckIcon"
                  size="16"
                  class="align-middle mr-50"
                />
                <span> {{ label }}</span>
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <!-- Field: Plate Number -->
        <b-col
          cols="12"
          md="6"
          lg="3"
        >
          <b-form-group
            label="Plate Number"
            label-for="plate_number"
          >
            <v-select
              v-model="workshopData.vehicle_model"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="vehicle"
              :reduce="val => val.value"
              :clearable="false"
              label="plate"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!-- Header: Equipments-->
      <div class="d-flex mt-2">
        <feather-icon
          icon="BriefcaseIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Equipments
        </h4>
      </div>
      <b-row class="mt-1">

        <!-- Field: Machine -->
        <b-col
          cols="12"
          md="6"
          lg="6"
        >
          <b-form-group
            label="Machines"
            label-for="machines"
          >
            <v-select
              v-model="workshopData.resources_machines"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              multiple
              :options="machines"
              label="machine"
            >
              <template #option="{ machine }">
                <feather-icon
                  icon="MonitorIcon"
                  size="16"
                  class="align-middle mr-50"
                />
                <span> {{ machine }}</span>
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <!-- Field: Toolbox -->
        <b-col
          cols="12"
          md="6"
          lg="6"
        >
          <b-form-group
            label="Toolbox"
            label-for="toolbox"
          >
            <v-select
              v-model="workshopData.resources_toolbox"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              multiple
              :options="tools"
              :reduce="(option) => option.toolbox"
              label="toolbox"
            >
              <template #option="{ toolbox }">
                <feather-icon
                  icon="ToolIcon"
                  size="16"
                  class="align-middle mr-50"
                />
                <span> {{ toolbox }}</span>
              </template>
            </v-select>
          </b-form-group>
        </b-col>
        <div> {{ workshopData.resources_toolbox }}</div>
      </b-row>

      <!-- Header: Finance-->
      <div class="d-flex mt-2">
        <feather-icon
          icon="DollarSignIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Finance (Estimated Amount)
        </h4>
      </div>
      <b-row class="mt-1">

        <!-- Field: Machine -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Fuel / Transportation"
            label-for="fuel-transportation"
          >
            <b-form-input
              id="fuel-transportation"
              v-model="workshopData.fuel_transportation"
            />
          </b-form-group>
        </b-col>
        <!-- Field: Machine -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Accommodation"
            label-for="accommodation"
          >
            <b-form-input
              id="accommodation"
              v-model="workshopData.accommodation"
            />
          </b-form-group>
        </b-col>
        <!-- Field: Machine -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Meals / Food"
            label-for="meals-food"
          >
            <b-form-input
              id="meals-food"
              v-model="workshopData.meals_food"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-1">

        <!-- Field: Machine -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Pocket Money / Allowance"
            label-for="pocket-money-allowance"
          >
            <b-form-input
              id="pocket-money-allowance"
              v-model="workshopData.pocket_money"
            />
          </b-form-group>
        </b-col>
        <!-- Field: Machine -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Maintenance / Repair costs"
            label-for="maintenance-repair-costs"
          >
            <b-form-input
              id="maintenance-repair-costs"
              v-model="workshopData.repair_costs"
            />
          </b-form-group>
        </b-col>
        <!-- Field: Machine -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Miscellaneous Expenses"
            label-for="miscellaneous-expenses"
          >
            <b-form-input
              id="miscellaneous-expenses"
              v-model="workshopData.miscellaneous_expenses"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="12"
          md="8"
        >
          <b-form-group
            label="Note"
            label-for="workshop-finance-note"
          >
            <b-form-textarea
              id="textarea-no-resize"
              v-model="workshopData.workshop_finance_notes"
              rows="3"
              no-resize
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!-- Action Buttons -->
      <b-button
        variant="primary"
        type="submit"
        class="mb-1 mb-sm-0 mr-0 mr-sm-1"
        :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      >
        Save Changes
      </b-button>
      <b-button
        variant="outline-secondary"
        type="reset"
        :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      >
        Reset
      </b-button>
    </b-form>
  </div>
</template>

<script>
import {
  BButton,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BFormTextarea,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    vSelect,
    BFormTextarea,
  },
  props: {
    workshopData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.workshopData)
    },
  },
  setup() {
    const team = [
      { technician: 'Walid HARRABI' },
      { technician: 'Amin Douzi' },
      { technician: 'Nader' },
      { technician: 'Abdelkader' },
      { technician: 'Jawher' },
      { technician: 'Mohamed CHRATI' },
      { technician: 'Karim BEN SALEM' },
    ]
    const vehicle = [
      { label: 'Peugeot Boxer', plate: '1584TU195', value: 'Peugeot Boxer 1584TU195' },
      { label: 'Peugeot Jumpy', plate: '1334TU202', value: 'Peugeot Jumpy 1334TU202 ' },
      { label: 'Peugeot Expert', plate: '9984TU226', value: 'Peugeot Expert 9984TU226' },
    ]
    const tools = [
      { toolbox: 'Hand tools' },
      { toolbox: 'Power tools' },
      { toolbox: 'Cutting tools' },
      { toolbox: 'Measuring tools' },
      { toolbox: 'Fastening tools' },
      { toolbox: 'Painting tools' },
      { toolbox: 'Electrical tools' },
      { toolbox: 'Marking tools' },
      { toolbox: 'Cleaning tools' },
      { toolbox: 'Safety equipment' },
      { toolbox: 'First aid tools' },
    ]
    const machines = [
      { machine: 'Pressure gauge tester' },
      { machine: 'Hydrostatic tester' },
      { machine: 'Rechargeable fire extinguisher machine' },
      { machine: 'Fire extinguisher discharge stand' },
      { machine: 'Fire extinguisher cylinder vise' },
      { machine: 'Fire extinguisher wall bracket tool' },
      { machine: 'Fire extinguisher valve removal tool' },
      { machine: 'Fire extinguisher valve stem wrench' },
      { machine: 'Fire extinguisher refill hose and adapter set' },
      { machine: 'Fire extinguisher cylinder cleaning tool' },
      { machine: 'Fire extinguisher powder filling machine' },
      { machine: 'Fire extinguisher cylinder weighing scale' },
      { machine: 'Fire extinguisher cylinder pressure testing kit' },
      { machine: 'Hydrostatic test pump' },
      { machine: 'Cylinder discharge unit' },
      { machine: 'CO2 charging system' },
      { machine: 'Fire hose repair kit.' },
    ]

    return {
      vehicle,
      team,
      tools,
      machines,
    }
  },
}

</script>

      <style lang="scss">
      @import '~@resources/scss/vue/libs/vue-select.scss';
      @import '~@resources/scss/vue/libs/vue-flatpicker.scss';
      </style>
