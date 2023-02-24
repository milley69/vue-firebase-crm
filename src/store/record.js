import { child, get, getDatabase, push, ref } from 'firebase/database'

export default {
  actions: {
    async createRecord({ commit, dispatch }, record) {
      try {
        const uid = await dispatch('getUid')
        return await push(ref(getDatabase(), `/users/${uid}/records`), record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const records = (await get(child(ref(getDatabase()), `users/${uid}/records`))).val() || {}
        return Object.keys(records).map((key) => ({ ...records[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        const record = (await get(child(ref(getDatabase()), `users/${uid}/records/${id}`))).val() || {}
        return { ...record, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
}
