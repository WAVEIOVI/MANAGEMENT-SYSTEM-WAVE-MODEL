<template>

  <div>

    <customer-edit-add-new-contact
      :is-add-new-customer-contact-sidebar-active.sync="isAddNewCustomerContactSidebarActive"
      @refetch-contact-data="refetchContactData"
    />
    <customer-edit-update-contact
      :is-update-customer-contact-sidebar-active.sync="isUpdateCustomerContactSidebarActive"
      :customer-contact-data="customerContactData"
      @refetch-contact-data="refetchContactData"
      @submit="onSubmit"
    />
    <customer-edit-modal-contact-view
      :customer-contact-data="customerContactData"
    />

    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          />
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-button
                variant="primary"
                @click="isAddNewCustomerContactSidebarActive = true"
              >
                <span class="text-nowrap">Add Contact</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refCustomerContactsListTable"
        class="position-relative"
        :items="fetchCustomerContacts"
        responsive
        :fields="tableColumnsContacts"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item
              v-b-modal.modal-contact-view
              @click="fetchCustomerContact(data.item.id)"
            >
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>
            <b-dropdown-item
              @click="isUpdateCustomerContactSidebarActive = true,
                      fetchCustomerContact(data.item.id)"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="removeCustomerContact(data.item.id)"
            >
              <feather-icon
                icon="TrashIcon"
                class="cursor-pointer"
              />
              <span class="align-middle ml-50 ">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BTable,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import router from '@/router'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useCustomersEdit from '../useCustomersEdit'
import contactStoreModule from './contactStoreModule'
import CustomerEditAddNewContact from './CustomerEditAddNewContact.vue'
import CustomerEditUpdateContact from './CustomerEditUpdateContact.vue'
import CustomerEditModalContactView from './CustomerEditModalContactView.vue'

export default {
  components: {
    CustomerEditAddNewContact,
    CustomerEditUpdateContact,
    CustomerEditModalContactView,

    BCard,
    BRow,
    BCol,
    BButton,
    BTable,
    BDropdown,
    BDropdownItem,
  },

  setup() {
    const CONTACT_APP_STORE_MODULE_NAME = 'app-contact'

    // Register module
    if (!store.hasModule(CONTACT_APP_STORE_MODULE_NAME)) store.registerModule(CONTACT_APP_STORE_MODULE_NAME, contactStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CONTACT_APP_STORE_MODULE_NAME)) store.unregisterModule(CONTACT_APP_STORE_MODULE_NAME)
    })
    const isAddNewCustomerContactSidebarActive = ref(false)
    const isUpdateCustomerContactSidebarActive = ref(false)

    const toast = useToast()

    const {
      customerContactData,
      fetchCustomerContacts,
      fetchCustomerContact,
      tableColumnsContacts,
      refCustomerContactsListTable,
      refetchContactData,
      removeCustomerContact,
    } = useCustomersEdit()

    const onSubmit = () => {
      store
        .dispatch('app-contact/updateCustomerContact', { customerContactData: customerContactData.value, id: router.currentRoute.params.id, idloc: customerContactData.value.id })
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
    return {
      // Sidebar
      isAddNewCustomerContactSidebarActive,
      isUpdateCustomerContactSidebarActive,

      tableColumnsContacts,
      fetchCustomerContacts,
      fetchCustomerContact,

      refCustomerContactsListTable,
      refetchContactData,
      removeCustomerContact,
      customerContactData,
      avatarText,
      onSubmit,

    }
  },
}
</script>

  <style lang="scss" scoped>
  .per-page-selector {
    width: 90px;
  }
  </style>
