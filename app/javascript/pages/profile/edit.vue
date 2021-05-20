<template>
  <v-card>
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
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  type="submit"
                >
                  Обновить
                </v-btn>
            </v-card-actions>
          </v-form>
        </validation-observer>
      </v-container>
    </v-card-text>
  </v-card>
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

  computed: {
    ...mapGetters("user", ["currentUser"])
  },

  methods: {
    update: function() {
      this.$refs.observer.validate()

      const params = {
        password: this.user.password,
        first_name: this.user.first_name,
        last_name: this.user.last_name
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
