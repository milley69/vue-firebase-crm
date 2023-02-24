<template>
  <form
    class="card auth-card"
    @submit.prevent="submitForm"
  >
    <div class="card-content">
      <span class="card-title">{{ localize('CRM_Title') }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: v$.email.$dirty && v$.email.$error }"
        />
        <label for="email">Email</label>
        <small
          v-if="v$.email.$dirty && v$.email.required.$invalid"
          class="helper-text invalid"
          >{{ localize('Message_EmailRequired') }}
        </small>
        <small
          v-if="v$.email.$dirty && v$.email.email.$invalid"
          class="helper-text invalid"
          >{{ localize('Message_EmailValid') }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{ invalid: v$.password.$dirty && v$.password.$error }"
        />
        <label for="password">{{ localize('Password') }}</label>
        <small
          v-if="v$.password.$dirty && v$.password.required.$invalid"
          class="helper-text invalid"
          >{{ localize('PasswordEmpty') }}
        </small>
        <small
          v-if="v$.password.$dirty && v$.password.minLength.$invalid"
          class="helper-text invalid"
          >{{ localize('PasswordMustBe') }} {{ v$.password.minLength.$params.min }}
          {{ localize('PasswordMustBe_Now') }} {{ password.length }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ localize('Login') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ localize('NoAccount') }}
        <router-link to="/register">{{ localize('Register') }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import messages from '../utils/messages'

import localizeFilter from '@/filters/localize.filter'
import { useMeta } from 'vue-meta'
export default {
  setup() {
    useMeta({ title: localizeFilter('CRM_Title') })
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$Mtoast(messages[this.$route.query.message])
    }
    // M.toast({ text: 'I am a toast!' })
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      const formData = {
        email: this.email,
        password: this.password,
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (error) {
        // console.log(error)
      }
    },
  },
}
</script>
