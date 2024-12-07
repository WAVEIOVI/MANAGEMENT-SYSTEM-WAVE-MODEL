<template>
  <component :is="missionData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="missionData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching mission data
      </h4>
      <div class="alert-body">
        No mission found with this mission id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'contacts-missions-list'}"
        >
          Mission List
        </b-link>
        for other missions.
      </div>
    </b-alert>

    <b-tabs
      v-if="missionData"
      pills
    >

      <!-- Tab: Basic Infos -->
      <b-tab active>
        <template #title>
          <feather-icon
            icon="TagIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Basic Infos.</span>
        </template>
        <mission-edit-tab-basic-infos
          :mission-data="missionData"
          :type-options="typeOptions"
          :frequency-options="frequencyOptions"
          :status-options="statusOptions"
          class="mt-2 pt-75"
          @submit="onSubmit"
        />
      </b-tab>

      <!-- Tab: Basic Contact -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="FileIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Basic Contact</span>
        </template>
        <mission-edit-tab-basic-contact
          :mission-data="missionData"
          :language-options="languageOptions"
          :gender-options="genderOptions"
          :contact-type-options="contactTypeOptions"
          :city-options="cityOptions"
          :country-options="countryOptions"
          class="mt-2 pt-75"
          @submit="onSubmit"
        />
      </b-tab>

      <!-- Tab: Additional Information  -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="DatabaseIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Resources</span>
        </template>
        <mission-edit-tab-resources
          :mission-data="missionData"
          class="mt-2 pt-75"
          @submit="onSubmit"
        />
      </b-tab>

      <!-- Tab: Services -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="SlidersIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Services</span>
        </template>
        <mission-edit-tab-Services
          class="mt-2 pt-75"
        />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import {
  BTab, BTabs, BCard, BAlert, BLink,
} from 'bootstrap-vue'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import missionStoreModule from '../missionStoreModule'
import MissionEditTabBasicInfos from './MissionEditTabBasicInfos.vue'
import MissionEditTabBasicContact from './MissionEditTabBasicContact.vue'
import MissionEditTabResources from './MissionEditTabResources.vue'
import MissionEditTabServices from './mission-edit-tab-services/MissionEditTabServices.vue'
import useMissionsOptions from '../useMissionsOptions'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    MissionEditTabBasicInfos,
    MissionEditTabBasicContact,
    MissionEditTabResources,
    MissionEditTabServices,
  },
  setup() {
    const MISSION_APP_STORE_MODULE_NAME = 'app-mission'

    // Register module
    if (!store.hasModule(MISSION_APP_STORE_MODULE_NAME)) store.registerModule(MISSION_APP_STORE_MODULE_NAME, missionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MISSION_APP_STORE_MODULE_NAME)) store.unregisterModule(MISSION_APP_STORE_MODULE_NAME)
    })
    const missionData = ref(null)
    const toast = useToast()

    store.dispatch('app-mission/fetchMission', { id: router.currentRoute.params.id })
      .then(response => {
        missionData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          missionData.value = undefined
        }
      })
    const onSubmit = () => {
      store.dispatch('app-mission/updateMission',
        { id: router.currentRoute.params.id, missionData: missionData.value })
        .then(response => {
          missionData.value = response.data.data
          console.log(response.data)
          console.log('form submitted')
        })
        .then(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              text: 'Form successfully submitted!',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
    }
    const {
      typeOptions,
      frequencyOptions,
      activityOptions,
      statusOptions,
      languageOptions,
      genderOptions,
      contactTypeOptions,
      cityOptions,
      countryOptions,
    } = useMissionsOptions()

    return {
      missionData,
      onSubmit,
      activityOptions,
      statusOptions,
      typeOptions,
      frequencyOptions,
      languageOptions,
      genderOptions,
      contactTypeOptions,
      cityOptions,
      countryOptions,
    }
  },
}
</script>

<style>

</style>
