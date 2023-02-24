<template>
  <Loader v-if="loading" />

  <div
    class="app-main-layout"
    v-else
  >
    <Navbar @clickNav="isOpen = !isOpen" />
    <sidebar
      :isOpen="isOpen"
      :key="locale"
    />
    <main
      class="app-content"
      :class="{ full: !isOpen }"
    >
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link
        class="btn-floating btn-large blue"
        to="/record"
        v-tooltip="CreateNewRecord"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'
import localizeFilter from '../filters/localize.filter'

import messages from '../utils/messages'
export default {
  name: 'main-layout',
  data() {
    return {
      isOpen: true,
      loading: true,
      CreateNewRecord: '',
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.CreateNewRecord = localizeFilter('CreateNewRecord')
    this.loading = false
  },

  components: {
    Navbar,
    Sidebar,
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    },
  },
  watch: {
    error(fbError) {
      // console.log(fbError)
      this.$Etoast(messages[fbError.code] || localizeFilter('SmthWrong'))
    },
  },
}
</script>
