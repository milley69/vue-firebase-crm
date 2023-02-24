<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localize('Create') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$dirty && v$.title.$error }"
          />
          <label for="name">{{ localize('Title') }}</label>
          <span
            v-if="v$.title.$dirty && v$.title.required.$invalid"
            class="helper-text invalid"
            >{{ localize('Message_CategoryTitle') }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$dirty && v$.limit.$error }"
          />
          <label for="limit">{{ localize('Limit') }}</label>
          <span
            v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
            class="helper-text invalid"
          >
            {{ localize('Message_MinLength') }} {{ v$.limit.minValue.$params.min }}
          </span>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
        >
          {{ localize('Create') }}
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
  data() {
    return {
      title: '',
      limit: 100,
    }
  },
  validations() {
    return {
      title: { required },
      limit: { required, minValue: minValue(100) },
    }
  },
  mounted() {
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  methods: {
    async submitHandler() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        })
        this.title = ''
        this.limit = 100
        this.v$.$reset()
        this.$Mtoast(localizeFilter('Category_HasBeenCreated'), 'new-toast')
        this.$emit('create', category)
      } catch (e) {}
    },
  },
}
</script>
