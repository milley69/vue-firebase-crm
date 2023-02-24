import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createApp } from 'vue'
import App from './App.vue'
import tooltipDirective from './directives/tooltip.directive'
import currencyFilter from './filters/currency.filter'
import dateFiltered from './filters/date.filter'
import localizeFilter from './filters/localize.filter'
import router from './router'
import store from './store/index'
import messagePlugin from './utils/message.plugin'

import { browserLocalPersistence, initializeAuth } from 'firebase/auth'

import { createMetaManager } from 'vue-meta'

import Loader from '@/components/app/Loader.vue'
import '@materializecss/materialize/dist/js/materialize.min.js'
import './assets/index.css'

const app = createApp(App)
app.component('Loader', Loader)
app.use(router)
app.use(store)
app.directive('tooltip', tooltipDirective)

app.use(createMetaManager())

app.use(messagePlugin)
app.config.globalProperties.currency = (value, currency) => currencyFilter(value, currency)
app.config.globalProperties.dateFilter = (value, currency) => dateFiltered(value, currency)
app.config.globalProperties.localize = (key) => localizeFilter(key)

const initApp = initializeApp({
  // apiKey: 'AIzaSyDGbU8HTU1Px9XkYF_b1gjqmobad6myqeA',
  apiKey: import.meta.env.VITE_MY_INIT_API_KEY,
  // authDomain: 'vue-crm-milley.firebaseapp.com',
  authDomain: import.meta.env.VITE_MY_INIT_AUTH_DOMAIN,
  projectId: 'vue-crm-milley',
  storageBucket: 'vue-crm-milley.appspot.com',
  messagingSenderId: '830011395205',
  // appId: '1:830011395205:web:a207b91168002b11c7adec',
  appId: import.meta.env.VITE_MY_INIT_API_ID,
  measurementId: 'G-W2R5YJ9YRM',
})
export const initAuth = initializeAuth(initApp, {
  persistence: browserLocalPersistence,
})

let loadApp
const loaderApp = document.getElementById('loaderApp')

onAuthStateChanged(getAuth(), () => {
  if (!loadApp) {
    loaderApp.remove()
    loadApp = app.mount('#app')
  }
})
