<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import localizeFilter from '../filters/localize.filter'
import messages from '../utils/messages'
export default {
  computed: {
    error() {
      return this.$store.getters.error
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
