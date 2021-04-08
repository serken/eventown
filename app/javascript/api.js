import http from './http'
import { map, pick } from 'lodash'

export default {

  register(params) {
    return http.post('/sign_up', params).then(({ data }) => {
      return data
    })
  },

  signIn(params) {
    return http.post('/sign_in', params).then(({ data }) => {
      return data
    })
  },

  updateUser(id, params) {
    return http.patch(`/users/${id}`, params).then(({ data }) => {
      return data
    })
  },

  deleteUser(id) {
    return http.delete(`/users/${id}`).then(({ data }) => {
      return data
    })
  },

  signOut() {
    return http.delete('/sign_out').then(({ data }) => {
      return data
    })
  },

  fetchEvents(params = {}) {
    return http.get('/events', params).then(({ data }) => {
      return data
    })
  },

  fetchUsers(params = {}) {
    return http.get('/users', params).then(({ data }) => {
      return data
    })
  },

  fetchEvent(id) {
    return http.get(`/events/${id}`).then(({ data }) => {
      return data
    })
  },

  fetchUsers(id) {
    return http.get(`/users/${id}`).then(({ data }) => {
      return data
    })
  },

  createEvent(params = {}) {
     return http.post('/events', params).then(({ data }) => {
      return data
    })
  },

  makeFavorite(id) {
     return http.post(`/events/${id}/favorite`).then(({ data }) => {
      return data
    })
  },

  addEventComment(id, message) {
    return http.post(`/events/${id}/comments`, { message: message }).then(({ data }) => {
      return data
    })
  },

  addUserComment(id, message) {
    return http.post(`/users/${id}/comments`, { message: message }).then(({ data }) => {
      return data
    })
  },

  deleteEventComment(eventId, commentId) {
    return http.delete(`/events/${eventId}/comments/${commentId}`).then(({ data }) => {
      return data
    })
  },

  deleteUserComment(userId, commentId) {
    return http.delete(`/users/${userId}/comments/${commentId}`).then(({ data }) => {
      return data
    })
  },
}
