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
import EventEdit from '../pages/events/edit'

import EventContainer from '../pages/events/container'
import EventComments from '../pages/events/comments'
import EventPage from '../pages/events/event'

import OrgsListContainer from '../pages/orgs/list'
import OrgsContainer from '../pages/orgs/container'

import AdminUsersList from '../pages/admin/users/list'
import AdminEventsList from '../pages/admin/events/list'
import Admin from '../pages/admin/index'
import RestorePassword from '../pages/users/restore_password'

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
      path: '/orgs',
      component: OrgsListContainer,
      children: [
        {
          path: '/orgs/:id',
          component: OrgsContainer
        }
      ]
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
      path: '/events/:id',
      component: EventContainer,
      children: [
        {
          path: '/events/:id/about',
          component: EventPage
        },
        {
          path: '/events/:id/comments',
          component: EventComments
        },
        {
          path: '/events/:id/edit',
          component: EventEdit
        },
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
    },
    {
      path: '/restore_password',
      component: RestorePassword
    }
  ],
})

export default router
