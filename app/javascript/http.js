import Vue from 'vue'
import axios from 'axios'
import qs from "qs"
//import store from '@store'
//import router from './router'

var config = window.config

var http = axios.create({
  baseURL: '/api/',
  timeout: 30000,
  withCredentials: true
})

//http.defaults.headers.post['Accept'] = 'application/json';

http.interceptors.request.use(function(request) {
  request.paramsSerializer = params => {
    // Qs is already included in the Axios package
    return qs.stringify(params, {
      arrayFormat: "brackets",
      encode: true
    })
  }

  if (request.method != 'get') {
    let csrfToken = sessionStorage.csrf

    request.headers.post['X-CSRF-Token'] = csrfToken
    request.headers.patch['X-CSRF-Token'] = csrfToken
    request.headers.delete['X-CSRF-Token'] = csrfToken
  }

  return request
}, function(error) {
  return Promise.reject(error)
})

http.interceptors.response.use(function (response) {
  sessionStorage.csrf = response.headers['x-csrf-token']

  return response
}, function (error) {
  if (error.response && Object.prototype.hasOwnProperty.call(error.response.config.headers, 'X-CSRF-Token')) {
    sessionStorage.csrf = error.response.config.headers['X-CSRF-Token']
  }

  if (error.code === 'ECONNABORTED' || error.response.status == 500) {
    error.response = {
      data: {
        errors: {
          general: [
            error.message
          ]
        }
      }
    }
  } else if (error.response.status == 401) {
    // TODO: use generic method for client session reset
    sessionStorage.errorOnPreviousPage = error.response.data.errors.general[0]
    store.commit('setUser', null)
    router.push('/')
  }

  // Do something with response error
  return Promise.reject(error)
})

sessionStorage.csrf = document.querySelector('meta[name=csrf-token]').content

Vue.prototype.$http = http

export default http
