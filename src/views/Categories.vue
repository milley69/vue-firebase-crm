<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Menu_categories') }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />

      <div class="row">
        <CategoryCreate @create="addNewCategory" />
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p
          v-else
          class="center"
        >
          {{ localize('NoCategories') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue'
import CategoryEdit from '@/components/CategoryEdit.vue'
import localizeFilter from '@/filters/localize.filter'
import { useMeta } from 'vue-meta'
export default {
  setup() {
    useMeta({ title: localizeFilter('Menu_categories') })
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    },
  },
}
</script>
