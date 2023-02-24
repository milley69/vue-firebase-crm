<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Menu_record') }}</h3>
    </div>

    <Loader v-if="loading" />

    <p
      v-else-if="!categories.length"
      class="center"
    >
      {{ localize('NoCategories') }}.
      <router-link to="/record">{{ localize('AddFirst') }}.</router-link>
    </p>

    <form
      class="form"
      v-else
      @submit.prevent="submitHandler"
    >
      <div class="input-field">
        <select
          ref="select"
          v-model="category"
        >
          <option
            v-for="(c, index) in categories"
            :key="c.id"
            :value="c.id"
          >
            {{ c.title }}
          </option>
        </select>
        <label>{{ localize('SelectCategory') }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{ localize('Income') }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ localize('Outcome') }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: v$.amount.$dirty && v$.amount.$error }"
        />
        <label for="amount">{{ localize('Amount') }}</label>
        <span
          v-if="v$.amount.$dirty && (v$.amount.required.$invalid || v$.amount.minValue.$invalid)"
          class="helper-text invalid"
          >{{ localize('Message_Amount') }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: v$.description.$dirty && v$.description.$error }"
        />
        <label for="description">{{ localize('Description') }}</label>
        <span
          v-if="v$.description.$dirty && v$.description.required.$invalid"
          class="helper-text invalid"
          >{{ localize('Message_EnterDescription') }}
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
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
import { useVuelidate } from '@vuelidate/core'
import { minValue, required } from '@vuelidate/validators'
import { useMeta } from 'vue-meta'
import { mapGetters } from 'vuex'
export default {
  setup() {
    useMeta({ title: localizeFilter('Menu_record') })
    return {
      v$: useVuelidate(),
    }
  },

  name: 'record',
  data() {
    return {
      loading: true,
      select: null,
      category: null,
      categories: [],
      type: 'outcome',
      amount: 100,
      description: '',
    }
  },
  validations() {
    return {
      description: { required },
      amount: { required, minValue: minValue(1) },
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      M.updateTextFields()
      this.select = M.FormSelect.init(this.$refs.select)
    }, 0)
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecod() {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    },
  },
  methods: {
    async submitHandler() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      if (this.canCreateRecod) {
        try {
          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
          await this.$store.dispatch('createRecord', {
            catId: this.category,
            amount: this.amount,
            type: this.type,
            description: this.description,
            date: new Date().toJSON(),
          })
          await this.$Mtoast('Запись успешна создана', 'new-toast')
          await this.$store.dispatch('updateInfo', { bill })

          this.v$.$reset()
          this.amount = 100
          this.description = ''
        } catch (e) {}
      } else {
        this.$Mtoast(`Недостаточно средств для создания записи (${this.amount - this.info.bill})`, 'new-toast-error')
      }
    },
  },
}
</script>
