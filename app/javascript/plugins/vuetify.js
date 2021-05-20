import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify)

const opts = {
  //theme: { dark: true }
  lang: {
    locales: { ru },
    current: 'ru',
  },
}

export default new Vuetify(opts)
