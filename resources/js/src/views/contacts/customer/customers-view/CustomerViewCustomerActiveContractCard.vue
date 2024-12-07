<template>
  <div>
    <b-card
      v-for="(contract, index) in contracts"
      :key="index"
      title="Active Contract"
      bg-variant="transparent"
      border-variant="success"
    >
      <blockquote class="blockquote pl-1 border-left-success border-left-3">
        <b-media no-body>
          <b-media-aside class="mr-1">
            <b-avatar
              square
              size="55"
              variant="light-success"
            >
              <feather-icon
                size="32"
                icon="FileIcon"
              />
            </b-avatar>
          </b-media-aside>
          <b-media-body>
            Contract ID: {{ contract.contract_id }} <br>
            <b-badge variant="light-success">
              <feather-icon
                icon="CalendarIcon"
                class="mr-25"
              />
              {{ contract.contract_start_date }}
            </b-badge>
            <b-badge variant="light-danger">
              <feather-icon
                icon="CalendarIcon"
                class="mr-25"
              />
              {{ contract.contract_end_date }}
            </b-badge>
          </b-media-body>
        </b-media>
        <footer class="text-right">
          <b-badge
            class="badge-glow"
            variant="light-success"
          >
            {{ contract.contract_plan }}
          </b-badge>
        </footer>
      </blockquote>
    </b-card>
  </div>
</template>

<script>
import router from '@/router'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BCard,
  BAvatar,
  BMedia,
  BMediaAside,
  BMediaBody,
  BBadge,
} from 'bootstrap-vue'
import contractStoreModule from '../customers-edit/customer-edit-tab-contracts/contractStoreModule'

export default {
  components: {
    BCard,
    BAvatar,
    BMedia,
    BMediaAside,
    BMediaBody,
    BBadge,
  },
  setup() {
    const CONTRACT_APP_STORE_MODULE_NAME = 'app-contract'

    // Register module
    if (!store.hasModule(CONTRACT_APP_STORE_MODULE_NAME)) store.registerModule(CONTRACT_APP_STORE_MODULE_NAME, contractStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CONTRACT_APP_STORE_MODULE_NAME)) store.unregisterModule(CONTRACT_APP_STORE_MODULE_NAME)
    })
    const contracts = ref([])
    store
      .dispatch('app-contract/fetchCustomerActiveContract', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        console.log(data)
        contracts.value = data
      })

    return {
      contracts,
    }
  },
}
</script>

<style>

</style>
