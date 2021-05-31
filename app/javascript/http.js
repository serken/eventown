import Vue from 'vue'
import axios from 'axios'
import qs from "qs"
import store from 'store'
import router from './libs/router'

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

  if (error.response.status >= 400) {
    // TODO: use generic method for client session reset
    store.dispatch('user/setUser', null)
  }

  // Do something with response error
  return Promise.reject(error.response.data)
})

sessionStorage.csrf = document.querySelector('meta[name=csrf-token]').content

Vue.prototype.$http = http

export default http
