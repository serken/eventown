import http from './http'
import { map, pick } from 'lodash'

export default {

  updateUser(id, params) {
    return http.patch(`/admin/users/${id}`, params).then(({ data }) => {
      return data
    })
  },

  deleteUser(id) {
    return http.delete(`/admin/users/${id}`).then(({ data }) => {
      return data
    })
  },

  createUser(params) {
    return http.post('/admin/users', params).then(({ data }) => {
      return data
    })
  },

  fetchEvents(params = {}) {
    return http.get('/admin/events', params).then(({ data }) => {
      return data
    })
  },

  fetchUsers(params = {}) {
    return http.get('/admin/users', params).then(({ data }) => {
      return data
    })
  },

  createEvent(params = {}) {
     return http.post('/admin/events', params).then(({ data }) => {
      return data
    })
  },

  updateEvent(id, params) {
    return http.patch(`/admin/events/${id}`, params).then(({ data }) => {
      return data
    })
  },

  deleteEvent(id) {
    return http.delete(`/admin/events/${id}`).then(({ data }) => {
      return data
    })
  },

  fetchCompanies(params = {}) {
    return http.get('/admin/companies', params).then(({ data }) => {
      return data
    })
  },

  createCompanies(params = {}) {
     return http.post('/admin/companies', params).then(({ data }) => {
      return data
    })
  },

  updateCompany(id, params) {
    return http.patch(`/admin/companies/${id}`, params).then(({ data }) => {
      return data
    })
  },

  deleteCompany(id) {
    return http.delete(`/admin/companies/${id}`).then(({ data }) => {
      return data
    })
  },
}
