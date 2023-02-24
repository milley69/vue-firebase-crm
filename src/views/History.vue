<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('History_Title') }}</h3>
    </div>

    <div class="history-chart">
      <Pie
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
        v-if="!loading"
      />
    </div>
    <Loader v-if="loading" />
    <p
      v-else-if="!records.length"
      class="center"
    >
      {{ localize('NoRecords') }}.
      <router-link to="/record">{{ localize('AddFirst') }}.</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items" />
      <paginate
        :page-count="pageCount"
        :margin-pages="4"
        :click-handler="pageChangeHandler"
        :prev-text="'<i class=material-icons>chevron_left</i>'"
        :next-text="'<i class=material-icons>chevron_right</i>'"
        :container-class="'pagination'"
        v-model="page"
      >
      </paginate>
    </section>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate-next'
import HistoryTable from '../components/HistoryTable.vue'
import paginationMixin from '../mixins/pagination.mixin'

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { useMeta } from 'vue-meta'
import localizeFilter from '../filters/localize.filter'

ChartJS.register(ArcElement, Tooltip, Legend)
export default {
  setup() {
    useMeta({ title: localizeFilter('History_Title') })
  },
  name: 'history',
  extends: Pie,
  mixins: [paginationMixin],
  components: { HistoryTable, paginate: Paginate, Pie },
  data() {
    return {
      loading: true,
      page: 1,
      records: [],
      chartData: {},
      chartOptions: {},
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.setup(categories)

    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.catId).title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome'),
          }
        })
      )
      this.chartData = {
        labels: categories.map((c) => c.title),
        datasets: [
          {
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
            data: categories.map((c) => {
              return this.records.reduce((total, rec) => {
                if (rec.catId === c.id && rec.type === 'outcome') {
                  total += +rec.amount
                }
                return total
              }, 0)
            }),
          },
        ],
      }
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      }
    },
  },
}
</script>
