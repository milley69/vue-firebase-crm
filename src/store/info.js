import { child, get, getDatabase, ref, update } from 'firebase/database'

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    },
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updateDate = { ...getters.info, ...toUpdate }

        await update(child(ref(getDatabase()), `/users/${uid}/info`), updateDate)
        commit('setInfo', toUpdate)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const info = (await get(child(ref(getDatabase()), `users/${uid}/info`))).val()
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
  getters: {
    info: (state) => state.info,
  },
}
