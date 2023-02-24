// import { createApp } from 'vue'
import Vuex from 'vuex'
// import App from '../App.vue'
import auth from './auth'
import category from './category'
import info from './info'
import record from './record'
// const app = createApp(App)
// app.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
  },
  getters: {
    error: (state) => state.error,
  },
  actions: {
    async fetchCurrency() {
      const KEY = import.meta.env.VITE_MY_EXCHANGE
      const res = await fetch('https://api.apilayer.com/exchangerates_data/latest?symbols=RUB%2CUSD%2CEUR&base=USD', {
        method: 'GET',
        redirect: 'follow',
        headers: { apikey: KEY },
      })

      return await res.json()
    },
  },
  modules: { auth, info, category, record },
})
