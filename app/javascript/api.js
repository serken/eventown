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

  nearestEvents() {
    return http.get('/near_events').then(({ data }) => {
      return data
    })
  },

  fetchUsers(params = {}) {
    return http.get('/users', params).then(({ data }) => {
      return data
    })
  },

  fetchCompanies(params = {}) {
    return http.get('/companies', params).then(({ data }) => {
      return data
    })
  },

  fetchCurrentUser() {
    return http.get('/restore_session').then(({ data }) => {
      return data
    })
  },

  fetchEvent(id) {
    return http.get(`/events/${id}`).then(({ data }) => {
      return data
    })
  },

  fetchUser(id) {
    return http.get(`/users/${id}`).then(({ data }) => {
      return data
    })
  },

  fetchCompany(id) {
    return http.get(`/companies/${id}`).then(({ data }) => {
      return data
    })
  },

  createEvent(params = {}) {
     return http.post('/events', params).then(({ data }) => {
      return data
    })
  },

  updateEvent(id, params = {}) {
     return http.patch(`/events/${id}`, params).then(({ data }) => {
      return data
    })
  },

  deleteEvent(id) {
    return http.delete(`/events/${id}`).then(({ data }) => {
      return data
    })
  },

  createCompany(params = {}) {
     return http.post('/companies', params).then(({ data }) => {
      return data
    })
  },

  updateCompany(id, params = {}) {
     return http.patch(`/companies/${id}`, params).then(({ data }) => {
      return data
    })
  },

  deleteCompany(id) {
    return http.delete(`/companies/${id}`).then(({ data }) => {
      return data
    })
  },

  updateUser(id, params = {}) {
     return http.patch(`/users/${id}`, params).then(({ data }) => {
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

  addCompanyComment(id, message) {
    return http.post(`/companies/${id}/comments`, { message: message }).then(({ data }) => {
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

  deleteCompanyComment(companyId, commentId) {
    return http.delete(`/companies/${companyId}/comments/${commentId}`).then(({ data }) => {
      return data
    })
  },

  restorePassword(params) {
    return http.post('/restore_password', params).then(({ data }) => {
      return data
    })
  },

  updatePassword(params) {
    return http.post('/update_password', params).then(({ data }) => {
      return data
    })
  }
}
