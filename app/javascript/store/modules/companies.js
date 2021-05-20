import * as types from "./../mutation-types"

export default {
  namespaced: true,

  state: {
    companies: []
  },

  getters: {
    getCompanies: (state) => state.companies
  },

  actions: {
    setCompanies: function({ commit }, companies) {
      commit(types.SET_COMPANIES, companies)
    }
  },

  mutations: {
    [types.SET_COMPANIES]: function(state, companies) {
      state.companies = companies
    }
  }
}
