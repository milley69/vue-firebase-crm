<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Menu_planning') }}</h3>
      <h4>{{ currency(this.bill) }}</h4>
    </div>

    <Loader v-if="loading" />

    <p
      v-else-if="!categories.length"
      class="center"
    >
      {{ localize('NoCategories') }}.
      <router-link to="/record">{{ localize('AddFirst') }}.</router-link>
    </p>

    <section v-else>
      <div
        v-for="cat in categories"
        :key="cat.id"
        v-tooltip="cat.tooltip"
      >
        <p>
          <strong>{{ cat.title }}</strong>
          {{ currency(cat.spend) }} из {{ currency(cat.limit) }}
        </p>
        <div class="progress">
          <div
            :class="['determinate', [cat.progressColor]]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import { useMeta } from 'vue-meta'
import { mapGetters } from 'vuex'
export default {
  setup() {
    useMeta({ title: localizeFilter('Menu_planning') })
  },
  name: 'planing',
  data() {
    return {
      loading: true,
      categories: [],
      bill: 0,
    }
  },
  computed: {
    ...mapGetters(['info']),
    // bill() {
    //   return this.$store.getters.info.bill
    // },
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.bill = this.$store.getters.info.bill

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((rec) => rec.catId === cat.id)
        .filter((rec) => rec.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)
      const percent = (100 * spend) / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      const tooltipValue = cat.limit - spend
      const tooltip =
        (tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')) +
        ' ' +
        currencyFilter(Math.abs(tooltipValue))

      return {
        ...cat,
        spend,
        tooltip,
        progressPercent,
        progressColor,
      }
    })
    this.loading = false
  },
  // watch: {
  //   bill() {
  //     this.$store.getters.info.bill
  //   },
  // },
}
</script>
