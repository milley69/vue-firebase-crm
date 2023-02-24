export default {
  install: (Vue, options) => {
    Vue.config.globalProperties.$Mtoast = function (text, classes) {
      M.toast({ text: text, classes: `rounded ${classes}` })
    }
    Vue.config.globalProperties.$Etoast = function (text) {
      M.toast({ text: `[Ошибка]: ${text}` })
    }
  },
}
