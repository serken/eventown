/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import Vue from 'vue'
import Vuex from 'vuex'
import vuetify from "../plugins/vuetify"
import FlashMessage from '@smartweb/vue-flash-message'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VueCarousel from 'vue-carousel'


//import '../assets/global.scss'

import store from '../store/index.js'
import router from '../libs/router'
import app from '../app.vue'
import api from "../api"
import adminApi from "../adminApi"
import moment from 'moment'
import 'moment/locale/fr'
moment.locale('ru')
export const EventBus = new Vue()

Vue.use(Vuex)
Vue.use(VueCarousel)
Vue.use(FlashMessage, { strategy: "multiple" })
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationProvider)

Vue.prototype.$moment = moment;
Vue.prototype.$api = api
Vue.prototype.$adminApi = adminApi
Vue.prototype.$eventBus = EventBus

document.addEventListener('DOMContentLoaded', () => {
  const application = new Vue({
    store,
    router,
    vuetify,
    render: h => h(app),
  }).$mount()
  document.body.appendChild(application.$el)
})
