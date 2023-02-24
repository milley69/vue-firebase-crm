import { child, get, getDatabase, push, ref, update } from 'firebase/database'

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await get(child(ref(getDatabase()), `users/${uid}/categories`))).val() || {}

        // const cats = []
        // Object.keys(categories).forEach((key) => {
        //   cats.push({
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //     id: key,
        //   })
        // })
        // return cats

        return Object.keys(categories).map((key) => ({ ...categories[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoriesById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await get(child(ref(getDatabase()), `users/${uid}/categories/${id}`))).val() || {}
        return { ...category, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid')
        await update(child(ref(getDatabase()), `/users/${uid}/categories/${id}`), { title, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid')
        const category = await push(ref(getDatabase(), `/users/${uid}/categories`), { title, limit })
        return { title, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
}
