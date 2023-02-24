export default {
  mounted(el, value) {
    M.Tooltip.init(el, { text: `${value.value}` })
  },
  unmounted(el) {
    const tooltip = M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  },
}
