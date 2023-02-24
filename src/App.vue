<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | CRM` : `CRM` }}</template>
  </metainfo>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script>
import AuthLayout from '@/layout/AuthLayout.vue'
import MainLayout from '@/layout/MainLayout.vue'
import { RouterView } from 'vue-router'

import { useMeta } from 'vue-meta'
export default {
  setup() {
    useMeta({
      title: '',
      htmlAttrs: { lang: 'en', amp: true },
    })
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'auth') + '-layout'
    },
  },
  components: {
    AuthLayout,
    MainLayout,
  },
}
</script>
<style lang="scss">
@import '~~/@materializecss/materialize/dist/css/materialize.min.css';
</style>
