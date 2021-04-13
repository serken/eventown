<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn

        dark
        text
        height="48"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account</v-icon>
        Войти
      </v-btn>
    </template>
    <v-card>
      <v-app-bar>
        <v-toolbar-title>
          Авторизация
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="$emit('clear-sign-in'); dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Введите свой email"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="password"
              label="Введите пароль"
              type="password"
              required
            ></v-text-field>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          height="48"
          @click="forgetPassword"
        >
          Забыли пароль?
        </v-btn>
        <v-btn
          text
          height="48"
          @click="$emit('clear-sign-in');$emit('sign-up')"
        >
          <v-icon>mdi-account</v-icon>
          Еще не зарегистрированы?
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="signIn"
        >
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      email: '',
      password: '',
      valid: true,
      dialog: false,
      emailRules: [
        v => !!v || 'Пожалуйста,заполните электронную почту.',
      ],
    }
  },

  watch: {
    showDialog: function(val) {
      this.dialog = val
    }
  },

  methods: {
    signIn: function() {
      const params = {
        email: this.email,
        password: this.password
      }
      this.$api.signIn(params).then((user) => {
        this.$emit('clear-sign-in')
        this.setUser(user)
        this.dialog = false
        this.$eventBus.$emit('show-flash', { type: 'info', text: 'Авторизация удалась. Welcome' })
        this.$router.push('/').catch(() => {})
      }).catch((error) => {
        this.$eventBus.$emit('show-flash', { type: 'error', text: error.errors })
      })
    },

    forgetPassword: function() {
      this.$emit('clear-sign-in')
      this.$emit('forget-password')
    },

    ...mapActions("user", ["setUser"])
  }
}
</script>
