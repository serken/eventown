import Vue from "vue"
import Vuex from "vuex"

import User from "./modules/user"
import Events from "./modules/events"
import Companies from "./modules/companies"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  modules: {
    user: User,
    events: Events,
    companies: Companies
  }
})
