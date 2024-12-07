<template>
  <b-row>
    <intervention-edit-update-general-checklist
      :is-update-intervention-general-checklist-sidebar-active.sync="isUpdateInterventionGeneralChecklistSidebarActive"
      :general-checklist-data="generalChecklistData"
      @submit="onSubmitA"
    />
    <intervention-edit-update-material-checklist
      :is-update-intervention-material-checklist-sidebar-active.sync="isUpdateInterventionMaterialChecklistSidebarActive"
      :material-checklist-data="materialChecklistData"
      @submit="onSubmitB"
    />
    <intervention-edit-update-area-checklist
      :is-update-intervention-area-checklist-sidebar-active.sync="isUpdateInterventionAreaChecklistSidebarActive"
      :area-checklist-data="areaChecklistData"
      @submit="onSubmitC"
    />
    <b-col cols="12">
      <b-card-group
        deck
        class="mb-0"
      >

        <!-- card 1 -->
        <b-card
          bg-variant="transparent"
          border-variant="primary"
          no-body
        >
          <b-card-body>
            <!-- <b-card-title>General CheckList</b-card-title> -->
            <div class="d-flex justify-content-center">
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                class="btn-icon"
                @click="isUpdateInterventionGeneralChecklistSidebarActive = true"
              >
                <feather-icon
                  icon="CheckSquareIcon"
                  size="50"
                />
              </b-button>
            </div>
          </b-card-body>
        </b-card>

        <!-- card 2 -->
        <b-card
          bg-variant="transparent"
          border-variant="primary"
          no-body
        >
          <b-card-body>
            <!-- <b-card-title>Material CheckList</b-card-title> -->
            <div class="d-flex justify-content-center">
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                class="btn-icon"
                @click="isUpdateInterventionMaterialChecklistSidebarActive = true"
              >
                <feather-icon
                  icon="ShoppingBagIcon"
                  size="50"
                />
              </b-button>
            </div>
          </b-card-body>
        </b-card>

        <!-- card 3 -->
        <b-card
          bg-variant="transparent"
          border-variant="primary"
          no-body
        >
          <b-card-body>
            <!-- <b-card-title>Work Area CheckList</b-card-title> -->
            <div class="d-flex justify-content-center">
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                class="btn-icon"
                @click="isUpdateInterventionAreaChecklistSidebarActive = true"
              >
                <feather-icon
                  icon="MapIcon"
                  size="50"
                />
              </b-button>
            </div>
          </b-card-body>
        </b-card>
      </b-card-group>
    </b-col>
  </b-row>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BRow, BCol, BCardGroup, BCard, BButton, BCardBody,
} from 'bootstrap-vue'
import InterventionEditUpdateGeneralChecklist from './side-bar/InterventionEditUpdateGeneralChecklist.vue'
import InterventionEditUpdateMaterialChecklist from './side-bar/InterventionEditUpdateMaterialChecklist.vue'
import InterventionEditUpdateAreaChecklist from './side-bar/InterventionEditUpdateAreaChecklist.vue'

export default {
  components: {
    BRow,
    BCol,
    BCardGroup,
    BCard,
    BButton,
    // BCardText,
    // BCardTitle,
    BCardBody,
    InterventionEditUpdateGeneralChecklist,
    InterventionEditUpdateMaterialChecklist,
    InterventionEditUpdateAreaChecklist,
  },
  directives: {
    Ripple,
  },
  setup() {
    const toast = useToast()
    const generalChecklistData = ref()
    const materialChecklistData = ref()
    const areaChecklistData = ref()

    const isUpdateInterventionGeneralChecklistSidebarActive = ref(false)
    const isUpdateInterventionMaterialChecklistSidebarActive = ref(false)
    const isUpdateInterventionAreaChecklistSidebarActive = ref(false)
    // ------------------------------------------------
    // Tap generalChecklist : Fetch Intervention's generalChecklist
    // ------------------------------------------------
    store.dispatch('app-intervention/fetchGeneralChecklist', { id: router.currentRoute.params.id })
      .then(response => { generalChecklistData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          generalChecklistData.value = undefined
        }
      })
    const onSubmitA = () => {
      store
        .dispatch('app-intervention/updateGeneralChecklist', { generalChecklistData: generalChecklistData.value, id: router.currentRoute.params.id })
        .then(() => {
          console.log('test', generalChecklistData)
          toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              text: 'Form successfully updated!',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
    }

    store.dispatch('app-intervention/fetchMaterialChecklist', { id: router.currentRoute.params.id })
      .then(response => { materialChecklistData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          materialChecklistData.value = undefined
        }
      })
    const onSubmitB = () => {
      store
        .dispatch('app-intervention/updateMaterialChecklist', { materialChecklistData: materialChecklistData.value, id: router.currentRoute.params.id })
        .then(() => {
          console.log('test', materialChecklistData)
          toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              text: 'Form successfully updated!',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
    }

    store.dispatch('app-intervention/fetchAreaChecklist', { id: router.currentRoute.params.id })
      .then(response => { areaChecklistData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          areaChecklistData.value = undefined
        }
      })
    const onSubmitC = () => {
      store
        .dispatch('app-intervention/updateAreaChecklist', { areaChecklistData: areaChecklistData.value, id: router.currentRoute.params.id })
        .then(() => {
          console.log('test', areaChecklistData)
          toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              text: 'Form successfully updated!',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
    }
    return {
      onSubmitA,
      onSubmitB,
      onSubmitC,
      isUpdateInterventionGeneralChecklistSidebarActive,
      isUpdateInterventionMaterialChecklistSidebarActive,
      isUpdateInterventionAreaChecklistSidebarActive,
      generalChecklistData,
      materialChecklistData,
      areaChecklistData,
    }
  },
}
</script>
