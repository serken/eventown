import * as types from "./../mutation-types"

export default {
  namespaced: true,

  state: {
    events: []
  },

  getters: {
    getEvents: (state) => state.events
  },

  actions: {
    setEvents: function({ commit }, events) {
      commit(types.SET_EVENTS, events)
    }
  },

  mutations: {
    [types.SET_EVENTS]: function(state, events) {
      state.events = events
    }
  }
}
