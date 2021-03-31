import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../pages/home/index'
import NewEvent from '../pages/events/new_event'
import SignIn from '../pages/users/sign_in'
import Register from '../pages/users/register'

import AdminUsersList from '../pages/admin/users/list'
import Admin from '../pages/admin/index'

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
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: '/admin/users',
          component: AdminUsersList
        }
      ]
    }
  ],
})

export default router
