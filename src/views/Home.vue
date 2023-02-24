<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Bill') }}</h3>

      <button
        class="btn waves-effect waves-light btn-small"
        @click.prevent="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />

    <div
      class="row"
      v-else
    >
      <HomeBill :rates="currency.rates" />
      <HomeCurrent
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue'
import HomeCurrent from '@/components/HomeCurrent.vue'
import { useMeta } from 'vue-meta'
import localizeFilter from '../filters/localize.filter'
export default {
  setup() {
    useMeta({ title: localizeFilter('Bill') })
  },
  name: 'home',
  data() {
    return {
      loading: true,
      currency: null,
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  components: {
    HomeBill,
    HomeCurrent,
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    },
  },
}
</script>
