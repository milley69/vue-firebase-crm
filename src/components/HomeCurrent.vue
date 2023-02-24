<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ localize('CurrencyAmountTitle') }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ localize('Currency') }}</th>
              <th>{{ localize('CurrencyType') }}</th>
              <th>{{ localize('Date') }}</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="cur in currencies"
              :key="cur"
            >
              <td>{{ cur }}</td>
              <td>{{ rates[cur].toFixed(2) }}</td>
              <td>{{ dateFilter(date) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['rates', 'date'],
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR'],
    }
  },
}
</script>
