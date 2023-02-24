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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: v$.name.$dirty && v$.name.$error }"
        />
        <label for="name">{{ localize('Name') }}</label>
        <small
          v-if="v$.password.$dirty && v$.password.required.$invalid"
          class="helper-text invalid"
          >{{ localize('NameRequired') }}
        </small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            v-model="accept"
            @click="accept = !accept"
          />
          <span :class="['helper-text', { invalid: v$.accept.$dirty && v$.accept.$invalid }]">{{
            localize('AcceptRules')
          }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ localize('Register') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ localize('HasAccount') }} <router-link to="/login">{{ localize('Login') }}!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { useMeta } from 'vue-meta'
const agree = (accept) => accept
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
      name: '',
      accept: false,
    }
  },
  validations() {
    return {
      email: { required, email },
      name: { required },
      password: { required, minLength: minLength(3) },
      accept: { required, agree },
    }
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (error) {}
    },
  },
}
</script>
