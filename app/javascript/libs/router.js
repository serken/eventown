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
import EventsSearch from '../pages/events/search'

import CompaniesListContainer from '../pages/companies/list'
import CompanyContainer from '../pages/companies/container'
import CompanyComments from '../pages/companies/comments'
import AboutCompany from '../pages/companies/about'
import NewCompany from '../pages/companies/new'
import CompanyEdit from '../pages/companies/edit'
import CompanyEvents from '../pages/companies/events'

import AdminUsersList from '../pages/admin/users/list'
import AdminEventsList from '../pages/admin/events/list'
import AdminCompaniesList from '../pages/admin/companies/list'
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
      path: '/new_company',
      component: NewCompany
    },
    {
      path: '/companies',
      component: CompaniesListContainer,
    },
    {
      path: '/companies/:id',
      component: CompanyContainer,
      children: [
        {
          path: '/companies/:id/about',
          component: AboutCompany
        },
        {
          path: '/companies/:id/comments',
          component: CompanyComments
        },
        {
          path: '/companies/:id/edit',
          component: CompanyEdit
        },
        {
          path: '/companies/:id/events',
          component: CompanyEvents
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
      path: '/events',
      component: EventsSearch
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
        },
        {
          path: '/admin/companies',
          component: AdminCompaniesList
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
