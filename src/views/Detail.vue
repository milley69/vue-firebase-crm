<template>
  <div>
    <loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link
          to="/history"
          class="breadcrumb"
          >{{ localize('Menu_history') }}</router-link
        >
        <a
          @click.prevent=""
          class="breadcrumb"
        >
          {{ record.type === 'income' ? Income : Outcome }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{ red: record.type === 'outcome', green: record.type === 'income' }"
          >
            <div class="card-content white-text">
              <p>{{ localize('Description') }}: {{ record.description }}</p>
              <p>{{ localize('Amount') }}: {{ currency(record.amount) }}</p>
              <p>{{ localize('Category') }}: {{ record.categoryName }}</p>

              <small>{{ dateFilter(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p
      class="center"
      v-else
    >
      {{ localize('WithId') }}=<strong>{{ $route.params.id }}</strong> {{ localize('NotFounded') }}.
    </p>
  </div>
</template>

<script>
import { useMeta } from 'vue-meta'
import localizeFilter from '../filters/localize.filter'
export default {
  setup() {
    useMeta({ title: localizeFilter('Menu_history') })
  },
  name: 'detail',
  data() {
    return {
      record: null,
      loading: true,
      Income: localizeFilter('Income'),
      Outcome: localizeFilter('Outcome'),
    }
  },
  async mounted() {
    const record = await this.$store.dispatch('fetchRecordById', this.$route.params.id)
    const category = await this.$store.dispatch('fetchCategoriesById', record.catId)

    this.record = {
      ...record,
      categoryName: category.title,
    }
    this.loading = false
  },
}
</script>
