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
          <validation-observer
            ref="observer"
            v-slot="{ invalid }"
          >
            <v-form
              v-model="valid"
              @submit.prevent="reg"
            >
              <v-row>
                <validation-provider
                  v-slot="{ errors }"
                  name="email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    label="Введите свой email"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-row>

              <v-row>
                <validation-provider
                  v-slot="{ errors }"
                  vid="password"
                  name="password"
                  rules="required|min:8"
                >
                  <v-text-field
                    v-model="password"
                    :error-messages="errors"
                    label="Введите пароль"
                    type="password"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-row>

              <v-row>
                <validation-provider
                  v-slot="{ errors }"
                  name="confirm_password"
                  rules="required|confirmed:password"
                >
                  <v-text-field
                    v-model="confirmPassword"
                    :error-messages="errors"
                    label="Подтвердите пароль"
                    name="confirmPassword"
                    type="password"
                    required
                  ></v-text-field>
                </validation-provider>
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
                    type="submit"
                  >
                    Зарегистрироваться
                  </v-btn>
              </v-card-actions>
            </v-form>
          </validation-observer>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import { required, confirmed, email, min } from 'vee-validate/dist/rules'
import { extend, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

  extend('confirmed', {
    ...confirmed,
    message: 'Подтверждение пароля не совпадает',
  })

  extend('required', {
    ...required,
    message: 'Пожалуйста, заполните поле',
  })

  extend('min', {
    ...min,
    message: 'Vинимум {length} cbvdjkjd',
  })

  extend('email', {
    ...email,
    message: 'Неверно введена почта',
  })


export default {

  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      valid: true,
      email: '',
      password: '',
      confirmPassword: '',
      passwordRules: [
        (value) => !!value || 'Пожалуйста, заполните пароль.',
        (value) => (value && value.length >= 8 ) || 'минимум 8 символов'
      ],
      confirmPasswordRules: [
        (value) => !!value  || 'Пожалуйста, заполните подтверждение пароля.',
        (value) => (value && value.length >= 8 ) || 'минимум 8 символов',
        (value) =>
          value === this.password || 'Подтверждение пароля не совпадает.',
      ],
      confirm: '',
      email: '',
      first_name: '',
      last_name: '',
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
      this.$refs.observer.validate()

      const params = {
        email: this.email,
        password: this.password,
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
