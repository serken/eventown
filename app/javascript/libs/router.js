import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../pages/home/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage
    },
  ],
})

export default router
