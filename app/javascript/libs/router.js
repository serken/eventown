import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../pages/home/index'
import NewEvent from '../pages/events/new_event'
import SignIn from '../pages/users/sign_in'
import Register from '../pages/users/register'
import Profile from '../pages/profile/container'
import ProfileEdit from '../pages/profile/edit'
import MyEvents from '../pages/profile/my_events'
import Favorites from '../pages/profile/favorites'

import AdminUsersList from '../pages/admin/users/list'
import AdminEventsList from '../pages/admin/events/list'
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
      path: '/profile',
      component: Profile,
      children: [
        {
          path: '/profile/edit',
          component: ProfileEdit
        },
        {
          path: '/profile/my_events',
          component: MyEvents
        },
        {
          path: '/profile/favorites',
          component: Favorites
        }
      ]
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: '/admin/users',
          component: AdminUsersList
        },
        {
          path: '/admin/events',
          component: AdminEventsList
        }
      ]
    }
  ],
})

export default router
