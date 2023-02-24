import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        setPersistence(getAuth(), browserLocalPersistence)
          .then(() => {
            return signInWithEmailAndPassword(getAuth(), email, password)
          })
          .catch((e) => {
            console.log(e.code + '||' + e.message)
          })
      } catch (error) {
        console.log(error.code + '||' + error.message)
        commit('setError', error)
        throw error
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password)
        const uid = await dispatch('getUid')
        await set(ref(getDatabase(), `/users/${uid}/info`), {
          bill: 10000,
          locale: 'ru-RU',
          name,
        })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    getUid() {
      const user = getAuth().currentUser
      return user ? user.uid : null
    },
    async logout({ commit }) {
      await signOut(getAuth())
      commit('clearInfo')
    },
  },
}
