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
      <v-card-title>
        <span class="headline">Войти</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Эл. почта"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="password"
              label="Пароль"
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
          @click="dialog = false"
        >
          Закрыть
        </v-btn>
        <v-btn
          text
          height="48"
          @click="$emit('clear-sign-up');$emit('sign-up')"
        >
          <v-icon>mdi-account</v-icon>
          Еще не зарегистрированы?
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="$emit('clear-sign-up');signIn"
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
        v => !!v || 'обязательно для ввода поле',
      ],
    }
  },

  watch: {
    showDialog: function(val) {
      this.dialog = val
    }
  },

  computed: {
    ...mapState(["getUser"]),
  },

  methods: {
    signIn: function() {
      const params = {
        email: this.email,
        password: this.password
      }
      this.$api.signIn(params).then((user) => {
        this.setUser(user)
        this.dialog = false
        this.$router.push('/')
      })
    },

    ...mapActions("user", ["setUser"])
  }
}
</script>
