<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('ProfileTitle') }}</h3>
    </div>

    <form
      class="form"
      @submit.prevent="submitForm"
    >
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="name"
          :class="{ invalid: v$.name.$dirty && v$.name.$error }"
        />
        <label for="description">{{ localize('Name') }}</label>
        <small
          v-if="v$.name.$dirty && v$.name.required.$invalid"
          class="helper-text invalid"
          >{{ localize('NameRequired') }}
        </small>
      </div>

      <div class="switch">
        <label>
          English
          <input
            type="checkbox"
            v-model="isRuLocale"
          />
          <span class="lever"></span>
          Русский
        </label>
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
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import { useMeta } from 'vue-meta'
import { mapActions, mapGetters } from 'vuex'
import localizeFilter from '../filters/localize.filter'
export default {
  useMeta: {
    title: 'My Example App',
  },
  setup() {
    useMeta({ title: localizeFilter('ProfileTitle') })
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      name: '',
      isRuLocale: true,
    }
  },
  validations() {
    return {
      name: { required, minLength: minLength(3) },
    }
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitForm() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      try {
        await this.updateInfo({ name: this.name, locale: this.isRuLocale ? 'ru-RU' : 'en-US' })
      } catch (e) {}
    },
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'

    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
  },
}
</script>

<style scoped lang="sass">
.switch
  margin-bottom: 2em
</style>
