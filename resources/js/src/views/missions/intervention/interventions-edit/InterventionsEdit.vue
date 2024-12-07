<template>
  <component :is="interventionData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="interventionData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching intervention data
      </h4>
      <div class="alert-body">
        No intervention found with this intervention id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'contacts-interventions-list'}"
        >
          Intervention List
        </b-link>
        for other interventions.
      </div>
    </b-alert>

    <b-tabs
      v-if="interventionData"
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
        <intervention-edit-tab-basic-infos
          :intervention-data="interventionData"
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
        <intervention-edit-tab-basic-contact
          :intervention-data="interventionData"
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
        <intervention-edit-tab-resources
          :intervention-data="interventionData"
          class="mt-2 pt-75"
          @submit="onSubmit"
        />
      </b-tab>

      <!-- Tab: Scraps -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="Trash2Icon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Scraps</span>
        </template>
        <intervention-edit-tab-Scraps
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
import interventionStoreModule from '../interventionStoreModule'
import InterventionEditTabBasicInfos from './InterventionEditTabBasicInfos.vue'
import InterventionEditTabBasicContact from './InterventionEditTabBasicContact.vue'
import InterventionEditTabResources from './InterventionEditTabResources.vue'
import InterventionEditTabScraps from './intervention-edit-tab-scraps/InterventionEditTabScraps.vue'
import useInterventionsOptions from '../useInterventionsOptions'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    InterventionEditTabBasicInfos,
    InterventionEditTabBasicContact,
    InterventionEditTabResources,
    InterventionEditTabScraps,
  },
  setup() {
    const INTERVENTION_APP_STORE_MODULE_NAME = 'app-intervention'

    // Register module
    if (!store.hasModule(INTERVENTION_APP_STORE_MODULE_NAME)) store.registerModule(INTERVENTION_APP_STORE_MODULE_NAME, interventionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INTERVENTION_APP_STORE_MODULE_NAME)) store.unregisterModule(INTERVENTION_APP_STORE_MODULE_NAME)
    })
    const interventionData = ref(null)
    const toast = useToast()

    store.dispatch('app-intervention/fetchIntervention', { id: router.currentRoute.params.id })
      .then(response => {
        interventionData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          interventionData.value = undefined
        }
      })
    const onSubmit = () => {
      store.dispatch('app-intervention/updateIntervention',
        { id: router.currentRoute.params.id, interventionData: interventionData.value })
        .then(response => {
          interventionData.value = response.data.data
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
      activityOptions,
      statusOptions,
      languageOptions,
      genderOptions,
      contactTypeOptions,
      cityOptions,
      countryOptions,
    } = useInterventionsOptions()

    return {
      interventionData,
      onSubmit,
      activityOptions,
      statusOptions,
      typeOptions,
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
