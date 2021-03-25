import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../pages/home/index'
import NewEvent from '../pages/events/new_event'
import SignIn from '../pages/users/sign_in'
import Register from '../pages/users/register'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/create_event',
      component: NewEvent
    },
    {
      path: '/sign_in',
      component: SignIn
    },
    {
      path: '/sign_up',
      component: Register
    },
  ],
})

export default router
