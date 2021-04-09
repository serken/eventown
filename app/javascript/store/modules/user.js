import * as types from "./../mutation-types"
import api from "../../api"

export default {
  namespaced: true,

  state: {
    user: JSON.parse(localStorage.getItem("user"))
  },

  getters: {
    currentUser: (state) => state.user,
    getLogin: (state) => state.user["login"]
  },

  actions: {
    setUser: function({ commit }, user) {
      commit(types.SET_USER, user)
    },

    setUserValue: function({ commit }, { name, value }) {
      commit(types.SET_USER_VALUE, { name, value })
    },

    fetchCurrentUser: function({ commit }) {
      commit(types.FETCH_CURRENT_USER)
    },

    signOut: function({commit}) {
      commit(types.SIGN_OUT_USER, null)
    }
  },

  mutations: {
    [types.SET_USER]: function(state, user) {
      setLocalStorage(user)
      state.user = user
    },

    [types.SET_USER_VALUE]: function(state, { name, value }) {
      state.user[name] = value
      setLocalStorage(state.user)
    },
    [types.SIGN_OUT_USER]: function(state) {
      api.signOut()
      state.user = null
      setLocalStorage(state.user)
    },
    [types.FETCH_CURRENT_USER]: function(state) {
      api.fetchCurrentUser().then((user) => {
        state.user = user
        setLocalStorage(user)
      })
    }
  }
}

function setLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user))
}
