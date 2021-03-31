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

  createEvent(params = {}) {
     return http.post('/events', params).then(({ data }) => {
      return data
    })
  }
}
