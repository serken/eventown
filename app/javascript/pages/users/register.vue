<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-show="false"
        dark
        text
        height="48"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account</v-icon>
        Регистрация
      </v-btn>
    </template>
    <v-card>
      <v-app-bar>
        <v-toolbar-title>
          Регистрация
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="$emit('clear-sign-up')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :error-messages="errors.email"
              label="Введите свой email"
              required
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="password"
              :error-messages="errors.password"
              label="Введите пароль"
              type="password"
              required
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="confirm"
              label="Подтвердите пароль"
              type="password"
              required
            ></v-text-field>
          </v-row>

          <v-row>

            <v-text-field
              v-model="first_name"
              label="Введите свое имя"
            ></v-text-field>

          </v-row>

          <v-row>
            <v-text-field
              v-model="last_name"
              label="Введите свою фамилию"
            ></v-text-field>

          </v-row>

          <v-row>
            <v-checkbox
              v-model="is_org"
              label="Зарегистрироваться как организация?"
            ></v-checkbox>

          </v-row>

            <v-text-field
              v-if="is_org"
              v-model="org_name"
              label="Введите название организации"
            ></v-text-field>

          <v-row>

          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          height="48"
          @click="$emit('clear-sign-up');$emit('sign-in')"
        >
          <v-icon>mdi-account</v-icon>
          Уже есть аккаунт?
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="reg"
        >
          Зарегистрироваться
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
      confirm: '',
      valid: true,
      email: '',
      is_org: false,
      first_name: '',
      last_name: '',
      org_name: '',
      dialog: false,
      errors: {},
      emailRules: [
        v => !!v || 'Пожалуйста, заполните электронную почту.',
        v => /.+@.+\..+/.test(v) || 'Пожалуйста, проверьте правильно ли указан адрес электронной почты.',
      ],
    }
  },

  watch: {
    showDialog: function(val) {
      this.dialog = val
    }
  },

  methods: {
    reg: function() {
      const params = {
        email: this.email,
        password: this.password,
        is_org: this.is_org,
        org_name: this.org_name,
        first_name: this.first_name,
        last_name: this.last_name
      }
      this.$api.register(params).then((data) => {
        this.$emit('clear-sign-up')
        this.dialog = false
        this.$eventBus.$emit('show-flash', { type: 'info', text: 'Регистрация прошла успешно. Благодарочка' })
        this.setUser(data)
        this.$router.push('/').catch(() => {})
      }).catch((error) => {
        this.errors = error.errors
        this.$eventBus.$emit('show-flash', { type: 'error', text: error.full_errors })
      })
    },

    ...mapActions("user", ["setUser"])
  }
}
</script>
