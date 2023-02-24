<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ localize('BillInCurrency') }}</span>

        <p
          v-for="cur in currencies"
          :key="cur"
          class="currency-line"
        >
          <span>{{ currency(getCurrency(cur), cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['rates'],
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR'],
    }
  },
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['USD'])
    },
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    },
  },
}
</script>
