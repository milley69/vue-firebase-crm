<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localize('Edit') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select
            ref="select"
            id="form-select"
            v-model="current"
          >
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.title }}
            </option>
          </select>
          <label for="form-select">{{ localize('SelectCategory') }}</label>
        </div>

        <div class="input-field">
          <input
            id="nameEdit"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$dirty && v$.title.$error }"
          />
          <label for="nameEdit">{{ localize('Title') }}</label>
          <span
            v-if="v$.title.$dirty && v$.title.required.$invalid"
            class="helper-text invalid"
            >{{ localize('Message_CategoryTitle') }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limitEdit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$dirty && v$.limit.$error }"
          />
          <label for="limitEdit">{{ localize('Limit') }}</label>
          <span
            v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
            class="helper-text invalid"
            >{{ localize('Message_MinLength') }} {{ v$.limit.minValue.$params.min }}
          </span>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
        >
          {{ localize('UpdateBtn') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { minValue, required } from '@vuelidate/validators'
import localizeFilter from '../filters/localize.filter'
export default {
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      select: null,
      title: '',
      limit: 100,
      current: null,
    }
  },

  created() {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  watch: {
    current(catID) {
      if (this.categories) {
        const { title, limit } = this.categories.find((cat) => cat.id === catID)
        this.title = title
        this.limit = limit
      }
    },
  },
  validations() {
    return {
      title: { required },
      limit: { required, minValue: minValue(100) },
    }
  },
  async mounted() {
    setTimeout(() => {
      M.updateTextFields()
      this.select = M.FormSelect.init(this.$refs.select)
    }, 0)
  },
  methods: {
    async submitHandler() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      try {
        await this.$store.dispatch('updateCategory', {
          id: this.current,
          title: this.title,
          limit: this.limit,
        })
        await this.$Mtoast(localizeFilter('Category_HasBeenUpdated'), 'new-toast')
        this.$emit('updated', {
          id: this.current,
          title: this.title,
          limit: this.limit,
        })
      } catch (e) {}
    },
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
}
</script>
