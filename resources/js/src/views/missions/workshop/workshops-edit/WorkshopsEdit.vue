<template>
  <component :is="workshopData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="workshopData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching workshop data
      </h4>
      <div class="alert-body">
        No workshop found with this workshop id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'contacts-workshops-list'}"
        >
          Workshop List
        </b-link>
        for other workshops.
      </div>
    </b-alert>

    <b-tabs
      v-if="workshopData"
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
        <workshop-edit-tab-basic-infos
          :workshop-data="workshopData"
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
        <workshop-edit-tab-basic-contact
          :workshop-data="workshopData"
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
        <workshop-edit-tab-resources
          :workshop-data="workshopData"
          class="mt-2 pt-75"
          @submit="onSubmit"
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
import workshopStoreModule from '../workshopStoreModule'
import WorkshopEditTabBasicInfos from './WorkshopEditTabBasicInfos.vue'
import WorkshopEditTabBasicContact from './WorkshopEditTabBasicContact.vue'
import WorkshopEditTabResources from './WorkshopEditTabResources.vue'
import useWorkshopsOptions from '../useWorkshopsOptions'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    WorkshopEditTabBasicInfos,
    WorkshopEditTabBasicContact,
    WorkshopEditTabResources,
  },
  setup() {
    const WORKSHOP_APP_STORE_MODULE_NAME = 'app-workshop'

    // Register module
    if (!store.hasModule(WORKSHOP_APP_STORE_MODULE_NAME)) store.registerModule(WORKSHOP_APP_STORE_MODULE_NAME, workshopStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(WORKSHOP_APP_STORE_MODULE_NAME)) store.unregisterModule(WORKSHOP_APP_STORE_MODULE_NAME)
    })
    const workshopData = ref(null)
    const toast = useToast()

    store.dispatch('app-workshop/fetchWorkshop', { id: router.currentRoute.params.id })
      .then(response => {
        workshopData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          workshopData.value = undefined
        }
      })
    const onSubmit = () => {
      store.dispatch('app-workshop/updateWorkshop',
        { id: router.currentRoute.params.id, workshopData: workshopData.value })
        .then(response => {
          workshopData.value = response.data.data
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
    } = useWorkshopsOptions()

    return {
      workshopData,
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
