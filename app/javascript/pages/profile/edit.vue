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
            @submit.prevent="update"
            class="update-form"
          >
            <v-row>
              <v-col>
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
                      label="Пароль"
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
                      label="Подтверждение пароля"
                      name="confirmPassword"
                      type="password"
                      required
                    ></v-text-field>
                  </validation-provider>
                </v-row>

                <v-row>
                  <v-text-field
                    v-model="first_name"
                    label="Имя"
                  ></v-text-field>

                </v-row>

                <v-row>
                  <v-text-field
                    v-model="last_name"
                    label="Фамилия"
                  ></v-text-field>

                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <img
                  contain
                  class="event-img"
                  height="200"
                  width="200"
                  :src="`${userPic}`"
                >
                </img>
              </v-col>
              <v-col>
                <v-row>
                  <v-file-input
                    v-model="image"
                    label="Изображение профиля"
                  ></v-file-input>
                </v-row>
                <v-row>
                  <v-btn
                    color="success"
                    class="mr-4"
                    @click="update_image"
                  >
                    Сохранить
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                type="submit"
                @click="update"
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
const IMG = 'https://mizez.com/custom/mizez/img/general/no-image-available.png'

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
  data: function() {
    return {
      valid: true,
      email: '',
      password: '',
      confirmPassword: '',
      image: '',
      pic: '',
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
      errors: {},
      emailRules: [
        v => !!v || 'Пожалуйста, заполните электронную почту.',
        v => /.+@.+\..+/.test(v) || 'Пожалуйста, проверьте правильно ли указан адрес электронной почты.',
      ],
    }
  },

  computed: {
    userPic: function() {
      return this.pic.length > 0 ? this.pic : IMG
    },

    ...mapGetters("user", ["currentUser"])
  },

  mounted: function() {
    this.email = this.currentUser.email
    this.first_name = this.currentUser.first_name
    this.last_name = this.currentUser.last_name
    this.pic = this.currentUser.pic
  },

  methods: {
    update: function() {
      this.$refs.observer.validate()

      const params = {
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name
      }

      this.$api.updateUser(this.currentUser.id, params).then((data) => {
        this.$eventBus.$emit('show-flash', { type: 'info', text: 'Профиль успешно обновлен. Красава' })
        this.setUser(data)
        this.$router.push('/').catch(() => {})
      }).catch((error) => {
        this.errors = error.errors
        this.$eventBus.$emit('show-flash', { type: 'error', text: error.full_errors })
      })
    },

    update_image: function() {
      const params = {
        image: this.image
      }
      let formData = new FormData()
      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )

      this.$api.updateUser(this.currentUser.id, formData).then((data) => {
        this.$eventBus.$emit('show-flash', { type: 'info', text: 'Изображение профиля успешно обновлено. Красава' })
        this.setUser(data)
        this.pic = data.pic
      }).catch((error) => {
        this.errors = error.errors
        this.$eventBus.$emit('show-flash', { type: 'error', text: error.full_errors })
      })
    },

    ...mapActions("user", ["setUser"])
  }
}
</script>

<style lang="sass">
  .update-form
    flex-direction: row
    display: flex
    flex-wrap: wrap
    .row
      width: 50%
      span
        width: 100%
</style>
