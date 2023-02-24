// import { default as en, default as ru } from '../locales/en.json'
import { default as en } from '../locales/en.json'
import { default as ru } from '../locales/ru.json'
import store from '../store'

const locales = {
  'ru-RU': { ...ru },
  'en-US': { ...en },
}

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `[localize error]: key ${key} not found`
}
