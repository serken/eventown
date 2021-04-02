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
    return http.get('/events', params).then(({ data }) => {
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
    return http.patch(`/admin/users/${id}`, params).then(({ data }) => {
      return data
    })
  },

  deleteEvent(id) {
    return http.delete(`/admin/users/${id}`).then(({ data }) => {
      return data
    })
  },
}
